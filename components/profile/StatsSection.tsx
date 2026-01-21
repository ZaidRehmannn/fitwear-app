import { StyleSheet, Text, View } from "react-native";

interface UserStat {
    label: string;
    value: string;
}

interface StatsSectionProps {
    stats: UserStat[];
}

const StatsSection = ({ stats }: StatsSectionProps) => {
    return (
        <View style={styles.statsContainer}>
            {stats.map((stat) => (
                <View key={stat.label} style={styles.statItem}>
                    <Text style={styles.statNumber}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
            ))}
        </View>
    );
};

export default StatsSection;

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 24,
        paddingVertical: 20,
        backgroundColor: "#1B3B5D",
        borderRadius: 16,
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#00cfff",
    },
    statLabel: {
        fontSize: 12,
        color: "#a0aec0",
        marginTop: 4,
    },
});