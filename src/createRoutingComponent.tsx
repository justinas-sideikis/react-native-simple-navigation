import { Route, RoutingSettings } from './types/routes';
import { SimpleRoutingComponentState } from './types/routingComponent';
import { View, BackHandler } from 'react-native';
import React from 'react';
import SwipeableView from './components/SwipeableView';
import getValidSettings from './settingsValidation';

export default function createRoutingComponent(routes : Array<Route>, settings : RoutingSettings) : typeof React.Component {
    const definedSettings = getValidSettings(settings, routes[0].routeName);
    class SimpleRoutingComponent extends React.Component<{}, SimpleRoutingComponentState> {
        constructor(props: {}){
            super(props);

            this.state = {
                current: definedSettings.initialRoute,
                history: [],
                locked: false,
                newProps: {}
            }
        }
    
        navigate(routeName: string, deleteHistory: boolean) : void {
            if(deleteHistory) {
                this.setRoute(routeName, []);
                return;
            }
            if(routes.some((element) => element.routeName === routeName)) {
                let newHistory = this.state.history;
                newHistory.push(this.state.current);
                this.setRoute(routeName, newHistory);
            }
        }

        setRoute(routeName: string, newHistory: Array<string>): void{
            if(!this.state.locked) {
                this.setState({locked: true}, () => {
                    this.setState({current: routeName, history: newHistory}, () => {
                        this.setState({locked: false});
                    });
                });
            }
        }

        componentDidMount() : void {
            BackHandler.addEventListener('hardwareBackPress', ()=>{
                this.backButtonPressed();
                return true;
            })
        }

        backButtonPressed(): void {
            if(this.state.history.length === 0) {
                BackHandler.exitApp();
                return;
            }
            let newHistory = this.state.history;
            let last = newHistory.pop();
            last !== undefined ? this.setRoute(last, newHistory) : BackHandler.exitApp();
        }

        componentWillUnmount(): void {
            BackHandler.removeEventListener('hardwareBackPress', () => this.backButtonPressed());
        }

        backSwipe(): boolean {
            if(this.state.history.length === 0) {
                return false;
            }
            let newHistory = this.state.history;
            let last = newHistory.pop();
            last !== undefined ? this.setRoute(last, newHistory) : null;
            return true;
        }
    
        render() : React.ReactNode {
            const CurrentRoute = routes.find((route) => { return route.routeName === this.state.current });
            if(CurrentRoute === null || CurrentRoute === undefined) {
                console.error("Bad route");
                return <View></View>
            }
            const CurrentScreen = CurrentRoute.routeComponent;
            if(CurrentScreen === null || CurrentScreen === undefined) {
                console.error("Check \"" + CurrentRoute.routeName + "\" component if it's exporting anything or exporting by default or just exporting");
                return <View></View>
            }
            return (<View flex={1}> 
                    {definedSettings.header ? <View><definedSettings.header navigate={(routeName: string, deleteHistory: boolean = true) => this.navigate(routeName, deleteHistory)}/></View> : null}
                    {definedSettings.swipeNavigation ?
                        <SwipeableView backHandler={() => this.backSwipe()}><CurrentScreen navigate={(routeName: string, deleteHistory: boolean) => this.navigate(routeName, deleteHistory)} /></SwipeableView>
                    :
                        <View><CurrentScreen navigate={(routeName: string, deleteHistory: boolean) => this.navigate(routeName, deleteHistory)}/></View>}
                    {definedSettings.footer ? <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}><definedSettings.footer navigate={(routeName: string, deleteHistory: boolean = true) => this.navigate(routeName, deleteHistory)} /></View> : null}
                </View>);
        }
    }

    return SimpleRoutingComponent;
}