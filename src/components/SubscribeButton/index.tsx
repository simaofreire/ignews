import { api } from '@/services/api';
import { getStripeJs } from '@/services/stripe-js';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';

interface SubscribeButtonProps {
	priceId: string;
}

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
	const { data } = useSession();
	const [loading, setLoading] = useState(false);

	async function handleSubscribe() {
		setLoading(true);
		if (!data) {
			signIn();
			setLoading(false);
			return;
		}

		try {
			const { data, status } = await api.post('/subscribe');
			if (status === 200) {
				const { sessionId } = data;
				const stripe = await getStripeJs();
				await stripe?.redirectToCheckout({ sessionId });
			}
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	}

	return (
		<button
			type="button"
			className="w-[260px] h-16 border-none rounded-[2rem] bg-yellow-500 text-gray-900 text-xl font-bold flex items-center justify-center duration-200 hover:brightness-[0.8]"
			onClick={handleSubscribe}
			disabled={loading}
		>
			Subscribe now
		</button>
	);
}
