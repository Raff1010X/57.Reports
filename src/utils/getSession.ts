// get session with supertest and return cookies for use in other tests
import request from 'supertest';

const app = 'http://localhost:3000';

export default async function getSession(email: string, password: string, project: string): Promise<string[]> {
    // get csrfToken
    const csrfResponse = await request(app).get('/api/auth/csrf');
    const csrfToken = csrfResponse.body.csrfToken;
    // get login response
    const loginResponse = await request(app)
        .post('/api/auth/callback/credentials')
        .withCredentials()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Cookie', csrfResponse.headers['set-cookie'])
        .send({
            csrfToken: csrfToken,
            email: email,
            password: password,
            project: project,
        });
    // // get session
    const sessionResponse = await request(app)
        .get('/api/auth/session')
        .withCredentials()
        .set('Cookie', loginResponse.headers['set-cookie']);

    return sessionResponse.headers['set-cookie'];
}