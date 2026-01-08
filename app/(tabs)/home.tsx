import Categories from '@/components/Home/Categories'
import Header from '@/components/Home/Header'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
    const [openCategory, setopenCategory] = useState(false);

    const screenWidth = Dimensions.get('window').width;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <Header openCategory={openCategory} setopenCategory={setopenCategory} />

            {/* Dropdown below header */}
            {openCategory && (
                <View style={[styles.dropdown, { width: screenWidth }]}>
                    <Categories onPressCategory={(cat) => {
                        console.log("Selected:", cat);
                        setopenCategory(false); // close dropdown on selection
                    }} />
                </View>
            )}

            {/* Product Feed */}
            <View style={styles.content}>
                <Text>Product feed coming here</Text>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1B3B5D",
    },
    dropdown: {
        position: 'absolute',
        top: 60, // adjust according to header height
        left: 0,
        backgroundColor: '#0D1B2A',
        zIndex: 10,
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        marginTop: 60, // push content below header
    },
});
