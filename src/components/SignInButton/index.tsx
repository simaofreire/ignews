import { signIn, signOut, useSession } from 'next-auth/react';
import { FaSpinner } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export default function SignInButton() {
	const { data, status } = useSession();

	const authenticated = status === 'authenticated';
	const loading = status === 'loading';
	const user = data ? data.user?.name : 'Sign in';

	return (
		<button
			className="flex items-center justify-center font-bold text-white py-0 px-6 h-12 rounded-[3rem] bg-gray-850 border-none hover:brightness-[0.8] transition duration-200"
			type="button"
			onClick={() => (authenticated ? signOut() : signIn())}
			disabled={loading}
		>
			{authenticated ? (
				<div className="bg-[#04d361] w-6 h-6 rounded-full flex items-center justify-center mr-4">
					<img src={data?.user?.image as string} className="w-5 h-5  rounded-full" />
				</div>
			) : (
				<div className="w-6 h-6 mr-4 rounded-full bg-[#eba417]" />
			)}

			{loading ? <FaSpinner className="animate-spin " /> : user}

			{authenticated ? <FiX color="#737380" className="ml-4" /> : null}
		</button>
	);
}
