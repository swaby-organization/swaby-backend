// create the route testing file

// Path: _test_/router.test.jsx

const { server } = require( '../src/server' );
const supertest = require( 'supertest' );
const mockRequest = supertest( server );

describe( 'API Server' , () => {
        it( 'should respond with a 404 on an invalid route' , () => {
            return mockRequest
                .get( '/foo' )
                .then( results => {
                    expect( results.status ).toBe( 404 );
                });
        });
        it( 'should respond with a 404 on an invalid method' , () => {
            return mockRequest
                .post( '/api/v1/users' )
                .then( results => {
                    expect( results.status ).toBe( 404 );
                });
        });
        it( 'should respond with a 200 on a valid route' , () => {
            return mockRequest
                .get( '/api/v1/users' )
                .then( results => {
                    expect( results.status ).toBe( 200 );
                });
        });
    }
);

describe('Route Testing', () => {
    it('should respond with a 404 on an invalid route', () => {
        return mockRequest
            .get('/foo')
            .then(results => {
                expect(results.status).toBe(404);
            });
    });
    it('should respond with a 404 on an invalid method', () => {
        return mockRequest
            .post('/api/v1/users')
            .then(results => {
                expect(results.status).toBe(404);
            });
    });
    it('should respond with a 200 on a valid route', () => {
        return mockRequest
            .get('/api/v1/users')
            .then(results => {
                expect(results.status).toBe(200);
            });
    });
}
);


describe('controllers testing', () => {
    it('should respond with a 200 on a valid route', () => {
        return mockRequest
            .get('/api/v1/users')
            .then(results => {
                expect(results.status).toBe(200);
            });
    });
}
);


