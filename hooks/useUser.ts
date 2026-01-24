import { useAuth } from "@/context/AuthContext";
import { updateUserProfile, uploadToCloudinary } from "@/services/userService";

export const useUser = () => {
    const { user, setUserData } = useAuth();

    const updateName = async (newName: string) => {
        if (!user) return;
        await updateUserProfile(user.uid, { name: newName });
        setUserData(prev => prev ? { ...prev, name: newName } : null);
    };

    const updatePicture = async (uri: string) => {
        if (!user) return;

        const { url, publicId } = await uploadToCloudinary(user.uid, uri);

        await updateUserProfile(user.uid, {
            profilePic: url,
            profilePicId: publicId
        });

        setUserData(prev => prev ? { ...prev, profilePic: url } : null);
    };

    const removePicture = async () => {
        if (!user) return;
        await updateUserProfile(user.uid, { profilePic: null });
        setUserData(prev => prev ? { ...prev, profilePic: undefined } : null);
    };

    return { updateName, updatePicture, removePicture };
};