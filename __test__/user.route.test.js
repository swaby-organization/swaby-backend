const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );

describe( 'check user endpoints ', () => {

    it( 'check user signup', async () => {
        const res = await request.post( '/signup' ).send( {
            "username": "testZaid",
            "firstName": "test",
            "lastName": "test",
            "email": "testZaid@test.com",
            "password": "test",
            "city": "test",
            "country": "test",
            "avatar": "test"
        } );
        expect( res.status ).toEqual( 200 );
        expect( res.body.username ).toEqual( 'testZaid' );
        expect(res.headers['set-cookie']).toBeDefined();
    } );


  it('check user signin', async () => {
    const res = await request.post('/signin').auth("testZaid", "test");
    expect(res.status).toEqual(200);
    expect(res.body.token).toBeDefined();
  });

    it( 'test get user profile by id', async () => {
        const res = await request.get( '/userprofile/1' );
        expect( res.status ).toEqual( 200 );
        expect( res.body ).toBeDefined();
        expect(res.header['content-type']).toEqual(expect.stringContaining('json'));
    } );
} );


