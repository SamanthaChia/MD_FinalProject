import React, { Component, createContext } from "react";
export const ThemeContext = createContext();
import { AsyncStorage } from "@react-native-async-storage/async-storage";

class ThemeContextProvider extends Component {
    getboolDarkMode = async() => {
        try{
            //asyncstorage can only store strings
            const value = await AsyncStorage.getItem("boolDarkMode");
            if(value == null){
                await AsyncStorage.setItem("boolDarkMode", "false");
            } else{
                if(value == "true"){
                    this.setState({ boolDarkMode: true})
                }
            }
        } catch (e) {
            //error
        }
    };

    constructor(){
        super();
        this.state = {
            boolDarkMode: false,
            light: {bg: "FFF"},
            dark: {bg: "#2d2d2d"},
        };
        this.getboolDarkMode();
    }

    changeTheme = async () => {
        await AsyncStorage.setItem(
            "boolDarkMode",
            !this.state.boolDarkMode == false? "false" : "true"
        );
        this.setState({ boolDarkMode: !this.state.boolDarkMode});
    };

    render(){
        return(
            <ThemeContext.Provider value={{ ...this.state, updateTheme: this.changeTheme }}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}