import React from 'react';
import { PanResponder, View, PanResponderInstance, PanResponderGestureState, GestureResponderEvent, Dimensions, Animated } from 'react-native'

import AnimatedSwipe from './AnimatedSwipe';
import { SwipeableViewProps, SwipeableViewState } from '../types/SwipeableView';

class SwipeableView extends React.Component<SwipeableViewProps, SwipeableViewState> {
    _panResponder: PanResponderInstance | undefined;
    constructor(props: SwipeableViewProps) {
        super(props);

        this.state = {
            isSwipeValid: false,
            opacity: new Animated.Value(0),
            isAnimationRunning: false,
        }
    }

    componentDidMount() {
        Animated.timing(this.state.opacity, { toValue: 1, duration: 1}).start();
    }

    componentWillReceiveProps(next: any) {
        if(next.children !== this.props.children){
            if(!this.state.isAnimationRunning){
                this.setState({isAnimationRunning: true})
                Animated.timing(this.state.opacity, { toValue: 1, duration: 1000}).start(() =>
                    this.setState({isAnimationRunning: false})
                );
            }
        }
    }

    componentWillMount(): void {
        this.handleSwipeEnd = this.handleSwipeEnd.bind(this);
        this.handleSwipeStart = this.handleSwipeStart.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: (e, gestureState) => gestureState.dx > 10,
            onStartShouldSetPanResponder: () => true,
            onPanResponderStart: this.handleSwipeStart,
            onPanResponderMove: this.handleSwipe,
            onPanResponderRelease: this.handleSwipeEnd,
            onPanResponderTerminate: this.handleSwipeEnd,
        });
    }

    handleSwipe(e: GestureResponderEvent, gestureState: PanResponderGestureState): void {
        const touchCoordsX = gestureState.dx;
        const initTouchCoordsX = gestureState.x0;
        if(!this.state.isSwipeValid) {
            return;
        }
        if(touchCoordsX < 10){
            return;
        }
        const width = Dimensions.get("screen").width;
        let percentage = 1 - touchCoordsX / (width - initTouchCoordsX);
        if(this.state.isAnimationRunning){
            return;
        }
        this.setState({isAnimationRunning: true})
        Animated.timing(this.state.opacity, {toValue: percentage, duration: 1}).start(() => this.setState({isAnimationRunning: false}));
    }

    handleSwipeStart(e: GestureResponderEvent, gestureState: PanResponderGestureState): void {
        const touchCoordsX = gestureState.x0;
        if(touchCoordsX < 70) {
            this.setState({isSwipeValid: true});
        }
    }

    handleSwipeEnd(e: GestureResponderEvent, gestureState: PanResponderGestureState): void {
        const distanceX = gestureState.dx;
        const distanceY = gestureState.dy;
        if(Math.abs(distanceY) > distanceX - 10) {
            this.restoreOpacity();
            return;
        }
        if(!this.state.isSwipeValid) return;
        Animated.timing(this.state.opacity, { toValue: 0, duration: 100}).start(() =>
            this.setState({isAnimationRunning: false}, ()=> {
                let canGoBack = this.props.backHandler();
                if(!canGoBack){
                    this.restoreOpacity();
                }
                this.setState({isSwipeValid: false});
            })
        );
    }

    restoreOpacity(): void {
        this.setState({isAnimationRunning: true}, () =>
            Animated.timing(this.state.opacity, {toValue: 1, duration: 100}).start(()=>
                this.setState({isAnimationRunning: false})
            )
        );
    }

    render(): React.ReactNode {
        if(this._panResponder == undefined){
            console.error('this should not happen, just placing it here to solve underline')
            return;
        }
        return <View {...this._panResponder.panHandlers}><AnimatedSwipe opacity={this.state.opacity}>{this.props.children}</AnimatedSwipe></View>
    }
}

export default SwipeableView;