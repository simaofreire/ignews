import { fauna } from '@/services/fauna';
import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import TwitchProvider from 'next-auth/providers/twitch';

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
			authorization: {
				params: {
					scope: 'read:user',
				},
			},
		}),

		TwitchProvider({
			clientId: process.env.TWITCH_CLIENT_ID!,
			clientSecret: process.env.TWITCH_CLIENT_SECRET!,
			authorization: {
				params: {
					scope: 'openid user:read:email',
				},
			},
		}),
	],
	jwt: {
		signingKey: process.env.JWT_KEY!,
	},
	callbacks: {
		async signIn({ user, account, profile }: any) {
			try {
				await fauna.query(q.Create(q.Collection('users'), { data: { email: user.email } }));
				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
	},
};

export default NextAuth(authOptions);
