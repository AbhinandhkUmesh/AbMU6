import {User} from '../models/user.model.js'

export const getAllUsers = async (req, res,next) => {
    try {
        const currentUser = req.user.userId
         const users = await User.find({clerkId:{ $ne: currentUser }})

res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}