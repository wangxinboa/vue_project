import RGB from './rgb.js';

function checkH(value){
	if( typeof value !== 'number' ){
		return false;
	}
	if( value < 0 || value > 360 ){
		return false;
	}
	return true;
}

function checkSL(value){
	if( typeof value !== 'number' ){
		return false;
	}
	if( value < 0 || value > 1 ){
		return false;
	}
	return true;
}

function toRGB(h, p, q){
	return (
		h < 60 ? p + ( q - p ) * h / 60 :
		h < 180 ? q :
		h < 240 ? p + ( q - p ) * ( 240 - h ) / 60 :
		p
	) * 255
}

export default class HSL{
	constructor(h,s,l,a){
		this.type = 'hsl';
		if( !checkH(h) ){
			throw new Error('h 参数有误');
		}
		if( !(checkSL(s) && checkSL(l)) ){
			throw new Error('sl 参数有误');
		}
		if( typeof a !== 'number' || a > 1 || a < 0){
			throw new Error('a 参数有误');
		}
		this.h = h;
		this.s = s;
		this.l = l;
		this.a = a;
	}
	static toRGB(h, s, l){
		let 
			q = l < 0.5 ? l * ( 1 + s ) : l + s - l * s,
			p = 2 * l - q,

			r = toRGB(h >= 240 ? h - 240 : h + 120, p, q),
			g = toRGB(h, p, q),
			b = toRGB(h < 120 ? h + 240 : h - 120, p, q);

		return [r, g, b];
	}
	toRGB(){
		if( this.rgb ){
			return this.rgb;
		}
		let
			h = this.h,
			s = this.s,
			l = this.l,
			a = this.a,

			rgb = HSL.toRGB( this.h, this.s, this.l );

		this.rgb = new RGB(
			rgb[0],
			rgb[1],
			rgb[2],
			a
		);
		this.rgb.hsl = this;
		return this.rgb;
	}
}