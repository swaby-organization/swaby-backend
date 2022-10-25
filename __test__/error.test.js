const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );

describe( 'Testing Errors (404, 401)', () => {
    it( 'Test 404 error', async () => {
        const res = await request.get( '/myItems' );
        expect( res.status ).toEqual( 404 );
        expect( res.text ).toEqual( `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /myItems</pre>
</body>
</html>
` );
    } );

    it( 'Testing 401 error', async () => {
        const res = await request.get( '/userinfo/1' );
        expect( res.status ).toEqual( 401 );
        expect( res.text ).toEqual( 'Invalid Login' );
    } );
} );