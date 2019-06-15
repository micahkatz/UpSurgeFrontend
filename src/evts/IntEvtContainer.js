import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, Modal, PanResponder, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const DRAG_DISMISS_THRESHOLD = 150;
const STATUS_BAR_OFFSET = (Platform.OS === 'android' ? -25 : 0);
const isIOS = Platform.OS === 'ios';
import {GLOBALS} from '../globals'
import IntEvt from './IntEvt'
const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT
  },
  open: {
    position: 'absolute',
    flex: 1,
    // Android pan handlers crash without this declaration:
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    backgroundColor: 'transparent',
  },
  closeButton: {
    fontSize: 35,
    color: 'white',
    lineHeight: 40,
    width: 40,
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1.5,
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
});

export default class LightboxOverlay extends Component {
  static propTypes = {
    origin: PropTypes.shape({
      x:        PropTypes.number,
      y:        PropTypes.number,
      width:    PropTypes.number,
      height:   PropTypes.number,
    }),
    springConfig: PropTypes.shape({
      tension:  PropTypes.number,
      friction: PropTypes.number,
    }),
    backgroundColor: PropTypes.string,
    isOpen:          PropTypes.bool,
    renderHeader:    PropTypes.func,
    onOpen:          PropTypes.func,
    onClose:         PropTypes.func,
    willClose:         PropTypes.func,
    swipeToDismiss:  PropTypes.bool,
  };

  static defaultProps = {
    springConfig: { tension: 30, friction: 7 },
    backgroundColor: 'black',
  };

  state = {
    isAnimating: false,
    isPanning: false,
    target: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    pan: new Animated.Value(0),
    openVal: new Animated.Value(0),
    imgViewPadding: new Animated.Value(10),
    imgViewRadius: new Animated.Value(15),
    imgViewWidth: new Animated.Value(GLOBALS.extEvtWidth),
    intEvtOpacity: new Animated.Value(0),
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => !this.state.isAnimating,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => !this.state.isAnimating,
      onMoveShouldSetPanResponder: (evt, gestureState) => !this.state.isAnimating,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => !this.state.isAnimating,

      onPanResponderGrant: (evt, gestureState) => {
        this.state.pan.setValue(0);
        this.setState({ isPanning: true });
      },
      onPanResponderMove: Animated.event([
        null,
        { dy: this.state.pan }
      ]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if(Math.abs(gestureState.dy) > DRAG_DISMISS_THRESHOLD) {
          this.setState({
            isPanning: false,
            target: {
              y: gestureState.dy,
              x: gestureState.dx,
              opacity: 1 - Math.abs(gestureState.dy / WINDOW_HEIGHT)
            }
          });
          this.close();
        } else {
          Animated.spring(
            this.state.pan,
            { toValue: 0, ...this.props.springConfig }
          ).start(() => { this.setState({ isPanning: false }); });
        }
      },
    });
  }

  componentDidMount() {
    if(this.props.isOpen) {
      this.open();
    }
  }

  open = () => {
    if(isIOS) {
      StatusBar.setHidden(true, 'fade');
    }
    this.state.pan.setValue(0);
    this.setState({
      isAnimating: true,
      target: {
        x: 0,
        y: 0,
        opacity: 1,
      }
    });
    Animated.parallel([
      Animated.spring(
        this.state.openVal,
        { toValue: 1, ...this.props.springConfig }
      ),
      Animated.spring(
        this.state.imgViewPadding,
        { toValue: 0}
      ),
      Animated.spring(
        this.state.imgViewRadius,
        { toValue: 0}
      ),
      Animated.spring(
        this.state.imgViewWidth,
        { toValue: GLOBALS.screenWidth}
      ),
      Animated.spring(
        this.state.intEvtOpacity,
        { toValue: 1}
      )
    ]).start(() => {
      this.setState({ isAnimating: false });
      this.props.didOpen();
    });
  }

  close = () => {
    this.props.willClose();
    if(isIOS) {
      StatusBar.setHidden(false, 'fade');
    }
    this.setState({
      isAnimating: true,
    });

    Animated.parallel([
      Animated.spring(
        this.state.openVal,
        { toValue: 0, ...this.props.springConfig }
      ),
      Animated.spring(
        this.state.imgViewPadding,
        { toValue: 10}
      ),
      Animated.spring(
        this.state.imgViewRadius,
        { toValue: 15}
      ),
      Animated.spring(
        this.state.imgViewWidth,
        { toValue: GLOBALS.extEvtWidth}
      ),
      Animated.spring(
        this.state.intEvtOpacity,
        { toValue: 0}
      )
    ]).start(() => {
      this.setState({
        isAnimating: false,
      });
      this.props.onClose();
    });
  }

  componentWillReceiveProps(props) {
    if(this.props.isOpen != props.isOpen && props.isOpen) {
      this.open();
    }
  }

  render() {
    const {
      isOpen,
      renderHeader,
      swipeToDismiss,
      origin,
      backgroundColor,
    } = this.props;

    const {
      isPanning,
      isAnimating,
      openVal,
      target,
    } = this.state;

    const lightboxOpacityStyle = {
      opacity: openVal.interpolate({inputRange: [0, 1], outputRange: [0, target.opacity]})
    };

    let handlers;
    if(swipeToDismiss) {
      handlers = this._panResponder.panHandlers;
    }

    let dragStyle;
    if(isPanning) {
      dragStyle = {
        top: this.state.pan,
      };
      lightboxOpacityStyle.opacity = this.state.pan.interpolate({inputRange: [-WINDOW_HEIGHT, 0, WINDOW_HEIGHT], outputRange: [0, 1, 0]});
    }

    const openStyle = [styles.open, {
      left:   openVal.interpolate({inputRange: [0, 1], outputRange: [origin.x, target.x]}),
      top:    openVal.interpolate({inputRange: [0, 1], outputRange: [origin.y + STATUS_BAR_OFFSET, target.y + STATUS_BAR_OFFSET]}),
      width:  openVal.interpolate({inputRange: [0, 1], outputRange: [origin.width, WINDOW_WIDTH]}),
      height: openVal.interpolate({inputRange: [0, 1], outputRange: [origin.height, WINDOW_HEIGHT]}),
    }];

    const background = (<Animated.View style={[styles.background, { backgroundColor: backgroundColor }, lightboxOpacityStyle]}></Animated.View>);
    const header = (<Animated.View style={[styles.header, lightboxOpacityStyle]}>{(renderHeader ?
      renderHeader(this.close) :
      (
        <SafeAreaView>
          <TouchableOpacity onPress={this.close}>
            <Text style={styles.closeButton}>×</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )
    )}</Animated.View>);
    const content = (
      <Animated.View style={[openStyle, dragStyle]} {...handlers}>
        <Animated.View style={{padding: this.state.imgViewPadding, borderRadius: this.state.imgViewRadius, overflow: 'hidden', height: GLOBALS.extEvtHeight, width: this.state.imgViewWidth}}>
          {this.props.children}
        </Animated.View>
        <Animated.View style={{opacity: this.state.intEvtOpacity}}>
          {this.props.intEvtChildren}
        </Animated.View>
      </Animated.View>
    );

    if (this.props.navigator) {
      return (
        <View>
          {background}
          {content}
          {header}
        </View>
      );
    }

    return (
      <Modal visible={isOpen} transparent={true} onRequestClose={() => this.close()}>
        {background}
        {content}
        {header}
      </Modal>
    );
  }
}
