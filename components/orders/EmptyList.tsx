import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

const EmptyList = () => {
    return (
        <View style={styles.emptyContainer}>
            <Ionicons name="bag-handle-outline" size={70} color="#cbd5e1" />
            <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: 'center',
        marginTop: 100,
        paddingHorizontal: 40
    },
    emptyText: {
        marginTop: 15,
        color: '#64748B',
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22
    }
});

export default EmptyList
