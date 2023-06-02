'use client';

import Header from '@/components/Header';
import NextAuthProvider from '@/components/Provider';
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-br">
			<body>
				<NextAuthProvider>
					<Header />
					{children}
				</NextAuthProvider>
			</body>
		</html>
	);
}
