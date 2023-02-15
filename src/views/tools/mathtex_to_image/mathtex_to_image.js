export default function mathtexToImage(tex){
	// 将 svg 转化为 image
	try{
		var
			img = document.createElement( "img" );
		img.setAttribute( "src", getBase64(tex) );
		return image;
	}catch(e){
		return new Error(e)
	}
}

export function getBase64(tex){
	try{
		// console.log('MathJax:', MathJax);
		// console.log('MathJax.tex2mml(tex):', MathJax.tex2mml(tex));
		// console.log('MathJax.tex2svg(tex):', MathJax.tex2svg(tex));
		var svgData = new XMLSerializer().serializeToString( MathJax.tex2svg(tex).childNodes[0] );
		return "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(svgData)) );
	}catch(e){
		return new Error(e)
	}
}