/*
  * a universal component that renders a linear gradient
  * from black to transparent
*/

import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native';
import Tag from './Tag';
import {GLOBALS} from 'src/globals'
import {STYLES} from 'src/styles'
function TagFeed (props){
  return (
    <View
      style={[
        {
          height: 100
        },
        props.style
      ]}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode={'on-drag'}
        contentContainerStyle={{
          alignItems: 'center'
        }}
        data={props.data}
        keyExtractor = {(item, index) => {
          if(item.key){
            return item.key
          } else {
            return item
          }
        }}
        renderItem={({item, index}) => {
          console.log('THIS IS ITEM', item)
          if(props.onPress){
            return (
              <TouchableOpacity
                onPress={props.onPress}
                key={`${item}-${index}`}
                >
                <Tag item={item} index={index}/>
              </TouchableOpacity>
            )
          } else {
            return (
              <Tag item={item} index={index}/>
            )
          }
        }}
        automaticallyAdjustContentInsets={false}
        bouncesZoom={true}
        decelerationRate={true}
        />
    </View>
  )

}

module.exports = TagFeed;
