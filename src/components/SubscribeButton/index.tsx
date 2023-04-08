interface SubscribeButtonProps {
	priceId: string;
}

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
	return (
		<button
			type="button"
			className="w-[260px] h-16 border-none rounded-[2rem] bg-yellow-500 text-gray-900 text-xl font-bold flex items-center justify-center duration-200 hover:brightness-[0.8]"
		>
			Subscribe now
		</button>
	);
}
