import { fauna } from "@/services/fauna";
import { query as q } from "faunadb";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import TwitchProvider from "next-auth/providers/twitch";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),

    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID!,
      clientSecret: process.env.TWITCH_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid user:read:email",
        },
      },
    }),
  ],
  jwt: {
    secret: process.env.JWT_KEY,
  },
  callbacks: {
    async session({ session }: any) {
      try {
        const userActiveSubscription: any = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index("subscription_by_user_ref"),
                q.Select("ref", q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session.user.email)))),
              ),
              q.Match(q.Index("subscription_by_status"), "active"),
            ]),
          ),
        );

        return { ...session, subscriptionStatus: userActiveSubscription.data.status };
      } catch (error) {
        return { ...session, subscriptionStatus: null };
      }
    },
    async signIn({ user }: any) {
      const { email } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email))),
          ),
        );
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
