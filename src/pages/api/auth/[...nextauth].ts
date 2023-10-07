import NextAuth, { Session } from 'next-auth';
import mongoDbConnect from '@/utils/mongoDbConnect';
import SuperUser from '@/models/superUserModel';
import User from '@/models/userModel';

import CredentialsProvider from 'next-auth/providers/credentials';
import Project from '@/models/projectModel';
import { NextAuthOptions } from 'next-auth';
import { Roles } from '@/middlewares/defaultMiddlewares/protectRoute';

export interface CustomSession extends Session {
    user: {
        project: string;
        projectID: string; 
        email: string;
        role: Roles | null | undefined;
        name?: string | null | undefined;
        image?: string | null | undefined;
    };
}

export const nextAuthOptions: NextAuthOptions = {

    jwt: {
        maxAge: 40 * 60 * 60 * 24
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
            async authorize(credentials): Promise<any> {
                const project = credentials?.project;
                const email = credentials?.email;
                const password = credentials?.password;

                // admin login
                if (
                    project === process.env.ADMIN_PROJECT &&
                    email === process.env.ADMIN_EMAIL &&
                    password === process.env.ADMIN_PASSWORD
                ) {
                    console.log('admin login');
                    return {
                        project,
                        projectID: "admin",
                        email,
                        role: 'admin'
                    };
                }

                let userQuery = {
                    project,
                    email,
                };
                let role: Roles = 'user';

                await mongoDbConnect();

                let projectDB = await Project.findOne({ name: credentials?.project });
                if (!projectDB) {
                    throw new Error('No project or user found!');
                }
                const projectID = projectDB.id;
                userQuery.project = projectID;

                let user = await User.findOne(userQuery);
                if (!user) {
                    user = await SuperUser.findOne(userQuery);
                    role = 'superUser';
                }
                if (!user) {
                    throw new Error('No project or user found!');
                }
                if (!user.active) {
                    throw new Error(
                        'Activate Your account! An email has been sent to your email address containing an activation link. Please click on the link to activate your account.'
                    );
                }
                const authenticated = await user.authenticate(
                    credentials?.password
                );
                if (!authenticated) {
                    throw new Error('Invalid password!');
                }
                return {
                    project,
                    projectID,
                    email,
                    role
                };
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
        signOut: '/',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async jwt({ token, user, account }: any) {
            if (account && user) {
                return {
                    user,
                };
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user = token.user;
            // session.accessToken = token.accessToken
            // session.refreshToken = token.refreshToken
            return session;
        },
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        callbackUrl: {
            name: `next-auth.callback-url`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        csrfToken: {
            name: `next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
    }
};


export default NextAuth(nextAuthOptions);
