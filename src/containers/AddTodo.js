import React from "react";
import { connect } from "../state/rxStateComponent";
import todoActions from "../actions/todoActions";
import { StyleSheet, View, TextInput} from "react-native";

let AddTodo = ({ onSubmit }) => {
    let input = null;
    return (
        <View style={styles.container}>
            {
                <TextInput
                    ref={(node) => {
                        input = node;
                    }}
                    style={styles.textInput}
                    onSubmitEditing={
                        (event) => {
                            onSubmit(event.nativeEvent.text);
                            input.clear();
                        }
                    }
                />
            }
        </View>
    );
};

var mapStateToProps = (state) => ({
    onSubmit: (text) => { todoActions.addTodo.send(text); }
});

AddTodo = connect(mapStateToProps)(AddTodo);

var styles = StyleSheet.create({
    container: {
        margin: 2,
    },
    textInput: {
        borderColor: '#777',
        borderWidth: 2,
    }
});

export default AddTodo
