import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert
} from 'react-native';
import {GLOBALS} from 'src/globals';
import {STYLES} from 'src/styles';
import TopBar from 'src/comps/TopBar'
import Tag from 'src/comps/Tag'
import {TagsData} from './tagsData';
import Search from './Search';

export default class PickSubCat extends Component {
  constructor(props){
    super(props)
    this.state = {
      subCats: [],
      query: '',
      subCats: []
    }
    this.onCatPressed = this.onCatPressed.bind(this)
    this.onFinished = this.props.navigation.getParam('onFinished');
  }
  componentDidMount(){
    this.setState({subCats: TagsData})
  }
  onCatPressed(item, index){
    if(item.pressed == true){

      this.setState({subCats: this.state.subCats.filter(function(person) {
        return person !== item.title
      })});

    } else {
      var joined = this.state.subCats.concat(item.title);
      this.setState({ subCats: joined })
    }
    const { subCats } = this.state;
    subCats[index].pressed = !item.pressed;
    // update state
    this.setState({
      subCats,
    })
  }
  render() {
    return (
      <View style={{
          flex: 1,
          alignItems: 'center'
        }}>
        <TopBar
          left={'CLOSE'}
          right={'CHECK'}
          leftPress={this.props.navigation.pop}
          rightPress={() => {
            var selectedTags = this.state.subCats.filter(function(item) {
              return item.pressed == true;
            });
            this.onFinished(selectedTags)
            this.props.navigation.pop()
          }}
          />
        <Search
          onChangeText={(query) => {
            this.setState({query})
          }}
        />
        <FlatList
          keyboardDismissMode={'on-drag'}
          contentContainerStyle={{
            alignItems: 'center'
          }}
          data={this.state.subCats}
          numColumns={2}
          keyExtractor = {(item, index) => item.key}
          renderItem={({item, index}) => {
            if(item.title.includes(this.state.query.toUpperCase())){
              return (
                <TouchableOpacity
                  onPress={() => this.onCatPressed(item, index)}
                  >
                  <Tag item={item}/>
                </TouchableOpacity>
              )
            }
          }}
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          bouncesZoom={true}
          decelerationRate={true}
          />
      </View>
    );
  }
}
