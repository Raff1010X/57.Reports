// test api/project route
import request from 'supertest';

const app = 'http://localhost:3000';


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


describe('Test the project api', () => {

    // send a POST request to the api/project route
    let id = 1;
    test('POST /api/project', (done) => {
        request(app)
            .post('/api/project')
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
            .then((response) => {
                expect(response.body).toHaveProperty('status');
                expect(response.body).toHaveProperty('message');
                expect(response.body).not.toHaveProperty('data');
                expect(response.statusCode).toBe(404);
                expect(response.body.status).toBe('error');
                expect(response.body.message).toBe('Error occurred while processing document(s) request');

                done();
            });
    });
    

});
