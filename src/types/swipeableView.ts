import { Animated } from 'react-native';

export interface SwipeableViewProps {
    backHandler: Function;
}

export interface SwipeableViewState {
    isSwipeValid: boolean;
    opacity: Animated.Value;
    isAnimationRunning: boolean;
}