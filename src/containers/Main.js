import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import AddTodo from "./AddTodo";
import VisibleTodoList from "./VisibleTodoList";
import Footer from "../components/Footer";
import ClearTodo from "./ClearTodo";
import todoActions from "../actions/todoActions";
import { connect } from "../state/rxStateComponent";

class Main extends React.Component {

    componentDidMount () {
        if (this.props.storage.starting) {
            this.props.onFirstMount();
        }
    }

    render() {
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
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    storage: state.storage,
    onFirstMount: () => {
        todoActions.checkInitialTodos.send();
    }
});

Main = connect(
    mapStateToProps,
)(Main);

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
