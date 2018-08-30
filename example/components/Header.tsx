import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationProp } from 'react-native-simple-navigation';

export default class Header extends React.Component<NavigationProp> {
    render(): React.ReactNode {
        return <View style={{backgroundColor: "#Cf2030"}}><Text onPress={() => this.props.navigate('one', true)} style={{padding: 20, fontSize: 20, textAlign: "center"}}>assaasasa</Text></View>
    }
}