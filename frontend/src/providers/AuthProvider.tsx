import { axiosInstance } from '@/lib/axios';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react'; // Ensure you import the Loader component

// Helper function to update the API token
const updateApiToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
            } catch (error) {
                updateApiToken(null);
                console.error("Error in AuthProvider:", error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, [getToken]);

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <Loader2 className="size-8 text-emerald-500 animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthProvider;