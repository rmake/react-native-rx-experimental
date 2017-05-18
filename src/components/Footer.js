import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text} from "react-native";
import FilterLink from "../containers/FilterLink";

const Footer = () => (
    <View style={styles.container}>
        <Text>
            Show: {" "}
        </Text>
        <FilterLink filter="SHOW_ALL">
            <Text>
                All
            </Text>
        </FilterLink>
        <FilterLink filter="SHOW_ACTIVE">
            <Text>
                Active
            </Text>
        </FilterLink>
        <FilterLink filter="SHOW_COMPLETED">
            <Text>
                Completed
            </Text>
        </FilterLink>
    </View>

);

let styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
});

export default Footer;
