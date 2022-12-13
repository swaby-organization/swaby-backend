const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );
const base64 = require( "base-64" );
jest.setTimeout( 60000 );

describe( 'check user endpoints ', () => {
  it( 'check user signup', async () => {
    const res = await request.post( '/signup' ).send( {
      "username": "zaidalshibi1",
      "firstName": "zaid",
      "lastName": "alshibi",
      "email": "zaidalshibi@gmail.com",
      "password": "password",
      "city": "Amman",
      "country": "Jordan",
      "avatar": ""
    } );
    expect( res.status ).toEqual( 200 );
    expect( res.body.user.username ).toEqual( 'zaidalshibi1' );
    expect( res.body.user.firstName ).toEqual( 'zaid' );
    expect( res.body.user.lastName ).toEqual( 'alshibi' );
    expect( res.body.user.email ).toEqual( 'zaidalshibi@gmail.com' );
    expect( res.body.user.city ).toEqual( 'Amman' );
    expect( res.body.user.country ).toEqual( 'Jordan' );
    expect( res.body.user.avatar ).toEqual( '' );
  } );


  it( 'check user signin', async () => {
    await request.post( '/signin' ).set( 'Authorization', `Basic ${base64.encode( 'zaidalshibi:zaid123' )}` ).then( ( res ) => {
    expect( res.status ).toEqual( 200 );
    expect( res.body.token ).toBeDefined();
    expect( res.body.user.username ).toEqual( 'zaidalshibi' );
    expect( res.body.user.firstName ).toEqual( 'Zaid' );
    expect( res.body.user.lastName ).toEqual( 'Alshibi' );
    expect( res.body.user.email ).toEqual( 'zaid@gmail.com' )} )
    .then(async(result) => {
    await request.get( '/userinfo/1' ).set( 'Authorization', `Bearer ${result.body.token}` )
    .then((res) => {
    expect( res.status ).toEqual( 200 );
    expect( res.body ).toBeDefined();
    expect( res.body.user.username ).toEqual( 'zaidalshibi' );
    expect( res.body.user.firstName ).toEqual( 'Zaid' );
    expect( res.body.user.lastName ).toEqual( 'Alshibi' );
    expect( res.body.user.email ).toEqual( '' );
    expect( res.body.user.city ).toEqual( 'AMMAN' );
    expect( res.body.user.country ).toEqual( 'JORDAN' );
    expect( res.body.user.avatar ).toEqual( '' );
    expect( res.body.user.points ).toEqual( 10 );
    });
    }).catch((err) => {
    console.log(err);
    });
  } );

  it( 'test get user profile by id', async () => {
    const res = await request.get( '/userprofile/1' );
    expect( res.status ).toEqual( 200 );
    expect( res.body ).toBeDefined();
    expect( res.body.user.username ).toEqual( 'zaidalshibi' );
    expect( res.body.user.firstName ).toEqual( 'Zaid' );
    expect( res.body.user.lastName ).toEqual( 'Alshibi' );
    expect( res.body.user.email ).toEqual( 'zaid@gmail.com' );
    expect( res.body.user.city ).toEqual( 'AMMAN' );
    expect( res.body.user.country ).toEqual( 'JORDAN' );
    expect( res.body.user.avatar ).toEqual( '' )
  } );
} );