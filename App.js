import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Boot from "./src/Boot";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Boot />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
