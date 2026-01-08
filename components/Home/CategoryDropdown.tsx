import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Categories from './Categories';

interface CategoryDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    topOffset: number;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
    isOpen,
    onClose,
    topOffset
}) => {
    const screenWidth = Dimensions.get('window').width;

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <TouchableOpacity
                activeOpacity={1}
                style={[styles.overlay, { top: topOffset }]}
                onPress={onClose}
            />

            {/* Dropdown */}
            <View style={[
                styles.dropdown,
                {
                    width: screenWidth,
                    top: topOffset
                }
            ]}>
                <Categories
                    onPressCategory={(cat) => {
                        console.log("Selected:", cat);
                        onClose();
                    }}
                />
            </View>
        </>
    );
};

export default CategoryDropdown;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 998,
    },
    dropdown: {
        position: 'absolute',
        left: 0,
        backgroundColor: '#0D1B2A',
        zIndex: 999,
        paddingVertical: 10,
    },
});