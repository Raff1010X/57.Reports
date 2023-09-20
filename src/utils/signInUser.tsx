import { getSession } from 'next-auth/react';
import { showMessage } from '@/store/slices/message/messageSlice';
import { userSignIn } from '@/store/slices/auth/authSlice';
import bcrypt from 'bcryptjs';


export default async function signInUser(signInResult: any, project: string, email: string, password: string) {

    if (!signInResult?.ok) {
        if (signInResult?.error) return showMessage(signInResult.error);
        else {
            // check if user is in local storage
            const localUser = localStorage.getItem('user');
            if (localUser) {
                // get user from local storage
                const hashedUser = JSON.parse(localUser);
                // compare user email, password, project name and projectID using bcrypt.js
                const matchEmail = await bcrypt.compare(email, hashedUser.email);
                const matchPassword = await bcrypt.compare(password, hashedUser.password);
                const matchProject = await bcrypt.compare(project, hashedUser.project);
                // if all matches
                if (matchEmail && matchPassword && matchProject) {
                    const user = {
                        email,
                        project,
                        projectID: hashedUser.projectID,
                        role: hashedUser.role
                    }
                    // save user in redux store
                    return userSignIn(user);
                } else {
                    // if not all matches
                    return (showMessage("Log in in unexpected error!"))
                }
            }
        };
    } else {
        const sesion = await getSession() as any;
        // hash user email, password, project name and projectID using bcrypt.js
        let hashedUser;
        if (sesion?.user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const hashedEmail = await bcrypt.hash(email, 10);
            const hashedProject = await bcrypt.hash(project, 10);
            const projectID = sesion?.user?.projectID;
            const role = sesion?.user?.role;
            hashedUser = {
                email: hashedEmail,
                password: hashedPassword,
                project: hashedProject,
                projectID,
                role
            }
        }
        // save hashed user in local storage
        localStorage.setItem('user', JSON.stringify(hashedUser));
        // save user in redux store
        return userSignIn(sesion?.user);
    }
}