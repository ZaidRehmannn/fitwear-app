import { StyleSheet, Text } from "react-native";

const AppVersion = () => {
    return <Text style={styles.version}>FitWear v1.0.0</Text>;
};

export default AppVersion;

const styles = StyleSheet.create({
    version: {
        textAlign: "center",
        fontSize: 12,
        color: "#ccc",
        marginTop: 24,
        marginBottom: 40,
    },
});