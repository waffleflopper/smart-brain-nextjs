import { handleAuth, handleCallback } from '@auth0/nextjs-auth0'


const afterCallback = (req, res, session, state) => {
    //from here we can link up with the stored db stuff


    //check to see if that email has an entry already
        //pass along if found || create if not
    
    //set our entries on the user object as well as the unique _id
    

    session.user.entries = 0
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