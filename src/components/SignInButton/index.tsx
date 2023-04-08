import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export default function SignInButton() {
	const isUseLoggedIn = true;

	return isUseLoggedIn ? (
		<button
			className="flex items-center justify-center font-bold text-white py-0 px-6 h-12 rounded-[3rem] bg-gray-850 border-none hover:brightness-[0.8] transition duration-200"
			type="button"
		>
			<FaGithub className="w-5 h-5 mr-4" color="#04d361" />
			Simão Freire
			<FiX color="#737380" className="ml-4" />
		</button>
	) : (
		<button
			className="flex items-center justify-center font-bold text-white py-0 px-6 h-12 rounded-[3rem] bg-gray-850 border-none hover:brightness-[0.8] transition duration-200"
			type="button"
		>
			<FaGithub className="w-5 h-5 mr-4" color="#eba417" />
			Sign in with Github
		</button>
	);
}
