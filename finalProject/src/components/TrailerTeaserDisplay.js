import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from "../contexts/ThemeContext";

function TrailerTeaserDisplay(props) {
    const deviceWidth = Dimensions.get("window").width;
    var posterWidth = (deviceWidth - 50) / 2;
    var leftPosition = (posterWidth - 24) / 2;

    const thumbnail = "https://img.youtube.com/vi/" + props.trailerdata.key + "/hqdefault.jpg";

    return (
        <ThemeContext.Consumer>
            {(context) => {
                const { boolDarkMode, light, dark } = context;
                return (
                    <TouchableWithoutFeedback
                        onPress={props.onPressFunction}
                    >
                        <View style={{ marginRight: 5 }}>
                            <MaterialCommunityIcons
                                style={{
                                    position: "absolute",
                                    left: leftPosition,
                                    top: 38,
                                    zIndex: 1,
                                }}
                                name="arrow-right-drop-circle"
                                size={24}
                                color={"#fff"}
                            />
                            <Image resizeMode="cover" style={{ width: posterWidth, height: 100, marginBottom: 5 }} source={{ uri: thumbnail }} />
                            <Text style={[styles.trailerName, { color: boolDarkMode ? light.bg : dark.bg }]}>{props.trailerdata.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }}
        </ThemeContext.Consumer>
    );
}

const styles = StyleSheet.create({
    trailerName: {
        flexWrap: "wrap",
        width: 155,
    },
});

export default TrailerTeaserDisplay;