const textDecoder = new TextDecoder();

function convertUint8ArrayToString(array){

	if ( window.TextDecoder !== undefined ) {

		return textDecoder.decode( array );

	}

	var s = '';

	for ( var i = 0, il = array.length; i < il; i ++ ) {

		s += String.fromCharCode( array[ i ] );
	}

	return s;
}

// function readHeader

export default function parseGlb(data){
	// console.log('new Uint8Array( data, 0, 4 ):', new Uint8Array( data, 0, 4 ))
	// const magic = convertUint8ArrayToString( new Uint8Array( data, 0, 4 ) );

	const
		headerView = new DataView( data, 0, 12 ),
		header = {
			magic: convertUint8ArrayToString( new Uint8Array( data.slice( 0, 4 ) ) ),
			version: headerView.getUint32( 4, true ),
			length: headerView.getUint32( 8, true )
		};

		const chunkContentsLength = header.length - 12;
		const chunkView = new DataView( data, 12 );
		let
			content = null, body = null,
			chunkIndex = 0;


		while ( chunkIndex < chunkContentsLength ) {

			const chunkLength = chunkView.getUint32( chunkIndex, true );

			console.log('chunkLength:', chunkLength);

			chunkIndex += 4;

			const chunkType = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			if ( chunkType === 0x4E4F534A ) {// JSON

				const contentArray = new Uint8Array( data, 12 + chunkIndex, chunkLength );
				content = textDecoder.decode( contentArray );

			} else if ( chunkType === 0x004E4942 ) {

				const byteOffset = 12 + chunkIndex;
				body = data.slice( byteOffset, byteOffset + chunkLength );
			}

			// Clients must ignore chunks with unknown types.
			chunkIndex += chunkLength;
		}


		const json = JSON.parse( content );


		console.log('json:', json);
		console.log('body:', body);


}