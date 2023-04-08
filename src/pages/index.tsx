import SubscribeButton from '@/components/SubscribeButton';
import { stripe } from '@/services/stripe';
import { GetStaticProps } from 'next';
import Head from 'next/head';

interface HomeProps {
	product: {
		priceId: string;
		amount: number;
	};
}

export default function Home({ product }: HomeProps) {
	return (
		<>
			<Head>
				<title>Início | ig.news</title>
			</Head>

			<main className="max-w-[1120px] my-auto mx-auto py-0 px-8 h-[calc(100vh-5rem)] flex items-center justify-between md:flex-col-reverse md:h-auto mt-20">
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

				<img src="/images/avatar.svg" alt="Mulher programando" />
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const price = await stripe.prices.retrieve('price_1Mudt5BTLPkeukhGShrMN7Mr');
	const product = {
		priceId: price.id,
		amount: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price.unit_amount! / 100),
	};

	return { props: { product }, revalidate: 60 * 60 * 24 }; // 24 hours
};
