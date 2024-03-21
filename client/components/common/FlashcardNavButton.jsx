import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from "react-native"

import { COLORS, SHADOWS } from "../../constants";

const FlashcardNavButton = ({ text }) => {

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Text style={styles.textBig}>{text}</Text>
        </TouchableOpacity>
    )
}

export default FlashcardNavButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        borderColor:  COLORS.primary,
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 15,
        flex: 1,
        borderWidth: 2,
    },
    textBig: {
        fontSize: 22,
        color: COLORS.lightWhite
    },

})