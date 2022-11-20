import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../utils/colors';

export default function ListEmptyComponent() {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>No character found</Text>
            <Text style={styles.subtitle}>Try again</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        marginTop: 52,
        marginHorizontal: 24
    },
    title: {
        fontFamily: "Roboto-Thin",
        fontSize: 24,
        color: colors.secondary,
    },
    subtitle: {
        fontFamily: "Roboto-Thin",
        fontSize: 24,
        color: colors.textLightGrey,
    }
});
