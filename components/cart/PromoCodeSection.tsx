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
    onRemove?: () => void;
    loading: boolean;
    error: string | null;
    success: boolean;
    externalCode?: string;
}

const PromoCodeSection = ({
    onApply,
    onRemove,
    loading,
    error,
    success,
    externalCode
}: PromoCodeSectionProps) => {
    const [code, setCode] = useState("");

    useEffect(() => {
        if (externalCode) {
            setCode(externalCode);
        }
    }, [externalCode]);

    const handleApply = () => {
        if (success && onRemove) {
            onRemove();
            setCode("");
            return;
        }
        if (!code.trim() || loading) return;
        onApply(code.trim());
    };

    const getButtonText = () => {
        if (loading) return "Applying...";
        if (success) return "Remove";
        return "Apply";
    };

    useEffect(() => {
        if (success) {
            showToast("success", "Promo code applied successfully");
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            Alert.alert("Promo Code Error", error);
        }
    }, [error]);

    return (
        <View style={styles.promoSection}>
            <View style={[
                styles.promoInputWrapper,
                success && styles.successInput
            ]}>
                <Ionicons
                    name={success ? "checkmark-circle" : "pricetag"}
                    size={20}
                    color={success ? "#10B981" : "#888"}
                />
                <TextInput
                    value={code}
                    onChangeText={(text) => {
                        if (!success) setCode(text);
                    }}
                    placeholder="Enter promo code"
                    placeholderTextColor="#888"
                    style={styles.promoInput}
                    autoCapitalize="characters"
                    editable={!loading && !success}
                />
            </View>

            <TouchableOpacity
                style={[
                    styles.applyBtn,
                    (loading || !code.trim()) && !success && styles.disabledBtn,
                    success && styles.removeBtn
                ]}
                onPress={handleApply}
                disabled={loading || (!code.trim() && !success)}
            >
                <Text style={styles.applyBtnText}>
                    {getButtonText()}
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
        borderWidth: 1,
        borderColor: "transparent",
    },
    successInput: {
        borderColor: "#10B981",
        backgroundColor: "#F0FDF4",
    },
    applyBtn: {
        backgroundColor: "#1B3B5D",
        paddingHorizontal: 24,
        height: 50,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 100,
    },
    removeBtn: {
        backgroundColor: "#EF4444",
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
        fontWeight: "500",
    },
    disabledBtn: {
        opacity: 0.5,
    },
});