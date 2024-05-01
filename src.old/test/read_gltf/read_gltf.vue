<template>
	<v-page
		icon="fsux_tubiao_gongshi_jisuan"
		title="glif 读取">
		<div id="readGltf" class="fill">
			<input class="hidden_input_button" type="file" name="file"/>
		</div>
	</v-page>
</template>

<script>
	import parseGlb from './parse_glb.js';

	export default {
		mounted(){
			console.log('readGltf');
			const url = 'https://playground.babylonjs.com/scenes/seagulf.glb';

			// const request = new XMLHttpRequest();

			// request.open( 'GET', url, true );


			// request.onreadystatechange = function (){
			// 	if( request.readyState === 4 ){
			// 		if( request.status === 200 ){

			// 			// console.log('request.responseText:', request.responseText);
			// 			// console.log(response.blob())

			// 		}else{
			// 			throw new Error(request.status, "Unable to load" + loadUrl);
			// 		}
			// 	}
			// // }
			// request.addEventListener( 'load', function ( event ) {

			// 	// console.log(event.target.response);
			// });

			// request.send(null);


			const req = new Request( url, {
				headers: new Headers({}),
				credentials: 'same-origin',
			} );

			fetch( req ).then((response)=>{
				if ( response.status === 200 || response.status === 0 ) {

					const reader = response.body.getReader();

					return new Response( new ReadableStream( {
						start( controller ) {

							readData();

							function readData() {

								reader.read().then( ( { done, value } ) => {
									if ( done ) {

										controller.close();
									} else {

										controller.enqueue( value );
										readData();
									}
								} );
							}
						}
					} ) );
				}
			}).then((response)=>{
				// console.log('response.blob():', response.blob());
				return response.arrayBuffer();
			}).then((data)=>{
				// console.log('data:', data);

				parseGlb(data);
			});


		}
	}
</script>

<style lang="less">
	#readGltf{
		position: relative;
	}
</style>