import HSL from './hsl.js';

function checkRGB(value){
	if( typeof value !== 'number' ){
		return false;
	}
	if( value < 0 || value > 255 ){
		return false;
	}
	if( value % 1 != 0 ){
		return false;
	}
	return true;
}

function hex(value){
	return ( value < 16 ? '0' : '' ) + value.toString(16);
}

export default class RGB{
	constructor(r,g,b,a = 1){
		this.type = 'rgb';
		if( !(checkRGB(r) && checkRGB(g) && checkRGB(b)) ){
			throw new Error('rgb 参数有误');
		}
		if( typeof a !== 'number' || a > 1 || a < 0){
			throw new Error('a 参数有误');
		}

		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;

		// this.hex = null;
		// this.hsl = null;
		// this.contrast50 = null;
	}
	static toHex(r,g,b){
		return '#' + hex(r) + hex(g) + hex(b);
	}
	toHex(){
		if( this.hex ){
			return this.hex;
		}
		let hex = RGB.toHex( this.r, this.g, this.b );
		this.hex = hex;
		return hex;
	}
	// https://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4
	static toHSL(r,g,b){

		let 
			max = Math.max( r, g, b ),
			min = Math.min( r, g, b ),

			difference = max - min,
			sum = max + min,

			h, s,
			l = sum / 2 / 255;

		switch( max ){
			case min:
				h = s = 0;
				break;
			case r:
				h = 60 * ( g - b ) / difference;
				if( g < b ){
					h += 360;
				}
				break;
			case g:
				h = 60 * ( b - r ) / difference + 120;
				break;
			case b:
				h = 60 * ( r - g ) / difference + 240;
				break;
		}

		s = l > 0.5 ? difference / ( 2 - 2 * l ) / 255 :
				difference / (2 * l) / 255;

		return [h, s, l];
	}
	toHSL(){
		if( this.hsl ){
			return this.hsl;
		}

		let 
			r = this.r,
			g = this.g,
			b = this.b,
			a = this.a,

			hsl = RGB.toHSL( r, g, b ),
			h = hsl[0],
			s = hsl[1],
			l = hsl[2];

		this.hsl = new HSL(h,s,l,a);
		this.hsl.rgb = this;
		return this.hsl;
	}
	// https://www.fly63.com/article/detial/2925
	static getContrast50(r,g,b){
		let hexColor = r << 16 + g << 8 + b;
		// return hexColor > 0xffffff / 2 ? [0,0,0] : [255,255,255];
		return hexColor > 0xffffff / 2 ? '#000000' : '#ffffff';
	}
	getContrast50(){
		// let rgb = RGB.getContrast50(this.r, this.g, this.b);
		// return new RGB(rgb[0], rgb[1], rgb[2]);
		return RGB.getContrast50(this.r, this.g, this.b);
	}
	static getContrastYIQ(r,g,b){
		// return ( r * 299 + g * 587 + b * 114 ) / 1000 >= 128 ? [0,0,0] : [255,255,255];
		return ( r * 299 + g * 587 + b * 114 ) / 1000 >= 128 ? '#000000' : '#ffffff';
	}
	getContrastYIQ(){
		// let rgb = RGB.getContrastYIQ(this.r, this.g, this.b);
		// return new RGB(rgb[0], rgb[1], rgb[2]);
		return RGB.getContrastYIQ(this.r, this.g, this.b);
	}
}
