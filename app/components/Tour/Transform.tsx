import React from 'react'
import { StyleSheet, Text, View, Animated, StyleProp } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import { PinchGestureHandler, PanGestureHandler, State } from 'react-native-gesture-handler';

const minScale = 0.5;
const maxScale = 2;

const USE_NATIVE_DRIVER = true;

export interface Props {
    children: React.ReactNode,
    style?: any,
    initialPos?: { x: number, y: number },
    initialZoom?: number
}

// TODO: Maybe use reanimated instead if low performance 
export default class Transform extends React.Component<Props> {

    onPinchGestureEvent: (...args: any[]) => void;
    onPanGestureEvent: (...args: any[]) => void;
    lastScale: number;
    scale: Animated.AnimatedMultiplication;
    pinchScale: Animated.Value;
    baseScale: Animated.Value;
    panOffset: Animated.ValueXY;
    panRef = React.createRef<PanGestureHandler>();
    pinchRef = React.createRef<PinchGestureHandler>();

    invertedScale: Animated.AnimatedDivision;

    panScaleX: Animated.AnimatedMultiplication;
    panScaleY: Animated.AnimatedMultiplication;

    constructor(props: Props) {
        super(props);

        /* Pinching */
        this.baseScale = new Animated.Value(1);
        this.pinchScale = new Animated.Value(1);

        this.scale = Animated.multiply(this.baseScale, this.pinchScale);
        this.lastScale = 1;
        this.panOffset = new Animated.ValueXY();
        this.invertedScale = Animated.divide(1, this.scale);
        this.panScaleX = Animated.multiply(this.invertedScale, this.panOffset.x);
        this.panScaleY = Animated.multiply(this.invertedScale, this.panOffset.y);

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

    componentDidMount() {
        this.resetTransform();
        if (this.props.initialPos) this.panOffset.setValue(this.props.initialPos);
        if (this.props.initialZoom) {
            this.baseScale.setValue(this.props.initialZoom);
            this.lastScale = this.props.initialZoom;
        }
    }

    resetTransform() {
        this.baseScale.setValue(0.15);
        this.lastScale = 0.15;
        this.pinchScale.setValue(1);
        this.panOffset.setValue({ y: 0, x: 0 });
        this.panOffset.setOffset({ x: 0, y: 0 });
    }

    onPinchHandlerStateChange = (event: any) => {
        // When pinching ends, set overallscale to current stored scale
        // Basescale is there for when not pinching 
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this.lastScale *= event.nativeEvent.scale;
            this.baseScale.setValue(this.lastScale);
            this.pinchScale.setValue(1);
        }

    };

    onPanHandlerStateChange = () => {
        this.panOffset.extractOffset();
    }

    render() {

        return (
            <View style={this.props.style}>
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
                                        // transform: [ { scale: this.scale }, { translateX: this.panOffset.x }, { translateY: this.panOffset.y }],
                                        transform: [{ scale: this.scale }, { translateX: this.panScaleX }, { translateY: this.panScaleY }],
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
