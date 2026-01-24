import { db } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const getUserData = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserProfile = async (uid: string, data: object) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
};

export const uploadToCloudinary = async (uid: string, uri: string) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
        throw new Error("Cloudinary configuration is missing in .env");
    }

    const formData = new FormData();
    const fileToUpload = {
        uri,
        type: 'image/jpeg',
        name: `profile_${uid}.jpg`,
    };

    formData.append("file", fileToUpload as any);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || "Upload failed");

    return {
        url: result.secure_url,
        publicId: result.public_id
    };
};
