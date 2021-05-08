import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native';
import { PinchGestureHandler, PanGestureHandler, State } from 'react-native-gesture-handler';

const minScale = 0.5;
const maxScale = 2;

const USE_NATIVE_DRIVER = true;

export interface Props {
    children: React.ReactNode
}

export default class Transform extends React.Component {

    // _baseScale = new Animated.Value(1);
    // _pinchScale = new Animated.Value(1);
    // _scale = Animated.multiply(this._baseScale, this._pinchScale);
    // _lastScale = 1;
    // _onPinchGestureEvent = Animated.event(
    //     [{ nativeEvent: { scale: this._pinchScale } }],
    //     { useNativeDriver: true }
    // );
    // panOffset = new Animated.ValueXY();

    onPinchGestureEvent: (...args: any[]) => void;
    onPanGestureEvent: (...args: any[]) => void;
    lastScale: number;
    scale: Animated.AnimatedMultiplication;
    pinchScale: Animated.Value;
    baseScale: Animated.Value;
    panOffset: Animated.ValueXY;
    panRef = React.createRef<PanGestureHandler>();
    pinchRef = React.createRef<PinchGestureHandler>();
    constructor(props: Props) {
        super(props);

        /* Pinching */
        this.baseScale = new Animated.Value(1);
        this.pinchScale = new Animated.Value(1);
        this.scale = Animated.multiply(this.baseScale, this.pinchScale);
        this.lastScale = 1;
        this.panOffset = new Animated.ValueXY();

        this.onPinchGestureEvent = Animated.event(
            [{ nativeEvent: { scale: this.pinchScale } }],
            { useNativeDriver: USE_NATIVE_DRIVER }
        );

        this.onPanGestureEvent = Animated.event(
            [
                {
                    nativeEvent: {
                        translationX: this.panOffset.x,
                        translationY: this.panOffset.y,
                    },
                },
            ],
            { useNativeDriver: true }
        );
        this.panRef = React.createRef();
        this.pinchRef = React.createRef();
    }

    onPinchHandlerStateChange = (event: any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this.lastScale *= event.nativeEvent.scale;
            this.baseScale.setValue(this.lastScale);
            this.pinchScale.setValue(1);
        }
    };



    onPanHandlerStateChange = () => {
        this.panOffset.extractOffset();
    }

    // const panResponder = useRef(
    //     PanResponder.create({
    //         onMoveShouldSetPanResponder: () => true,
    //         onPanResponderGrant: () => {
    //             pan.setOffset({
    //                 x: pan.x._value,
    //                 y: pan.y._value
    //             });
    //         },
    //         onPanResponderMove: (event, gestureState) => {
    //             const touches = event.nativeEvent.touches;

    //             if (touches.length >= 2) {
    //                 // We have a pinch-to-zoom movement
    //                 // Track locationX/locationY to know by how much the user moved their fingers
    //Distance between fingers (1/Math.sqr((ax-bx)**2 + (ay-by)**2)* scale ) if scale>minScale = minscale; 

    //             } else {
    //                 // We have a regular scroll movement
    //                 Animated.event([
    //                     null,
    //                     { dx: pan.x, dy: pan.y }
    //                 ]) ({});
    //             }
    //         },
    //         onPanResponderRelease: () => {
    //             pan.flattenOffset();
    //         }
    //     })
    // ).current;
    render() {
        return (
            <View>
                <PanGestureHandler onGestureEvent={this.onPanGestureEvent} onHandlerStateChange={this.onPanHandlerStateChange} ref={this.panRef} maxPointers={2} avgTouches>
                    <Animated.View>
                        <PinchGestureHandler
                            onGestureEvent={this.onPinchGestureEvent}
                            onHandlerStateChange={this.onPinchHandlerStateChange}
                            ref={this.pinchRef}
                            simultaneousHandlers={this.panRef}
                        >
                            <Animated.View
                                style={[
                                    {
                                        transform: [{ perspective: 200 }, { scale: this.scale }, { translateX: this.panOffset.x }, { translateY: this.panOffset.y }],
                                    },
                                ]}
                            >
                                {this.props.children}
                            </Animated.View>
                        </PinchGestureHandler>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    box: {
        backgroundColor: "blue",
        borderRadius: 5,
        height: 150,
        width: 150,
    }
})
