import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";

const Topbar = () => {
    const isAdmin = false;
    const { signOut } = useAuth();
    // Call the signOut funct
    return (
        <div className="flex justify-between items-center p-4 sticky top-0 bg-zinc-900/75 text-white backdrop-blur-md z-10">
            <div className="flex gap-2 items-center ">
                ABMU6
            </div>
            <div className="flex gap-4 items-center">

                {isAdmin && (
                    <Link to={"/admin"}>
                        <LayoutDashboardIcon className="size-4 mr-2" />
                        Admin Dashboard
                    </Link>
                )}

                <SignedOut>
                    <SignInOAuthButton />
                </SignedOut>

                <SignedIn>
                    <button
                        onClick={() => signOut()} // Call signOut when the button is clicked
                        className="text-white hover:text-red-500 transition-colors"
                    >
                        Sign Out
                    </button>
                </SignedIn>




            </div>
        </div>
    )
}

export default Topbar
