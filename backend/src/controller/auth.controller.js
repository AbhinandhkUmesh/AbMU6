import {User} from "../models/user.model.js"; //import user model


const  authCallback = async (req, res,next) => {
    try {
        console.log("Request body:", req.body);
        const {
            id,
            firstName,
            lastName,
            imageUrl
        } = req.body;

        //cheack if user already exists
        const user = await User.findOne({
            clerkId: id
        }); //find user by id 

        if (!user) {
            //sign up user
            await User.create({
                clerkId: id,
                fullName: `${firstName}  ${lastName}`,
                imageUrl,
            });
        }

        res.status(200).json({
            success: true
        }); //send response to client

    } catch (error) {
        console.log("Error in auth callback", error);
        next(error);
    }
};

export {
    authCallback
}; //export function to use in routes  