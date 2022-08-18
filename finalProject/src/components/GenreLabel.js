import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

function GenreLabel(props) {
    return (
        <ThemeContext.Consumer>
            {(context) => {
                const { boolDarkMode, light, dark } = context;
                return (
                    <View style={styles.itemGroup}>
                        {
                            props.data.map((item, index) => {
                                return (
                                    <View style={[styles.label, { borderWidth: 1, borderColor: boolDarkMode ? light.bg : dark.bg, borderRadius: 20 }]} key={index}>
                                        <Text style={styles.genreText}>{item}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                )
            }}
        </ThemeContext.Consumer>
    );
}

const styles = StyleSheet.create({
    itemGroup: {
        flexDirection: "row",
    },
    label: {
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 16,
        marginRight: 10,
        marginTop: 5,
    },

    genreText: {
        color: "white",
    }
})

export default GenreLabel;