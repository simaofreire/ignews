import { signIn, signOut, useSession } from 'next-auth/react';
import { FaSpinner } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export default function SignInButton() {
	const { data, status } = useSession();

	const authenticated = status === 'authenticated';
	const userName = data ? data.user?.name : 'Sign in';

	if (status === 'loading') return <FaSpinner className="animate-spin " />;

	return (
		<button
			className="flex items-center justify-center font-bold text-white py-0 px-6 h-12 rounded-[3rem] bg-gray-850 border-none hover:brightness-[0.8] transition duration-200"
			type="button"
			onClick={() => (authenticated ? signOut() : signIn())}
		>
			<div className={`w-5 h-5 mr-4 rounded-full ${authenticated ? 'bg-[#04d361]' : 'bg-[#eba417]'}`} />
			{userName}
			{authenticated ? <FiX color="#737380" className="ml-4" /> : null}
		</button>
	);
}
