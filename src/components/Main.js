import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import AddTodo from "../containers/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";
import Footer from "./Footer";
import ClearTodo from "../containers/ClearTodo";

const Main = ({ match , storage }) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Todo App.
                </Text>
                <ClearTodo />
            </View>

            <AddTodo />
            <VisibleTodoList />
            <Footer />
            {
                //
                //
                //
            }

        </View>
    );
};

export default Main;

const { height, width } = Dimensions.get('window');
let styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flex: 1,
        width: (Platform.OS === "web") ? Math.min(width, 640) : null,
        margin: 10,
        justifyContent: 'center',
    },
    titleContainer: {
        flexDirection: "row"
    },
    title: {
        flex: 1,
    },

});
