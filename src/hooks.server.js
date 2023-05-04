import { setSession } from '$houdini'

/* @type { import('@sveltejs/kit').Handle } */
export const handle = async ({ event, resolve }) => {
    // get the user information however you want
    const user = await authenticateUser(event)

    // set the session information for this event
    setSession(event, { user })

    // pass the event onto the default handle
    return await resolve(event)
}

const authenticateUser = async (event) => {
    return {
        token: '1234',
    }
}