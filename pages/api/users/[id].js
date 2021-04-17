import dbConnect from '../../../utils/dbConnect'
import User from '../../../schemas/User'


export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;
    let response = {
        status: 400,
        message: '',
        data: {},
    }
    switch (method) {
        case 'PUT':
            try {
                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });

                if (!user) {
                    response.message = 'failed to find user'
                } else {
                    response.status = 200
                    response.message = 'success'
                    response.data = user
                }

            } catch (error) {
                response.message = 'error in try/catch, see console'
                console.log(error)
            }
            break;
        default:
            response.message = 'api is only for updating'
            break;
    }

    res.status(response.status).json({message: response.message, data: response.data})
}
