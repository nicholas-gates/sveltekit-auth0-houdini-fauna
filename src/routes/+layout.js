import auth from "../authService";
import { isAuthenticated, user } from "../store";

/** @type {import('./$types').LayoutLoad} */
export async function load() {

    if (typeof window !== 'undefined') {
        console.log(`⭐️⭐️⭐️ setting user and auth0Client`);

        const auth0Client = await auth.createClient();

        isAuthenticated.set(await auth0Client.isAuthenticated());
        user.set(await auth0Client.getUser());

        return {
            auth0Client,
            isAuthenticated,
            user
        };
    }

}