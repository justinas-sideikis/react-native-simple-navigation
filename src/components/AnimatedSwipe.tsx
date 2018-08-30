import React from 'react';
import { Animated } from 'react-native';
import { AnimatedSwipeProps } from '../types/animatedSwipe'

class AnimatedSwipe extends React.Component<AnimatedSwipeProps> {
    constructor(props: AnimatedSwipeProps){
        super(props);
    }

    render() : React.ReactNode {
        return <Animated.View style={{opacity: this.props.opacity}}>{this.props.children}</Animated.View>;
    }
}

export default AnimatedSwipe;