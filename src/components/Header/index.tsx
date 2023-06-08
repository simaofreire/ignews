import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo.svg";
import ActiveLink from "../ActiveLink";
import SignInButton from "../SignInButton";


function Header() {
  return (
    <header className="h-20 border-b-2 border-b-gray-800">
      <div className="max-w-[1120px] flex items-center h-20 mx-auto my-0 px-8 py-0">
        <Link href="/home">
          <Image
            width={110}
            height={31}
            src={logo}
            alt="logo ig.news"
          />
        </Link>

        <nav className="ml-20 h-20 gap-8">
          <ActiveLink href="/home">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <div className="ml-auto">
          <SignInButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
