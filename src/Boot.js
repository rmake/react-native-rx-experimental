import React from "react";
import { Text } from "react-native";
import { createState } from "./state/rxState";
import { RxStateProvider } from "./state/rxStateComponent";
import { StyleSheet } from 'react-native';
import Main from "./containers/Main"
import reducer$ from "./reducers";
import "./epics/todoEpics";
import stateLocalStorage from "./middlewares/stateLocalStorage";

const Boot = () => (
    <RxStateProvider state$={createState(reducer$, [stateLocalStorage])}>
        <Main />
    </RxStateProvider>
);

export default Boot;
