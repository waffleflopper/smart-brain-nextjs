import { handleAuth, handleCallback } from '@auth0/nextjs-auth0'


const afterCallback = async (req, res, session, state) => {
    //from here we can link up with the stored db stuff


    //check to see if that email has an entry already
        //pass along if found || create if not
    
    //set our entries on the user object as well as the unique _id
    
    await (async () => {
        const rawResponse = await fetch('http://localhost:3000/api/users/connect', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: session.user.email})
        })
        const content = await rawResponse.json();
        const { _id, entries } = await content.data;

        session.user.uniqueID = _id;
        session.user.entries = entries;

    })();
    
    return session;
}

export default handleAuth({
    async callback(req, res) {
        try {
            await handleCallback(req, res, { afterCallback });
        } catch (error) {
            res.status(error.status || 500).end(error.message)
        }
    }
});