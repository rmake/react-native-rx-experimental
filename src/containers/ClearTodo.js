import React from "react";
import { connect } from "../state/rxStateComponent";
import todoActions from "../actions/todoActions";
import { StyleSheet, View, Text, TextInput, TouchableOpacity} from "react-native";

let ClearTodo = ({ onClick }) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            onClick();
        }} style={styles.button}>
            <Text>
                Clear
            </Text>
        </TouchableOpacity>
    </View>
);

var mapStateToProps = (state, ownProps) => ({
    onClick: () => { todoActions.clearTodo.send(); }
});

ClearTodo = connect(mapStateToProps)(ClearTodo);

let styles = StyleSheet.create({
    container: {
        margin: 2,
        flexDirection: "row",
    },
    button: {
        height: 50,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        borderColor: '#666',
        borderWidth: 2,
        borderRadius: 10,
    }
});

export default ClearTodo;
