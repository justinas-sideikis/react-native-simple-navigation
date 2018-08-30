import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationProp } from 'react-native-simple-navigation';

export default class Footer extends React.Component<NavigationProp> {
    render(): React.ReactNode {
      return <View style={{backgroundColor: '#3020Cf', flexDirection:'row', justifyContent:"space-between"}}>
          <Text onPress={() => this.props.navigate('one', true)} style={{padding: 10}}>one</Text>
          <Text onPress={() => this.props.navigate('two', true)} style={{padding: 10}}>two</Text>
          <Text onPress={() => this.props.navigate('one', true)} style={{padding: 10}}>three</Text>
      </View>
    }
  }