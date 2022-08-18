import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

function CastComp(props) {
    return (
        <ThemeContext.Consumer>
            {(context) => {
                const { boolDarkMode, light, dark } = context;
                return (
                    <View>

                    </View>
                )
            }}
        </ThemeContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {

    },
});

export default CastComp;