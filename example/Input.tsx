import { View, TextInput } from 'react-native';
import React from 'react';

interface InputProps {
    style: Object;
    onChangeText: Function;
}

export class Input extends React.Component<InputProps> {
    constructor(props: InputProps){
        super(props);
    }

    render() : React.ReactNode {
        return <View style={this.props.style}>
            <TextInput onChangeText={text => this.props.onChangeText(text)} />
        </View>
    }
}