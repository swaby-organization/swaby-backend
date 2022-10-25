const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);

describe('Testing Errors (404, 401)', () => {
    it('Test 404 error', async () => {
        const res = await request.get('/myItems');
        console.log("=============================================")
        expect(res.status).toEqual(404);
        expect(error.message).toBe("no password given");
    })

    it('Testing 401 error', async () => {
        const res = await request.get('/userinfo/1');
        expect(res.status).toEqual(401);
        expect(error.message).toBe(expect(error.message)); 
    })
    it('Testing 500 error', async () => {
        const res = await request.get('/userinfo');
        expect(res.status).toEqual(500);
        expect(error.message).toBe("Server Error"); 
    })
})