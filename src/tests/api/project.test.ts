// test api/project route
import { Response } from 'superagent';
import request from 'supertest';

const app = 'http://localhost:3000';
let cookies: string[];

function statusSuccess(response: any) {
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('data');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
}

function instanceOf(response: any) {
    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data).toHaveProperty('name');
    expect(response.body.data).toHaveProperty('id');
}

// login
beforeAll(async () => {
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
            email: 'kowalczyk77@o2.pl',
            password: 'test1234',
            project: 'Trans',
        });
    // get session
    const sessionResponse = await request(app)
        .get('/api/auth/session')
        .withCredentials()
        .set('Cookie', loginResponse.headers['set-cookie']);

    cookies = sessionResponse.headers['set-cookie'];
});

describe('Test the project api', () => {

    // send a POST request to the api/project route
    let id = 1;
    test('POST /api/project', (done) => {
        console.log(cookies);
        request(app)
            .post('/api/project')
            .set('Cookie', cookies)
            .set('Content-Type', 'application/json')
            .send({
                name: 'test project request',
            })
            .then((response) => {
                statusSuccess(response);
                instanceOf(response);
                expect(response.body.message).toBe('Document(s) created successfully');
                expect(response.body.data.name).toBe('test project request');
                id = response.body.data.id;

                done();
            });
    });

    // send a GET request to the api/project route
    test('GET /api/project', (done) => {
        request(app)
            .get('/api/project')
            .set('Cookie', cookies)
            .then((response) => {
                statusSuccess(response);
                expect(response.body.message).toBe('Document(s) retrieved successfully');
                expect(response.body.data).toBeInstanceOf(Array);
                expect(response.body.data).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        name: 'test project request',
                    }),
                ]));
                done();
            });
    });

    // send a GET request to the api/project route
    test('GET /api/project/:id', (done) => {
        request(app)
            .get(`/api/project/${id}`)
            .set('Cookie', cookies)
            .then((response) => {
                statusSuccess(response);
                instanceOf(response);
                expect(response.body.message).toBe('Document(s) retrieved successfully');
                expect(response.body.data.name).toBe('test project request');
                expect(response.body.data.id).toBe(id);

                done();
            });
    });

    // send a PUT request to the api/project route
    test('PUT /api/project/:id', (done) => {
        request(app)
            .put(`/api/project/${id}`)
            .set('Cookie', cookies)
            .set('Content-Type', 'application/json')
            .send({
                name: 'test project request updated',
            })
            .then((response) => {
                statusSuccess(response);
                instanceOf(response);
                expect(response.body.message).toBe('Document(s) updated successfully');
                expect(response.body.data.name).toBe('test project request updated');
                expect(response.body.data.id).toBe(id);

                done();
            });
    });

    // send a GET request to the api/project route
    test('GET /api/project', (done) => {
        request(app)
            .get('/api/project')
            .set('Cookie', cookies)
            .then((response) => {
                statusSuccess(response);
                expect(response.body.message).toBe('Document(s) retrieved successfully');
                expect(response.body.data).toBeInstanceOf(Array);
                expect(response.body.data).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        name: 'test project request updated',
                    }),
                ]));

                done();
            });
    });

    // send a DELETE request to the api/project route
    test('DELETE /api/project/:id', (done) => {
        request(app)
            .delete(`/api/project/${id}`)
            .set('Cookie', cookies)
            .then((response) => {
                statusSuccess(response);
                instanceOf(response);
                expect(response.body.message).toBe('Document(s) deleted successfully');
                expect(response.body.data.name).toBe('test project request updated');
                expect(response.body.data.id).toBe(id);

                done();
            });
    });

    // send a GET request to the api/project:id route to check if the project was deleted
    test('GET /api/project/:id', (done) => {
        request(app)
            .get(`/api/project/${id}`)
            .set('Cookie', cookies)
            .then((response) => {
                expect(response.body).toHaveProperty('status');
                expect(response.body).toHaveProperty('message');
                expect(response.body).not.toHaveProperty('data');
                expect(response.statusCode).toBe(404);
                expect(response.body.status).toBe('error');
                expect(response.body.message).toBe('No document(s) found');

                done();
            });
    });


});

describe('Test the project api with :projectID', () => {

    // send a POST request to the api/project route
    let id = 1;
    test('POST /api/project', (done) => {
        request(app)
            .post('/api/project')
            .set('Cookie', cookies)
            .send({
                name: 'test project request',
            })
            .then((response) => {
                statusSuccess(response);
                instanceOf(response);
                expect(response.body.message).toBe('Document(s) created successfully');
                expect(response.body.data.name).toBe('test project request');
                id = response.body.data.id;

                done();
            });
    });

    // send a GET request to the api/project route
    test('GET /api/project', (done) => {
        request(app)
            .get('/api/project')
            .set('Cookie', cookies)
            .then((response) => {
                statusSuccess(response);
                expect(response.body.message).toBe('Document(s) retrieved successfully');
                expect(response.body.data).toBeInstanceOf(Array);
                expect(response.body.data).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        name: 'test project request',
                    }),
                ]));

                done();
            });
    });

    // send a GET request to the api/:projectID route
    test('GET /api/:projectID', (done) => {
        request(app)
            .get(`/api/${id}`)
            .set('Cookie', cookies)
            .then((response) => {
                statusSuccess(response);
                instanceOf(response);
                expect(response.body.message).toBe('Document(s) retrieved successfully');
                expect(response.body.data.name).toBe('test project request');
                expect(response.body.data.id).toBe(id);

                done();
            });
    });

    // send a PUT request to the api/:projectID route
    test('PUT /api/:projectID', (done) => {
        request(app)
            .put(`/api/${id}`)
            .set('Cookie', cookies)
            .send({
                name: 'test project request updated',
            })
            .then((response) => {
                statusSuccess(response);
                instanceOf(response);
                expect(response.body.message).toBe('Document(s) updated successfully');
                expect(response.body.data.name).toBe('test project request updated');
                expect(response.body.data.id).toBe(id);

                done();
            });
    });

    // send a GET request to the api/project route
    test('GET /api/project', (done) => {
        request(app)
            .get('/api/project')
            .set('Cookie', cookies)
            .then((response) => {
                statusSuccess(response);
                expect(response.body.message).toBe('Document(s) retrieved successfully');
                expect(response.body.data).toBeInstanceOf(Array);
                expect(response.body.data).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        name: 'test project request updated',
                    }),
                ]));

                done();
            });
    });

    // send a DELETE request to the api/:projectID route
    test('DELETE /api/:projectID', (done) => {
        request(app)
            .delete(`/api/${id}`)
            .set('Cookie', cookies)
            .then((response) => {
                statusSuccess(response);
                instanceOf(response);
                expect(response.body.message).toBe('Document(s) deleted successfully');
                expect(response.body.data.name).toBe('test project request updated');
                expect(response.body.data.id).toBe(id);

                done();
            });
    });

    // send a GET request to the api/project:id route to check if the project was deleted
    test('GET /api/:projectID', (done) => {
        request(app)
            .get(`/api/${id}`)
            .set('Cookie', cookies)
            .then((response) => {
                expect(response.body).toHaveProperty('status');
                expect(response.body).toHaveProperty('message');
                expect(response.body).not.toHaveProperty('data');
                expect(response.statusCode).toBe(404);
                expect(response.body.status).toBe('error');
                expect(response.body.message).toBe('No document(s) found');

                done();
            });
    });


});
