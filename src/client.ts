import { HoudiniClient } from '$houdini';
import { PUBLIC_FAUNADB_KEY } from '$env/static/public';

export default new HoudiniClient({
	url: 'https://graphql.us.fauna.com/graphql',
	fetchParams({ session }) {
		console.log(`FAUNADB_KEY`, PUBLIC_FAUNADB_KEY);
		return {
			headers: {
				Authorization: `Bearer PUBLIC_FAUNADB_KEY-`
			}
		};
	}

	// uncomment this to configure the network call (for things like authentication)
	// for more information, please visit here: https://www.houdinigraphql.com/guides/authentication
	// fetchParams({ session }) {
	//     return {
	//         headers: {
	//             Authentication: `Bearer ${session.token}`,
	//         }
	//     }
	// }
});
