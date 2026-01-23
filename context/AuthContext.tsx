import { auth } from '@/config/firebase';
import { getUserData, removeProfileImage, updateUserProfile, uploadProfileImage } from '@/services/authService';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface UserData {
    name: string;
    email: string;
    profilePic?: string;
    createdAt?: any;
}

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    updateProfile: (newName: string) => Promise<void>;
    updateProfilePic: (uri: string) => Promise<void>;
    deleteProfilePic: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                setLoading(true);
                setUser(currentUser);

                if (currentUser) {
                    const data = await getUserData(currentUser.uid);
                    if (data) {
                        setUserData(data as UserData);
                    }
                } else {
                    setUserData(null);
                }
            } catch (error) {
                console.error("Auth state change error:", error);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const updateProfile = async (newName: string) => {
        if (!user?.uid) throw new Error("No active user session");

        try {
            await updateUserProfile(user.uid, { name: newName });
            setUserData((prev) => (prev ? { ...prev, name: newName } : null));

        } catch (error) {
            console.error("Error updating profile in context:", error);
            throw error;
        }
    };

    const updateProfilePic = async (uri: string) => {
        if (!user) return;
        const downloadURL = await uploadProfileImage(user.uid, uri);
        setUserData(prev => prev ? { ...prev, profilePic: downloadURL } : null);
    };

    const deleteProfilePic = async () => {
        if (!user) return;
        await removeProfileImage(user.uid);
        setUserData(prev => prev ? { ...prev, profilePic: undefined } : null);
    };

    return (
        <AuthContext.Provider value={{ user, userData, loading, updateProfile, updateProfilePic, deleteProfilePic }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};