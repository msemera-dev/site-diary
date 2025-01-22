import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadImageToStorage = async (image: File | null): Promise<string | null> => {
    if (!image) return null;

    try {
        const timestamp = Date.now().toString();
        const storageRef = ref(storage, `images/${timestamp} - ${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Failed to upload image:", error);
        return null;
    }
};
