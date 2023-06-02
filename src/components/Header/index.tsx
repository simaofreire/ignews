"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignInButton from "../SignInButton";

function Header() {
  const pathname = usePathname();

  return (
    <header className="h-20 border-b-2 border-b-gray-800">
      <div className="max-w-[1120px] flex items-center h-20 mx-auto my-0 px-8 py-0">
        <Link href="/home">
          <Image
            width={110}
            height={31}
            src="images/logo.svg"
            alt="logo ig.news"
          />
        </Link>

        <nav className="ml-20 h-20 gap-8">
          <Link
            href="/home"
            className={`inline-block relative py-0 px-2 h-20 leading-[5rem] text-gray-300 duration-200 hover:text-white ${
              pathname === "/home" ||
              (pathname === "/" &&
                "after:content-[''] after:h-[3px] after:rounded-t-[3px] after:w-full after:absolute after:bottom-[1px] after:left-0 after:bg-yellow-500 text-white font-bold")
            }`}
          >
            Home
          </Link>
          <Link
            href="/posts"
            className={`inline-block ml-8 relative py-0 px-2 h-20 leading-[5rem] text-gray-300 duration-200 hover:text-white ${
              pathname === "/posts" &&
              "after:content-[''] after:h-[3px] after:rounded-t-[3px] after:w-full after:absolute after:bottom-[1px] after:left-0 after:bg-yellow-500 text-white font-bold"
            }`}
          >
            Posts
          </Link>
        </nav>

        <div className="ml-auto">
          <SignInButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
