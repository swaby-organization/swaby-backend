const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );
const base64 = require( "base-64" );

describe( 'check user endpoints ', () => {
  it( 'check user signup', async () => {
    const res = await request.post( '/signup' ).send( {
      "username": "swapy1",
      "firstName": "test",
      "lastName": "test",
      "email": "swapy1@test.com",
      "password": "test",
      "city": "test",
      "country": "test",
      "avatar": "test"
    } );
    expect( res.status ).toEqual( 200 );
    expect( res.body.user.username ).toEqual( 'swapy1' );
    expect( res.body.user.firstName ).toEqual( 'test' );
    expect( res.body.user.lastName ).toEqual( 'test' );
    expect( res.body.user.email ).toEqual( 'swapy1@test.com' );
    expect( res.body.user.city ).toEqual( 'test' );
    expect( res.body.user.country ).toEqual( 'test' );
    expect( res.body.user.avatar ).toEqual( 'test' );
  } );


  it( 'check user signin', async () => {
    const res = await request.post( '/signin' ).set( 'Authorization', `Basic ${base64.encode( 'swapy1:test' )}` );
    expect( res.status ).toEqual( 200 );
    expect( res.body.token ).toBeDefined();
    expect( res.body.user.username ).toEqual( 'swapy1' );
    expect( res.body.user.firstName ).toEqual( 'test' );
    expect( res.body.user.lastName ).toEqual( 'test' );
    expect( res.body.user.email ).toEqual( 'swapy1@test.com' );
  } );

  // it( 'test get user profile by id', async () => {
  //   const res = await request.get( '/userprofile/1' );
  //   expect( res.status ).toEqual( 200 );
  //   expect( res.body ).toBeDefined();
  //   expect( res.body.username ).toEqual( 'testZaidsalah' );
  //   expect( res.body.firstName ).toEqual( 'test' );
  //   expect( res.body.lastName ).toEqual( 'test' );
  //   expect( res.body.email ).toEqual( 'testZaidsalah@test.com' );
  //   expect( res.body.city ).toEqual( 'test' );
  //   expect( res.body.country ).toEqual( 'test' );
  //   expect( res.body.avatar ).toEqual( 'test' );
  // } );
} );