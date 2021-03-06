import React, {
    Component
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Slider } from 'react-native-elements';

import Video, { OnLoadData, OnProgressData } from 'react-native-video';
import { getFloat } from '../../lib/helper';

export interface VideoPlayerProps {
    src: string
    height?: number | string
}
type resizeMode = "contain" | "stretch" | "cover" | "none" | undefined;
export interface VideoPlayerState {
    rate: number,
    volume: number,
    muted: boolean,
    resizeMode: "contain" | "stretch" | "cover" | "none" | undefined,
    duration: number,
    currentTime: number | string,
    paused: boolean,

}


export default class VideoPlayer extends Component<VideoPlayerProps, VideoPlayerState> {

    state: VideoPlayerState = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        paused: true,
    };

    videoType = (src: string): string => {
        const splitURL = src.split(".");
        return splitURL[splitURL.length - 1];
    }

    video: Video | null = null;

    onLoad = (data: OnLoadData) => {
        this.setState({ duration: data.duration });
    };

    onProgress = (data: any) => {
        this.setState({ currentTime: data.currentTime });
    };

    onEnd = () => {
        this.setState({ paused: true })
        this.video?.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({ paused: true })
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({ paused: !event.hasAudioFocus })
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return getFloat(this.state.currentTime) / getFloat(this.state.duration);
        }
        return 0;
    };
    

    // renderRateControl(rate: any) {
    //     const isSelected = (this.state.rate === rate);

    //     return (
    //         <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
    //             <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
    //                 {rate}x
    //       </Text>
    //         </TouchableOpacity>
    //     );
    // }

    // renderResizeModeControl(resizeMode: resizeMode) {
    //     const isSelected = (this.state.resizeMode === resizeMode);

    //     return (
    //         <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
    //             <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
    //                 {resizeMode}
    //             </Text>
    //         </TouchableOpacity>
    //     )
    // }

    // renderVolumeControl(volume: any) {
    //     const isSelected = (this.state.volume === volume);

    //     return (
    //         <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
    //             <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
    //                 {volume * 100}%
    //       </Text>
    //         </TouchableOpacity>
    //     )
    // }

    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        console.log("src", this.props.src);
        return (

            <View style={[styles.container, { height: this.props.height }]}>
                <TouchableOpacity
                    style={styles.fullScreen}
                    onPress={() => this.setState({ paused: !this.state.paused })}
                >
                    {/* <Text>{this.props.src}</Text> */}
                    <Video
                        ref={(ref: Video) => { this.video = ref }}
                        // source={{ uri: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube?as=fmp4_audio_clear,fmp4_sd_hd_clear&sparams=ip,ipbits,expire,source,id,as&ip=0.0.0.0&ipbits=0&expire=19000000000&signature=51AF5F39AB0CEC3E5497CD9C900EBFEAECCCB5C7.8506521BFC350652163895D4C26DEE124209AA9E&key=ik0', type: 'mpd' }}
                        source={{ uri: this.props.src }}
                        // source={{ uri: "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4" }}
                        // controls
                        style={styles.fullScreen}
                        controls={true}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        // @ts-ignore
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        repeat={false}
                    />

                </TouchableOpacity>

                {/* <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-end' }}>
                    <Slider
                        maximumValue={this.state.duration}
                        step={0.1}
                        value={getFloat(this.state.currentTime)}
                        onValueChange={( currentTime ) => this.setState({ currentTime })}
                        
                    />
                    <Text>Value: {this.state.currentTime}</Text>
                </View> */}

                <View style={styles.controls}>
                    {/* <View style={styles.generalControls}>
                        <View style={styles.rateControl}>
                            {this.renderRateControl(0.25)}
                            {this.renderRateControl(0.5)}
                            {this.renderRateControl(1.0)}
                            {this.renderRateControl(1.5)}
                            {this.renderRateControl(2.0)}
                        </View>

                        <View style={styles.volumeControl}>
                            {this.renderVolumeControl(0.5)}
                            {this.renderVolumeControl(1)}
                            {this.renderVolumeControl(1.5)}
                        </View>

                        <View style={styles.resizeModeControl}>
                            {this.renderResizeModeControl('cover')}
                            {this.renderResizeModeControl('contain')}
                            {this.renderResizeModeControl('stretch')}
                        </View>
                    </View> */}

                    <View>
                        <View style={styles.progress}>
                            <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                            <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'black',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // trackingControls: {

    // }
});