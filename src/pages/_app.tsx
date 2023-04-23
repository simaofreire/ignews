import Header from '@/components/Header';
import '@/styles/globals.css';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();

	return (
		<NextAuthProvider session={pageProps.session}>
			<Header pathname={pathname} />
			<Component pathname={pathname} {...pageProps} />
		</NextAuthProvider>
	);
}
