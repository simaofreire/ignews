'use client';

import { Session } from 'next-auth';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';



export default function NextAuthProvider({ children }: { children: React.ReactNode }) {
	return <SessionProvider>{children}</SessionProvider>;
}
