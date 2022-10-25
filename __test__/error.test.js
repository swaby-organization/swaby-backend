const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );

xdescribe( 'Testing Errors (404, 401)', () => {
    it( 'Test 404 error', async () => {
        const res = await request.get( '/myItems' );
        console.log( "=============================================" );
        expect( res.status ).toEqual( 404 );
    } );

    it( 'Testing 401 error', async () => {
        const res = await request.get( '/userinfo/1' );
        expect( res.status ).toEqual( 401 );
        expect( error.message ).toBe( expect( error.message ) );
    } );
} );