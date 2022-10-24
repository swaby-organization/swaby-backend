const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);

describe('Testing Errors (404, 500)', () => {
    it('Test 404 error', async () => {
        const res = await request.get('/myItems');
        console.log("=============================================", res)
        expect(res.status).toEqual(404);
    }),

        it('Testing 500 error',async () => {
            expect(                      )
        })
})