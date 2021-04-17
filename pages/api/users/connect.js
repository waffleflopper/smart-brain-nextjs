import dbConnect from '../../../utils/dbConnect'
import User from '../../../schemas/User'

dbConnect()

export default async (req, res) => {
    const { method, body } = req
    let response = {
        message: "default",
        status: 400,
        data: {},
    }

    switch(method) {
        case 'POST':

            try {
                const myUser = await User.findOne({ email: body.email })
                if (!myUser) {
                    //email is unique so no find means we create an entry for them
                    const newUser = await User.create(
                        {
                            email: req.body.email,
                            entries: 0,
                        }
                    )
                    response.message = "didn't exist, created"
                    response.data = newUser
                    response.status = 200
                } else {
                    response.data = myUser
                    response.status = 200
                    response.message = "success"
                }
            } catch (error) {
                console.log(error)
            }
            break;
        default:
            response.message = "incorrect use of API"
            break;
    }

    return res.status(response.status).json({message: response.message, data: response.data})
}