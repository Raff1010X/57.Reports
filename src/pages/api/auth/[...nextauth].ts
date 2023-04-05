import NextAuth from 'next-auth';
import User from "@/models/userModel";

import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    jwt: {
        maxAge: 40 * 60 * 60 * 24,
    },

    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'reports',
            credentials: {
                project: {
                    type: 'text',
                },
                email: {
                    type: 'email',
                },
                password: {
                    type: 'password',
                },
            },
            async authorize(credentials, req) {
                const payload = {
                    project: credentials?.project,
                    email: credentials?.email,
                    password: credentials?.password,
                };
                const user = await (User as any).authenticate(payload)

                // Return null if user data could not be retrieved
                return null;
            },
        }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/logout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async jwt({ token, user, account } : any) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.token,
                    refreshToken: user.refreshToken,
                };
            }

            return token;
        },

        async session({ session, token }: any) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;

            return session;
        },
    },
};

export default NextAuth(authOptions);
