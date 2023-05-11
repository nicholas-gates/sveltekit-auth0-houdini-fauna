import { createAuth0Client, Auth0Client, type PopupLoginOptions } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from "./store";
import config from "../auth_config";

async function createClient() {

    let auth0Client = await createAuth0Client({
        domain: config.domain,
        clientId: config.clientId,
        cacheLocation: "localstorage",
        useRefreshTokens: true,
    });

    return auth0Client;
}

async function loginWithPopup(client: Auth0Client, options: PopupLoginOptions) {
	popupOpen.set(true);
	console.log(`options: ${JSON.stringify(options)}`);
    try {
		await client.loginWithPopup(options);
		// console.log(`⭐️⭐️⭐️ loginResp: ${loginResp}`);

		const differentAudienceOptions = {
			authorizationParams: {
				audience: 'https://db.fauna.com/db/yu6n7xsjsyrfc',
			}
		};

		const fdbtoken = await client.getTokenSilently(differentAudienceOptions);
		// console.log(`⭐️⭐️⭐️ fdbtoken: ${fdbtoken}`);

		document.cookie = `fdbtoken=${fdbtoken}; Secure`;

		const authuser = await client.getUser();
		authuser.fdbtoken = fdbtoken;
		// console.log(`⭐️⭐️⭐️ authuser: ${JSON.stringify(authuser)}`);

		user.set(authuser);
		isAuthenticated.set(true);
	} catch (e) {
		// eslint-disable-next-line
		console.error(e);
	} finally {
		popupOpen.set(false);
	}
}

function logout(client) {
	document.cookie = `fdbtoken=; Secure`;
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;