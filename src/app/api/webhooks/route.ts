import { stripe } from "@/services/stripe";
import { NextApiRequest } from "next";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { EventEmitter, Readable } from "stream";
import Stripe from "stripe";
import { saveSubscription } from "../_lib/manageSubscriptions";

async function buffer(readable: Readable) {
  EventEmitter.setMaxListeners(0);

  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

interface Request extends NextApiRequest {
  text: () => Promise<string>;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const readable = Readable.from(rawBody);
    const buf = await buffer(readable);
    const secret = headers().get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
      return NextResponse.json({
        message: `Webhook error: ${err}`,
      });
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription(subscription.id, subscription.customer.toString(), false);

            break;

          case "checkout.session.completed":
            const checkoutSession = event.data.object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription!.toString(),
              checkoutSession.customer!.toString(),
              true,
            );

            break;
          default:
            throw new Error("Unhandled event.");
        }
      } catch (err) {
        NextResponse.json({ message: `Webhook handler failed: ${err}` });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    NextResponse.json({ message: `Method not allowed: ${err}` });
  }
}
