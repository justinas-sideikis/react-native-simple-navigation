import React from 'react';
import { View, Button, Text } from 'react-native';
import { createRoutingComponent } from 'react-native-simple-navigation';

class One extends React.Component {
  render() {
    return <View style={{marginTop: 40}}><Button title='to next window!' onPress={() => this.props.navigate("two")}/></View>
  }
}

class Two extends React.Component {
  render() {
    return <View style={{marginTop: 40}}><Text>new text in new window</Text></View>
  }
}

const routes = [{routeName: "one", routeComponent: One}, {routeName: 'two', routeComponent: Two}];

console.log(createRoutingComponent);

const Navigation = createRoutingComponent(routes);

export default class App extends React.Component {
  render() {
    return (
        <Navigation />
    );
  }
}