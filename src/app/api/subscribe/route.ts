import { fauna } from "@/services/fauna";
import { stripe } from "@/services/stripe";
import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

type User = {
  ref: { id: string };
  data: {
    stripe_customer_id: string;
  };
};

interface NextApiRequestWithSession extends NextApiRequest {
  json: () => Promise<{ priceId: string }>;
}

export async function POST(req: NextApiRequestWithSession, res: NextApiResponse) {
  const { priceId } = await req.json();
  const session = await getServerSession(authOptions);
  const user = await fauna.query<User>(q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session?.user?.email!))));

  let customerId = user.data.stripe_customer_id;

  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: session?.user?.email!
    });

    await fauna.query(
      q.Update(q.Ref(q.Collection("users"), user.ref.id), {
        data: {
          stripe_customer_id: stripeCustomer.id
        }
      })
    );

    customerId = stripeCustomer.id;
  }

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    mode: "subscription",
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL!,
    cancel_url: process.env.STRIPE_CANCEL_URL!
  });

  return NextResponse.json({ sessionId: stripeCheckoutSession.id });
}
