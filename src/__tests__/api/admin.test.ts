// test api as admin
import { Response } from 'superagent';
import request from 'supertest';
import getSession from '@/utils/getSession';

const app = 'http://localhost:3000';
let cookies: string[];

// login
beforeAll(async () => {
    cookies = await getSession('admin@report.com', 'xY7zZ6yYsZ4xX8yY', 'admin');
});

// get all reports
test('get all reports', async () => {
    const response = await request(app)
        .get('/api/report')
        .withCredentials()
        .set('Cookie', cookies);
    expect(response.status).toBe(200);
});