import SubscribeButton from "@/components/SubscribeButton";
import { stripe } from "@/services/stripe";
import Image from "next/image";
import avatar from "../../../public/images/avatar.svg";

interface HomeProps {
  priceId: string;
  amount: string;
}

export const metadata = {
  title: "Home | ignews",
  favicon: "images/favicon.png",
};

export default async function Home() {
  const product: HomeProps = await getHomePageData();

  return (
    <main className="max-w-[1120px] my-auto mx-auto py-0 px-8 h-[calc(100vh-5rem)] flex items-center justify-between md:flex-col-reverse md:h-auto">
      <section className="max-w-[600px] ">
        <span className="text-2xl font-bold">👏 Hey, welcome!</span>

        <h1 className="text-[4.5rem] leading-[4.5rem] font-black mt-10">
          News about the <span className="text-cyan-500">React</span> world.
        </h1>
        <p className="text-2xl leading-[2.25rem] mt-6">
          Get access to all the publications <br />
          <span className="text-cyan-500 font-bold">for {product.amount} month</span>
        </p>

        <div className="mt-10 md:w-full md:flex md:justify-center">
          <SubscribeButton priceId={product.priceId} />
        </div>
      </section>

      <Image
        src={avatar}
        alt="Mulher programando"
        width={336}
        height={521}
      />
    </main>
  );
}

// export const revalidate = 86400; // 24 hours

export async function getHomePageData() {
  const price = await stripe.prices.retrieve("price_1Mudt5BTLPkeukhGShrMN7Mr");
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount! / 100),
  };

  return product;
}
