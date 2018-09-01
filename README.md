# react-native-simple-navigation

React Native lightweight library for navigation with swiping.

Only tried it on Android, so I can't say if it works on iOS device.

##Any sugestions or bugs?

Write them to: <justinas.sid@gmail.com>

## How to use:

### 1. Add dependency:
```
yarn add react-native-simple-navigation
```

### 2. Import it:

```
import { createRoutingComponent } from 'react-native-simple-navigation';
```

### 3. Create routing element:

```
class One extends React.Component<NavigationProp> {
  render() : React.ReactNode {
    return <View style={{marginTop: 40}}><Button title='to next window!' onPress={() => this.props.navigate("two")}</View>
  }
}

class Two extends React.Component {
  render() : React.ReactNode {
    return <View style={{marginTop: 40}}><Text>new text in new window</Text></View>
  }
}

const routes = new Array<Route>();
routes.push({routeName: "one", routeComponent: One})
routes.push({routeName: 'two', routeComponent: Two})

const Navigation = createRoutingComponent(routes);
```

### 4. Render it:
 ```
 <View>
    <Navigation />
 </View>
 ```

## Additional info:

### About "createRoutingComponent" function:

Function createRoutingComponent recives two props:
-routes
-settings

routes is an array of Route objects, which contains: 
* routeName(string)
* routeComponent(Component)

settings can be not passed to the function, but you can pass an object, which contains:
* header(Component)
* footer(Component)
* swipeNavigation(boolean)
* initialRoute(string).
