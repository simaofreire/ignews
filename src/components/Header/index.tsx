import { useRouter } from 'next/router';

function Header() {
	const { pathname } = useRouter();
	console.log(pathname.includes('/'));
	return (
		<header className="h-20 border-b-2 border-b-gray-800">
			<div className="max-w-[1120px] flex items-center h-20 mx-auto my-0 px-8 py-0">
				<img src="/images/logo.svg" alt="ig.news" />

				<nav className="ml-20 h-20 gap-8">
					<a
						href=""
						className={`inline-block relative py-0 px-2 h-20 leading-[5rem] text-gray-300 duration-200 hover:text-white ${
							pathname.includes('/') &&
							"after:content-[''] after:h-[3px] after:rounded-t-[3px] after:w-full after:absolute after:bottom-[1px] after:left-0 after:bg-yellow-500 text-white font-bold"
						}`}
					>
						Home
					</a>
					<a
						href=""
						className={`inline-block ml-8 relative py-0 px-2 h-20 leading-[5rem] text-gray-300 duration-200 hover:text-white ${
							pathname.includes('posts') &&
							"after:content-[''] after:h-[3px] after:rounded-t-[3px] after:w-full after:absolute after:bottom-[1px] after:left-0 after:bg-yellow-500 text-white font-bold"
						}`}
					>
						Posts
					</a>
				</nav>
			</div>
		</header>
	);
}

export default Header;
