import React from 'react';
import { View, Text } from 'react-native';

class SecondRoute extends React.Component {
    render() : React.ReactNode {
      return <View style={{backgroundColor: '#a0a0a0', height: "100%"}}><Text>new text in new window</Text></View>
    }
}

export default SecondRoute; 