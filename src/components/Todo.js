import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";


const Todo = ({todo, onTodoClick, onRemoveTodoClick}) => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onTodoClick}>
            <Text>{'\u2022'}</Text>
            <Text style={todo.completed ? styles.completedText : null}>
                 {todo.text}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={onRemoveTodoClick}>
            <Text>
                 Delete
            </Text>
        </TouchableOpacity>
    </View>
);

Todo.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onTodoClick: PropTypes.func.isRequired,
    onRemoveTodoClick: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 2,
    },
    button: {
        flexDirection: "row",
        height: 50,
        alignItems: 'center',
        margin: 2,
        borderColor: '#da7',
        borderWidth: 2,
        borderRadius: 10,
        flex: 1,
    },
    completedText: {
        textDecorationLine: "line-through",
    },
    removeButton: {
        height: 50,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        borderColor: '#666',
        borderWidth: 2,
        borderRadius: 10,
    },
});

export default Todo;
