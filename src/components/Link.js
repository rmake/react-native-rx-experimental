import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TouchableOpacity, TouchableHighlight} from "react-native";

const Link = ({active, children, filter, onClick }) => {

    if (active) {
        return (
            <View style={[styles.button, styles.selected]}>
                {children}
            </View>
        );
    }

    return (
        <TouchableHighlight style={[styles.button, styles.notSelected]} onPress={() => {onClick(filter)}}>
            {children}
        </TouchableHighlight>
    );
};

let styles = StyleSheet.create({
    button: {
        minWidth: 60,
        flexDirection: "row",
        height: 50,
        alignItems: 'center',
        marginTop: 4,
        borderWidth: 2,
        borderRadius: 10,
        margin: 2,
    },
    selected: {
        borderColor: '#7ad',
    },
    notSelected: {
        borderColor: '#555',
    },
});

export default Link;
