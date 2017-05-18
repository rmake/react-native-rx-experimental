import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ScrollView } from "react-native";
import Todo from "./Todo";

const TodoList = ({todos, onTodoClick, onRemoveTodoClick}) => (
    <ScrollView style={styles.container}>
        {
            todos.map((todo) => {
                return(<Todo
                    key={todo.id}
                    todo={todo}
                    onTodoClick={() => (onTodoClick(todo.id))}
                    onRemoveTodoClick={() => (onRemoveTodoClick(todo.id))}
                />);
            })
        }
    </ScrollView>
);

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    }
});

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired,
    onRemoveTodoClick: PropTypes.func.isRequired,
};

export default TodoList;
