import Link from 'next/link';
import SignInButton from '../SignInButton';

interface HeaderProps {
	pathname: string;
}

function Header({ pathname }: HeaderProps) {
	return (
		<header className="h-20 border-b-2 border-b-gray-800">
			<div className="max-w-[1120px] flex items-center h-20 mx-auto my-0 px-8 py-0">
				<Link href="/">
					<img src="/images/logo.svg" alt="ig.news" />
				</Link>

				<nav className="ml-20 h-20 gap-8">
					<a
						href="/"
						className={`inline-block relative py-0 px-2 h-20 leading-[5rem] text-gray-300 duration-200 hover:text-white ${
							pathname === '/home' &&
							"after:content-[''] after:h-[3px] after:rounded-t-[3px] after:w-full after:absolute after:bottom-[1px] after:left-0 after:bg-yellow-500 text-white font-bold"
						}`}
					>
						Home
					</a>
					<a
						href="/posts"
						className={`inline-block ml-8 relative py-0 px-2 h-20 leading-[5rem] text-gray-300 duration-200 hover:text-white ${
							pathname === '/posts' &&
							"after:content-[''] after:h-[3px] after:rounded-t-[3px] after:w-full after:absolute after:bottom-[1px] after:left-0 after:bg-yellow-500 text-white font-bold"
						}`}
					>
						Posts
					</a>
				</nav>

				<div className="ml-auto">
					<SignInButton />
				</div>
			</div>
		</header>
	);
}

export default Header;
