import { showToast } from "@/utils/toast";
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
    const pickImage = async (mode: 'camera' | 'library') => {
        const pickerOptions: ImagePicker.ImagePickerOptions = {
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        };

        try {
            if (mode === 'camera') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    showToast("error", "Camera access is required.");
                    return null;
                }
                return await ImagePicker.launchCameraAsync(pickerOptions);
            } else {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    showToast("error", "Gallery access is required.");
                    return null;
                }
                return await ImagePicker.launchImageLibraryAsync({
                    ...pickerOptions,
                    mediaTypes: ['images'],
                });
            }
        } catch (error) {
            showToast("error", "Failed to open picker.");
            return null;
        }
    };

    return { pickImage };
};