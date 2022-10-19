export default function getRoutes(messages){
	let routes = [];
	messages.forEach((message)=>{
		let { component, paths } = message;
		paths.forEach((path)=>{
			routes.push({
				path,
				component: component(path)
			});
		})
	})
	return routes;
}