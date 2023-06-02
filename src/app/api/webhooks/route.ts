import { stripe } from "@/services/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { saveSubscription } from "../_lib/manageSubscriptions";
import { NextResponse } from "next/server";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const runtime = "nodejs";

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const buf = await buffer(req);
    const secret = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      return NextResponse.json({
        message: `Webhook error: ${err.message}`,
        err,
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
        NextResponse.json({ message: "Webhook handler failed." });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    NextResponse.json({ message: "Method not allowed", err });
  }
}
