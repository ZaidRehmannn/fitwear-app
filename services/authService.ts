import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    UserCredential
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, db } from "../config/firebase";

export const signupUser = async (
    name: string,
    email: string,
    password: string
): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        createdAt: serverTimestamp(),
    });

    return userCredential;
};

export const loginUser = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async (): Promise<void> => {
    await signOut(auth);
};

export const getUserData = async (uid: string) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? userDoc.data() : null;
};

export const updateUserProfile = async (uid: string, data: { name: string }) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
};

export const uploadProfileImage = async (uid: string, uri: string): Promise<string> => {
    const storage = getStorage();
    const response = await fetch(uri);
    const blob = await response.blob();

    const imageRef = ref(storage, `profile_pics/${uid}`);
    await uploadBytes(imageRef, blob);

    const downloadURL = await getDownloadURL(imageRef);

    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { profilePic: downloadURL });

    return downloadURL;
};

export const removeProfileImage = async (uid: string) => {
    const storage = getStorage();
    const imageRef = ref(storage, `profile_pics/${uid}`);

    try {
        await deleteObject(imageRef);
    } catch (error: any) {
        console.log("Storage file not found or already deleted");
    }

    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { profilePic: null });
};
