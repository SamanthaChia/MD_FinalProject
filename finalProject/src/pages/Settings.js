import React, { Component } from 'react';
import { SafeAreaView, View, Text, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import Constants from "expo-constants";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Settings extends Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {(context) => {
                    const { boolDarkMode, light, dark, updateTheme } = context;
                    return (
                        <SafeAreaView
                            style={[
                                styles.container,
                                { backgroundColor: boolDarkMode ? dark.bg : light.bg },
                            ]}
                        >
                            <Text style={[styles.title, { color: boolDarkMode ? light.bg : dark.bg }]}>Settings</Text>
                            <View style={styles.settingsItem}>
                                <View style={styles.settingsItem2}>
                                    <MaterialCommunityIcons
                                        name={boolDarkMode ? "weather-night" : "weather-sunny"}
                                        style={{ color: boolDarkMode ? light.bg : dark.bg }}
                                        size={26}
                                    />
                                    <Text style={{ marginLeft: 10, color: boolDarkMode ? light.bg : dark.bg }}> Dark Mode</Text>
                                </View>
                                <Switch value={boolDarkMode} onValueChange={updateTheme} />
                            </View>
                        </SafeAreaView>
                    );
                }}
            </ThemeContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        marginTop: Constants.statusBarHeight,
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 20,
    },
    settingsItem: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    settingsItem2: {
        flexWrap: "wrap",
        alignItems: "center",
        flexDirection: "row",
    },
})