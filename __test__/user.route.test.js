const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );

describe( 'check user endpoints ', () => {

    it( 'check user signup', async () => {
        const res = await request.post( '/signup' ).send( {
            "username": "test123",
            "firstName": "test",
            "lastName": "test",
            "email": "test123@test.com",
            "password": "test",
            "city": "test",
            "country": "test",
            "avatar": "test"
        } );
        expect( res.status ).toEqual( 200 );
    } );

    it( 'test get user profile by id', async () => {
        const res = await request.get( '/userprofile/1' );
        expect( res.status ).toEqual( 200 );
    } );
} );

