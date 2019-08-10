import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import {GLOBALS} from '../globals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopBar from '../comps/TopBar'

export default class PickSubCat extends Component {
  constructor(props){
    super(props)
    this.state = {
      subCats: [],
      query: '',
      subCatData: [
        {
          title: 'SPORTS',
          pressed: false,
          color: GLOBALS.primaryColor,
          key: '1'
        },
        {
          title: 'GAMING',
          pressed: false,
          color: GLOBALS.blue,
          key: '2'
        },
        {
          title: 'HIP-HOP',
          pressed: false,
          color: GLOBALS.primaryColor,
          key: '3'
        },
        {
          title: 'POLITICS',
          pressed: false,
          color: GLOBALS.primaryColor,
          key: '4'
        },
        {
          title: 'COMEDY',
          pressed: false,
          color: GLOBALS.blue,
          key: '5'
        },
        {
          title: 'MUSIC',
          pressed: false,
          color: GLOBALS.primaryColor,
          key: '6'
        },
        {
          title: 'BEAUTY',
          color: GLOBALS.primaryColor,
          pressed: false,
          key: '7'
        },
        {
          title: 'HEALTH',
          pressed: false,
          color: GLOBALS.blue,
          key: '8'
        },
        {
          title: 'FOOD',
          color: GLOBALS.primaryColor,
          pressed: false,
          key: '9'
        },
        {
          title: 'ART',
          pressed: false,
          color: GLOBALS.primaryColor,
          key: '10'
        },
        {
          title: 'ANIMALS',
          pressed: false,
          color: GLOBALS.blue,
          key: '11'
        },
        {
          title: 'SCIENCE',
          pressed: false,
          color: GLOBALS.primaryColor,
          key: '12'
        },
        {
          title: 'TECH',
          pressed: false,
          color: GLOBALS.primaryColor,
          key: '13'
        },
        {
          title: 'SOCCER',
          color: GLOBALS.primaryColor,
          pressed: false,
          key: '14'
        },
        {
          title: 'JAZZ',
          color: GLOBALS.primaryColor,
          pressed: false,
          key: '15'
        },
        {
          title: 'BLUES',
          color: GLOBALS.primaryColor,
          pressed: false,
          key: '16'
        },
      ]
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TopBar
            left={'CLOSE'}
            right={'CHECK'}
            leftPress={this.props.navigation.pop}
            rightPress={this.props.navigation.pop}
            />
          <Text style={styles.title}>
            Tag Your Event
          </Text>
          <View style={styles.searchBar}>
            <Ionicons
              name={'ios-search'} size={25} color={GLOBALS.placeholderColor}
              />
            <TextInput
              style={{
                color: 'white',
                marginLeft: 5,
                flex: 1
              }}
              autoCorrect={false}
              placeholder={'Search'}
              returnKeyType={'search'}
              placeholderTextColor={GLOBALS.placeholderColor}
              selectionColor={GLOBALS.white}

              onChangeText={(query) => {
                this.setState({query})
              }}
              />
          </View>
        </View>
        <ScrollView
          keyboardDismissMode={'on-drag'}
          >
          <View style={{
              flexDirection: 'row',
              flex: 1,
              padding: 10,
              alignSelf: 'center'
            }}>
            <View>
              {
                this.state.subCatData.map((item, index) => {
                  if((index + 1) % 2){
                    if(item.title.includes(this.state.query.toUpperCase())){
                      return (
                        <TouchableOpacity
                          key={item.key}
                          style={[styles.subCat, {
                            backgroundColor: (item.pressed) ? GLOBALS.blue : GLOBALS.lightGrey,
                          }]}
                          onPress={() => {
                            if(item.pressed == true){

                              this.setState({subCats: this.state.subCats.filter(function(person) {
                                return person !== item.title
                              })});

                            } else {
                              var joined = this.state.subCats.concat(item.title);
                              this.setState({ subCats: joined })
                            }
                            console.log('BOIIIIII', this.state.subCats)
                            const { subCatData } = this.state;
                            subCatData[index].pressed = !item.pressed;
                            // update state
                            this.setState({
                              subCatData,
                            })
                          }}
                          >
                          <Text style={[styles.subCatText, {
                              color: (item.pressed) ? GLOBALS.white : GLOBALS.black
                            }]}>{item.title}</Text>
                          </TouchableOpacity>
                        )

                      }
                    }
                  })
                }
              </View>
              <View>
                {
                  this.state.subCatData.map((item, index) => {
                    if((index) % 2){
                      if(item.title.includes(this.state.query.toUpperCase())){
                        return (
                          <TouchableOpacity
                            key={item.key}
                            style={[styles.subCat, {
                              backgroundColor: (item.pressed) ? GLOBALS.blue : GLOBALS.lightGrey,
                            }]}
                            onPress={() => {
                              if(item.pressed == true){

                                this.setState({subCats: this.state.subCats.filter(function(person) {
                                  return person !== item.title
                                })});

                              } else {
                                var joined = this.state.subCats.concat(item.title);
                                this.setState({ subCats: joined })
                              }

                              const { subCatData } = this.state;
                              subCatData[index].pressed = !item.pressed;
                              this.setState({
                                subCatData,
                              })
                            }}
                            >
                            <Text style={[styles.subCatText, {
                                color: (item.pressed) ? GLOBALS.lightGrey : GLOBALS.secondaryTextColor
                              }]}>{item.title}</Text>
                            </TouchableOpacity>
                          )
                        }
                      }
                    })
                  }
                </View>
              </View>
            </ScrollView>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center'
      },
      title: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'HelveticaNeue-Bold'
      },
      subCatText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'HelveticaNeue-Bold'
      },
      subCat: {
        paddingHorizontal: 25,
        paddingVertical: 20,
        borderRadius: 10,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        width: Dimensions.get('screen').width * .45
      },
      searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: Dimensions.get('screen').width * .9,
        backgroundColor: GLOBALS.lightGrey,
        borderRadius: 10,
        paddingLeft: 10,
        opacity: 0.8,
        height: 50,
        marginBottom: 20,
        color: GLOBALS.white

      },
      nextButton: {
        backgroundColor: GLOBALS.blue,
        height: 50,
        width: Dimensions.get('screen').width * .9,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10
      },
      nextText: {
        color: GLOBALS.lightGrey,
        fontSize: 22,
        fontFamily: 'HelveticaNeue-Bold'
      },
    });
