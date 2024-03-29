import pkg from "@/../package.json";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-11-15",
  appInfo: { name: "Ignews", version: pkg.version }
});
