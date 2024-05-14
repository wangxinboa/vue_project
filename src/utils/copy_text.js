
const input = document.createElement('input');
input.setAttribute('readonly', 'readonly');
input.style.position = 'absolute';
input.style.left = '0';
input.style.right = '0';
input.style.opacity = 0;

export default function copyText(text){
	document.body.appendChild(input);
	input.setAttribute('value',  text);
	input.setSelectionRange(0, text.length);
	input.select();
	document.execCommand('copy');
	document.body.removeChild(input);
}