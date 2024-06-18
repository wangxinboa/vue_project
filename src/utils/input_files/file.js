export default class File {
	constructor( file ){

		this.type = "file";

		this.name = file.name;
		this.file = file;
		this.suffix = this.name.substring( this.name.lastIndexOf(".") );
	}

	read( callback ){

		if( this.text ){

			callback( this.text )
		}else{
			// let reader = new FileReader();

			// reader.readAsText( this.file );
			// reader.onload = function( e ){
			// 	this.text = reader.result;
			// 	callback( this.text );
			// }
		}
	}

	toJSON(){
		return {
			type: this.type,
			name: this.name,
		}
	}
}