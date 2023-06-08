"use client"

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
}

export default function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  const pathname = usePathname();

  const className =
    pathname === rest.href
      ? "inline-block relative py-0 px-2 h-20 leading-[5rem] text-gray-300 duration-200 hover:text-white after:content-[''] after:h-[3px] after:rounded-t-[3px] after:w-full after:absolute after:bottom-[1px] after:left-0 after:bg-yellow-500 text-white font-bold"
      : "inline-block relative py-0 px-2 h-20 leading-[5rem] text-gray-300 duration-200 hover:text-white";

  return (
    <Link
      {...rest}
      legacyBehavior
    >
      {cloneElement(children, { className })}
    </Link>
  );
}
