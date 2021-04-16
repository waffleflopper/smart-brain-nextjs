import dbConnect from '../../../utils/dbConnect'
import User from '../../../schemas/User'

export default async (req, res) => {
    const { 
        query: { id }, //this is how to grab the id
        method
    } = req;

    switch(method) {
        case 'PUT': //updating user
            try {
                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!user) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: user})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        
        default:
            res.status(400).json({ success: false, message: "blew the entire switch" })
            break;
    }
}