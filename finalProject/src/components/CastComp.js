import React from 'react';
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

function CastComp(props) {
    return (
        <ThemeContext.Consumer>
            {(context) => {
                const { boolDarkMode, light, dark } = context;
                return (
                    <View style={styles.castContainer}>
                        <Image style={styles.profileImage} source={{ uri: props.item.profile_path }} />
                        <Text style={{ color: boolDarkMode ? light.bg : dark.bg }}>{props.item.name}</Text>
                    </View>
                )
            }}
        </ThemeContext.Consumer>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        borderRadius: 50,
        width: 100,
        height: 100,
        padding: 10,
    },
    castContainer: {
        alignItems: "center",
        paddingHorizontal: 5,
        marginVertical: 10,
    }
});

export default CastComp;