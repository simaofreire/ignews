"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export default function SignInButton() {
  const { data, status } = useSession();
  const isMobile = useIsMobile();

  const authenticated = status === "authenticated";
  const loading = status === "loading";
  const user = data ? data.user?.name : "Sign in";

  return (
    <button
      className="min-w-[140px] flex items-center justify-center font-bold text-white py-0 px-6 h-12 rounded-[3rem] bg-gray-850 border-none hover:brightness-[0.8] transition duration-200 sm:min-w-0"
      type="button"
      onClick={() => (authenticated ? signOut() : signIn("github"))}
      disabled={loading}
    >
      {authenticated && (
        <div className="bg-[#04d361] w-6 h-6 rounded-full flex items-center justify-center mr-4">
          <Image
            src={data?.user?.image as string}
            className="w-5 h-5  rounded-full"
            width={20}
            height={20}
            alt={data?.user?.image as string}
          />
        </div>
      )}

      {!authenticated && !loading && <div className="w-6 h-6 mr-4 rounded-full bg-[#eba417]" />}

      {loading ? <FaSpinner className="animate-spin" /> : !isMobile && user}

      {authenticated && (
        <FiX
          color="#737380"
          className="ml-4"
        />
      )}
    </button>
  );
}
