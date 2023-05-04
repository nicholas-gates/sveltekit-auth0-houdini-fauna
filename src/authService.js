import { createAuth0Client } from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "./store";
import config from "../auth_config";

async function createClient() {

    console.log(`config: ${JSON.stringify(config)}`)
    let auth0Client = await createAuth0Client({
        domain: config.domain,
        clientId: config.clientId,
        cacheLocation: "localstorage",
    });

    return auth0Client;
}

async function loginWithPopup(client, options) {
    popupOpen.set(true);
    console.log(`options: ${JSON.stringify(options)}`)

    try {
        await client.loginWithPopup(options);

        user.set(await client.getUser());
        isAuthenticated.set(true);
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client) {
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;