import auth from "../authService";
import { isAuthenticated, user } from "../store";

/** @type {import('./$types').LayoutLoad} */
export async function load({ params }) {

    if (typeof window !== 'undefined') {
        console.log(`⭐️⭐️⭐️ setting user and auth0Client`);

        console.log('⭐️⭐️⭐️ params', JSON.stringify(params));

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