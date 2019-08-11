import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import CropImg from 'react-native-image-crop-picker';
import {GLOBALS} from '../globals'
import {PickImg} from '../funcs/media'
import {NewActEvt} from '../funcs/NewEvt'
import CloseButton from '../comps/CloseButton'
import TopBar from '../comps/TopBar';
export default class NewEvt extends Component {
  constructor(props){
    super(props)
    this.state = {
      desc: '',
      title: '',
      rules: [
        {
          text: ''
        }
      ],
      ddOpen: false,
      compType: 'ACT',
      subType: 'IMG',
      imgPath: null,
      imgMime: null,
      subCats: [],
      isActValidated: false,
      alert: ''
    }
    this.inputs = {}
    this.queueFocus = null
    this.validate = this.validate.bind(this)
    this.onFinished = this.onFinished.bind(this)
  }
  componentDidUpdate(){
    if(this.queueFocus != null){
      this.inputs[this.queueFocus].focus()
      this.queueFocus = null
    }
  }
  validate(){
    if(this.state.title.length < 1){
      this.setState({
        alert: 'Oops! You forgot to put a title'
      })
      return false
    } else if (this.state.desc.length < 1){
      this.setState({
        alert: 'Oops! You forgot to put a description'
      })
      return false
    } else if (this.state.imgPath == null){
      this.setState({
        alert: 'Oops! You forgot to select an image'
      })
      return false
    } else {
      return true
    }
  }
  onFinished(subCats){
    this.setState({subCats})
  }
  render() {
    var renderThumbnail = () => {
      if(this.state.imgPath) {
        return (
          <Image
            style={styles.thumbnail}
            source={{
              uri: this.state.imgPath
            }}
          />
        )
      }
    }
    var renderSubCats = () => {
      if(this.state.subCats.length > 0) {
        return (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: GLOBALS.grey,
              paddingVertical: 15,
              paddingLeft: 20,
              height: 100
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1
              }}
              contentContainerStyle={{
                padding: 5
              }}
              >
              {
                this.state.subCats.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.props.navigation.push('PickCats',{subCats: this.state.subCats, onFinished: this.onFinished})}
                      key={`${item}-${index}`}
                      style={styles.subCat}>
                      <Text style={styles.subCatText} key={`${item}-${index}`}>{item}</Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
        )
      } else {
        return (
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPress={() => {
              this.props.navigation.push('PickCats',{onFinished: this.onFinished})
            }}
            >
            <View style={styles.textInput}>
              <Text style={{
                  color: GLOBALS.grey,
                  fontFamily: 'HelveticaNeue'
                }}>
                Add Tags
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )
      }
    }

    return (
      <View>
        <TopBar
          left={'CLOSE'}
          leftPress={this.props.navigation.pop}
          right={'UPLOAD'}
          rightPress={() => {
            if(this.validate()){
              NewActEvt({
                title: this.state.title,
                desc: this.state.desc
              },this.state.imgPath, this.state.imgMime)
              .then(this.props.navigation.pop)
            }
          }}
          />
        <View style={{
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}>
          <View style={{
              flex: 1,
              alignItems: 'flex-end'
            }}>
            <TouchableOpacity
              onPress={() => {
                  PickImg().then((image) => {
                    this.setState({
                      imgMime: image.mime,
                      imgPath: image.path
                    })
                  })
              }}
              style={[styles.thumbnail, {
                marginHorizontal: 20
              }]}
              >
              {renderThumbnail()}
              <View style={[styles.thumbnail,{
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  opacity: (this.state.imgPath) ? 0 : 1
                }]}>
                <MaterialIcons
                  name={'add-a-photo'}
                  size={50}
                  color={GLOBALS.grey}
                  />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            color: GLOBALS.red,
            fontFamily: 'HelveticaNeue',
            alignSelf: 'center'
          }}
          >
          {this.state.alert}
        </Text>
        <TextInput

          placeholder={'Title'}
          maxLength={200}
          style={styles.textInput}
          placeholderTextColor={GLOBALS.grey}
          onChangeText={(title) => {
            this.setState({title})
          }}
          autoCorrect={false}
          selectionColor={GLOBALS.black}
          clearButtonMode={'while-editing'}
          multiline={false}
          ref={ input => {
            this.inputs['title'] = input;
          }}
          returnKeyType={ "next" }
          onSubmitEditing={() => this.inputs['desc'].focus()}
          />
        <TextInput

          placeholder={'Add a description'}
          maxLength={200}
          style={styles.textInput}
          placeholderTextColor={GLOBALS.grey}
          onChangeText={(desc) => {
            this.setState({desc})
          }}
          autoCorrect={false}
          selectionColor={GLOBALS.black}
          clearButtonMode={'while-editing'}
          multiline
          ref={ input => {
            this.inputs['desc'] = input;
          }}
          returnKeyType={ "next" }
          />
        {renderSubCats()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: GLOBALS.grey,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 20,
    width: GLOBALS.extEvtWidth,
    color: GLOBALS.black
  },
  indivRuleInput: {
    flex: 1,
    color: GLOBALS.white,
    paddingVertical: 5
  },
  rule: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  ruleNumText: {
    color: GLOBALS.grey,
    flex: .075
  },
  rulesContainer: {
    borderBottomWidth: 1,
    borderColor: GLOBALS.grey,
    padding: 10,
    paddingVertical: 5
  },
  thumbnail: {
    borderRadius: 15,
    height: GLOBALS.extEvtHeight,
    width: GLOBALS.extEvtWidth,
    backgroundColor: GLOBALS.lightGrey,
    marginBottom: 15
  },
  subCat: {
    backgroundColor: GLOBALS.grey,
    borderRadius: 10,
    padding: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 4,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subCatText: {
    fontFamily: 'HelveticaNeue-Bold',
    color: GLOBALS.grey,
    fontSize: 16
  },
});
