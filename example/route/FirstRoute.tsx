import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationProp } from 'react-native-simple-navigation';
import { connect } from 'react-redux';
import { Input } from '../components/Input';


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
  
class FirstRoute extends React.Component<Props> {
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

export default connect(mapStateToProps, mapDispatchToProps)(FirstRoute);


const styles = StyleSheet.create({
    watched: {
      color: '#0000FF',
    },
    toWatch: {
      color: '#FF0000',
    }
});
  