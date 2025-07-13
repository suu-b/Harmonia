import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { saveUserIfNotExists } from '@/entities/user/model/saveUser';
import { User } from '@/shared/types/global-types';

const clientId = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
      authorization: {
        params: {
          scope:
            'openid profile email https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 6 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async signIn({ user }) {
      if (!user?.email) return false;
      try {
        const userObject: User = {
          username: user.name ?? '',
          mail: user.email,
          profileImageUrl: user.image ?? '',
        };
        await saveUserIfNotExists(userObject);
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
