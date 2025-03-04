import {
    clerkClient
} from "@clerk/express";


export const protectRoute = async (req, res, next) => {
    if (!req.clerk.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - you must be logged in"
        });

    }
    next();
}

export const requireAdmin = async (req, res, next) => {
    try {
        const user = await clerkClient.users.getUser(req.clerk.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAdress;


        if (!isAdmin) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - you must be an admin"
            });
        }

        next();

    } catch (error) {
        console.log("Error in requireAdmin", error);
        next(error);
    }
}