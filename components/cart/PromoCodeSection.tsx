import { showToast } from "@/utils/toast";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

interface PromoCodeSectionProps {
    onApply: (code: string) => void;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const PromoCodeSection = ({ onApply, loading, error, success }: PromoCodeSectionProps) => {
    const [code, setCode] = useState("");

    const handleApply = () => {
        if (!code.trim() || loading) return;
        onApply(code.trim());
    };

    useEffect(() => {
        if (success) {
            showToast("success", "Promo code applied successfully");
            setCode("");
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            Alert.alert("Promo Code Error", error);
        }
    }, [error]);

    return (
        <View style={styles.promoSection}>
            <View style={styles.promoInputWrapper}>
                <Ionicons name="pricetag" size={20} color="#888" />
                <TextInput
                    value={code}
                    onChangeText={setCode}
                    placeholder="Enter promo code"
                    placeholderTextColor="#888"
                    style={styles.promoInput}
                    autoCapitalize="characters"
                    editable={!loading}
                />
            </View>

            <TouchableOpacity
                style={[
                    styles.applyBtn,
                    (loading || !code.trim()) && styles.disabledBtn,
                ]}
                onPress={handleApply}
                disabled={loading || !code.trim()}
            >
                <Text style={styles.applyBtnText}>
                    {loading ? "Applying..." : "Apply"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PromoCodeSection;

const styles = StyleSheet.create({
    promoSection: {
        flexDirection: "row",
        alignItems: "center",
        margin: 20,
        gap: 12,
    },
    promoInputWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        gap: 10,
    },
    promoPlaceholder: {
        color: "#888",
        fontSize: 14,
    },
    applyBtn: {
        backgroundColor: "#1B3B5D",
        paddingHorizontal: 24,
        height: 50,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    applyBtnText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
    promoInput: {
        flex: 1,
        fontSize: 14,
        color: "#1B3B5D",
    },
    disabledBtn: {
        opacity: 0.5,
    },
});