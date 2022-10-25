const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );
jest.setTimeout( 60000 );
xdescribe( 'check item endpoints ', () => {

  it( 'check get all items ', async () => {
    const res = await request.get( '/items' );
    expect( res.status ).toEqual( 200 );
  } );

  it( 'check get one item by ID ', async () => {
    const res = await request.get( '/items/2' );
    expect( res.status ).toEqual( 200 );
  } );

  it( 'check get ItemsByUser', async () => {
    const res = await request.get( '/itemsbyuser/1' );
    expect( res.status ).toEqual( 200 );
  } );

  /*  it('check create item', async () => {
     const res = await request.post('/items').send({
       "name": "item",
       "description": "item description",
       "estimatedValue": 25,
       "sellingStatus": "true",
       "category": "Antique",
       "owner": 1,
       "cityOfSwap": "Amman",
       "countryOfSwap": "Jordan",
       "swapFor": "Anything",
       "uploadedImages": ['']
     });
     expect(res.status).toEqual(200);
   }); */

  it( 'check edit item by id', async () => {
    const res = await request.post( '/items/6' ).send( {
      "name": "item",
      "description": "item description",
      "estimatedValue": 25,
      "category": "Antique",
      "owner": 1,
      "cityOfSwap": "Amman",
      "countryOfSwap": "Jordan",
      "swapFor": "Anything",
      "uploadedImages": [ '' ]
    } );
    expect( res.status ).toEqual( 200 );
  } );

  it( 'check delete item by id', async () => {
    const res = await request.delete( '/items/2' );
    expect( res.status ).toEqual( 200 );
  }
  );
} );


xdescribe( 'check item endpoints ', () => {

  it( 'check get all items ', async () => {
    const res = await request.get( '/items' );
    expect( res.status ).toEqual( 200 );
    expect( res.headers[ 'content-type' ] ).toEqual( expect.stringContaining( 'json' ) );
  } );

  it( 'check get one item by ID ', async () => {
    const res = await request.get( '/items/2' );
    expect( res.status ).toEqual( 200 );
    expect( res.headers[ 'content-type' ] ).toEqual( expect.stringContaining( 'json' ) );
  } );

  it( 'check get ItemsByUser', async () => {
    const res = await request.get( '/itemsbyuser/2' );
    expect( res.status ).toEqual( 200 );
    expect( res.headers[ 'content-type' ] ).toEqual( expect.stringContaining( 'json' ) );
  } );

  /*  it('check create item', async () => {
     const res = await request.post('/items').send({
       "name": "item",
       "description": "item description",
       "estimatedValue": 25,
       "sellingStatus" : 'true',
       "category": "Antique",
       "owner": 1,
       "cityOfSwap": "Amman",
       "countryOfSwap": "Jordan",
       "swapFor": "Anything",
       "uploadedImages": ['']
     });
     expect(res.status).toEqual(200);
     expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
   }); */

  it( 'check edit item by id', async () => {
    const res = await request.post( '/items/7' ).send( {
      "name": "item",
      "description": "item description",
      "estimatedValue": 25,
      "category": "Antique",
      "owner": 1,
      "cityOfSwap": "Amman",
      "countryOfSwap": "Jordan",
      "swapFor": "Anything",
      "uploadedImages": [ '' ]
    } );
    expect( res.status ).toEqual( 200 );
    expect( res.headers[ 'content-type' ] ).toEqual( expect.stringContaining( 'json' ) );
  } );


} );


// test print the data coming from the response

xdescribe( 'check the data coming from the response', () => {
  it( 'check get all items ', async () => {
    const res = await request.get( '/items' );
    expect( res.body.items[ 0 ].cityOfSwap ).toEqual( 'Amman' );
  } );

  it( 'check get one item by ID ', async () => {
    const res = await request.get( '/items/2' );
    expect( res.body ).toEqual( expect.any( Object ) );
  } );

  it( 'check get ItemsByUser', async () => {
    const res = await request.get( '/itemsbyuser/1' );
    expect( res.body.items[ 0 ].estimatedValue ).toEqual( 25 );
  } );
  /* 
    it('check create item', async () => {
      const res = await request.post('/items').send({
        "name": "item",
        "description": "item description",
        "estimatedValue": 25,
        "sellingStatus": "true",
        "category": "Antique",
        "owner": 1,
        "cityOfSwap": "Amman",
        "countryOfSwap": "Jordan",
        "swapFor": "Anything",
        "uploadedImages": 'test'
      });
      expect(res.body).toEqual(expect.any(Object));
    }); */

  it( 'check edit item by id', async () => {
    const res = await request.post( '/items/7' ).send( {
      "name": "item",
      "description": "item description",
      "estimatedValue": 25,
      "category": "Antique",
      "owner": 1,
      "cityOfSwap": "Amman",
      "countryOfSwap": "Jordan",
      "swapFor": "Anything",
      "uploadedImages": [ '' ]
    } );
    expect( res.body ).toEqual( expect.any( Object ) );
  } );

} );







