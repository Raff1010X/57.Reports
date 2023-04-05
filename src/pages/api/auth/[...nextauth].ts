import NextAuth from 'next-auth';
import mongoDbConnect from '@/utils/mongoDbConnect';
import { SuperUser } from '@/models/userModel';
import User from '@/models/userModel';

import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    jwt: {
        maxAge: 40 * 60 * 60 * 24,
    },
    secret: process.env.JWT_SECRET,
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
            async authorize(credentials, req): Promise<any> {
                const project = credentials?.project;
                const email = credentials?.email;
                const payload = {
                    project,
                    email,
                };
                let role = 'user';

                await mongoDbConnect();
                let user = await User.findOne(payload);
                if (!user) {
                    user = await SuperUser.findOne(payload);
                    role = 'superUser';
                }
                if (!user) {
                    throw new Error('No user found!');
                }
                const authenticated = await user.authenticate(
                    credentials?.password
                );
                if (!authenticated) {
                    throw new Error('Invalid password!');
                }
                return {
                    project,
                    email,
                    department: user.department,
                    role,
                    isLoged: true,
                };
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/logout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async jwt({ token, user, account }: any) {
            if (account && user) { 
                return {
                    ...token,
                    accessToken: user,
                    refreshToken: user.refreshToken,
                };
            }

            return token;
        },
        // async signIn({ user, account, profile, email, credentials } : any) {
        //     return true
        //   },
        async session({ session, token }: any) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;
            return session;
        },
    },
};

export default NextAuth(authOptions);
