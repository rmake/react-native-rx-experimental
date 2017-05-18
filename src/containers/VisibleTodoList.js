import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import { connect } from "../state/rxStateComponent";
import TodoList from "../components/TodoList";
import todoActions from "../actions/todoActions";

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case "SHOW_ALL":
            return todos;
        case "SHOW_COMPLETED":
            return todos.filter(todo => todo.completed);
        case "SHOW_ACTIVE":
            return todos.filter(todo => !todo.completed);
        default:
            throw new Error("Unknown filter: " + filter);
    }
};

const mapStateToProps = (state) => {
    return ({
        todos: getVisibleTodos(state.todos.todos, state.visibilityFilter.filter),
        onTodoClick: (id) => { todoActions.toggleTodo.send(id); },
        onRemoveTodoClick: (id) => { todoActions.removeTodo.send(id); },
    });
};

const VisibleTodoList = connect(mapStateToProps)(TodoList);

export default VisibleTodoList;
