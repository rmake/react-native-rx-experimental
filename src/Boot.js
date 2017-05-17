import React from "react";
import { Text } from "react-native";
import { createState } from "./state/rxState";
import { RxStateProvider } from "./state/RxStateComponent";
import { StyleSheet } from 'react-native';
import Main from "./components/Main"
import reducer$ from "./reducers";

const Boot = () => (
    <RxStateProvider state$={createState(reducer$)}>
        <Main />
    </RxStateProvider>
);

export default Boot;
