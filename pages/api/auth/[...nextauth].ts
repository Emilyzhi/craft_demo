import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/libs/prismadb"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 15 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
    // async jwt({ token, user }) {
    //   if(user) {
    //     token.userId = user.id;
    //     token.followings = user.followings;
    //   }
    //   return token;
    // },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.userId = token.sub;    
      return session
    }
  },  
  pages: {
    error: '/login', // 这里是您自定义的错误处理页面的路径
  },
};

export default NextAuth(authOptions);
