import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { createRoutingComponent, Route } from 'react-native-simple-navigation';
import { Provider } from 'react-redux';

import store from './store';
import FirstRoute from './route/FirstRoute';
import SecondRoute from './route/SecondRoute';
import Header from './components/Header';
import Footer from './components/Footer';


const routes = new Array<Route>();

const routeOne: Route = {routeName: 'one', routeComponent: FirstRoute};
routes.push(routeOne);

const routeTwo: Route = {routeName: 'two', routeComponent: SecondRoute};
routes.push(routeTwo);

const Routin = createRoutingComponent(routes, {header: Header, footer: Footer});
const Router = createRoutingComponent(routes, {header: Header, footer: Footer, initialRoute: 'two', swipeNavigation: false});

export default class App extends React.Component {
  constructor(props:{}){
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <Routin />
          <View style={{padding: 3, backgroundColor: "#000000"}}></View>
          <Router />
        </View>
      </Provider>
    );
  }
}