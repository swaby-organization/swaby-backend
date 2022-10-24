const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );

describe( 'check user endpoints ', () => {

    it( 'check user signup', async () => {
        const res = await request.post( '/signup' ).send( {
            "username": "test12345",
            "firstName": "test",
            "lastName": "test",
            "email": "test1234@test.com",
            "password": "test",
            "city": "test",
            "country": "test",
            "avatar": "test"
        } );
        expect( res.status ).toEqual( 200 );
    } );


  it('check user signin', async () => {
    const res = await request.post('/signin').auth("test12345", "test");
    expect(res.status).toEqual(200);
  });

    it( 'test get user profile by id', async () => {
        const res = await request.get( '/userprofile/1' );
        expect( res.status ).toEqual( 200 );
    } );
} );

