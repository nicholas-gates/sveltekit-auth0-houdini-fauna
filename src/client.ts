import { HoudiniClient } from '$houdini';

// console.log(`⭐️⭐️⭐️ creating HoudiniClient`);

export default new HoudiniClient({
	url: 'https://graphql.us.fauna.com/graphql',
	fetchParams({ session }) {
		let token;
		if (typeof window !== 'undefined') {

			token = document.cookie
				.split('; ')
				.find((row) => row.startsWith('fdbtoken='))
				?.split('=')[1];

			// console.log(`⭐️⭐️⭐️ houdfdbtoken: ${JSON.stringify(token)}`);
		} else {
			throw new Error('No token cookie found');
		}

		return {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};
	}
});
