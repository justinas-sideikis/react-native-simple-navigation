import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createRoutingComponent, Route, NavigationProp } from 'react-native-simple-navigation';
import { Provider, connect } from 'react-redux';

import store from './store';
import { Input } from './Input';


interface State {
  text: string;
}

interface Props extends NavigationProp {
  addElement: Function;
  setInput: Function;
  change: Function;
  list: Array<Movie>;
  input: String;
}

interface Movie {
  name: String;
  watched: Boolean;
}

class Ppa extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    return <View style={{height: '100%', backgroundColor: '#a000a0'}}>
      <Input style={{marginTop: 40}} onChangeText={(text:String) => this.props.setInput(text)} />
      <Button title="add" onPress={() => this.props.addElement(this.props.input)} />
      <Button title='next' onPress={() => this.props.navigate('two')}/>
      {this.props.list.map((movie, id) => {
        return <Text key={id} style={movie.watched ? styles.watched : styles.toWatch} onPress={() => this.props.change(movie.name)}>movie name: {movie.name}</Text>
      })}
    </View>
  }
}

function mapStateToProps(state: any) {
  return {
    list: state.list,
    input: state.input
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
    setInput: (text: String) => dispatch({ type: 'SET_INPUT', payload: text }),
    addElement: (input: String) => dispatch({ type: 'ADD_ELEMENT', payload: input}),
    change: (movie: String) => dispatch({type: 'CHANGE_ELEMENT_fLAG', payload: movie})
  }
}

const Spp = connect(mapStateToProps, mapDispatchToProps)(Ppa);

class scnd extends React.Component {
  render() : React.ReactNode {
    return <View style={{backgroundColor: '#a0a0a0', height: "100%"}}><Text>new text in new window</Text></View>
  }
}

const routes = new Array<Route>();
routes.push({routeName: "one", routeComponent: Spp})
routes.push({routeName: 'two', routeComponent: scnd})

class Header extends React.Component<NavigationProp> {
  render(): React.ReactNode {
    return <View style={{backgroundColor: "#Cf2030"}}><Text onPress={() => this.props.navigate('one', true)} style={{padding: 20, fontSize: 20, textAlign: "center"}}>assaasasa</Text></View>
  }
}

class Footer extends React.Component<NavigationProp> {
  render(): React.ReactNode {
    return <View style={{backgroundColor: '#3020Cf', flexDirection:'row', justifyContent:"space-between"}}>
        <Text onPress={() => this.props.navigate('one', true)} style={{padding: 10}}>one</Text>
        <Text onPress={() => this.props.navigate('two', true)} style={{padding: 10}}>two</Text>
        <Text onPress={() => this.props.navigate('one', true)} style={{padding: 10}}>three</Text>
    </View>
  }
}

const Routin = createRoutingComponent(routes, {header: Header, footer: Footer});
const Router = createRoutingComponent(routes, {header: Header, footer: Footer, initialRoute: 'two', swipeNavigation: false});

export default class App extends React.Component<{}, State> {
  constructor(props:{}){
    super(props);
    this.state = { text: ""};
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



const styles = StyleSheet.create({
  watched: {
    color: '#0000FF',
  },
  toWatch: {
    color: '#FF0000',
  }
});
