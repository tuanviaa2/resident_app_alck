/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../Utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {getFirstLetters} from '../../Helper/filter';
import {screenDimensions} from '../../Utils/Screen';
import {handleClearMessages} from '../../Helper/handlers';

const ChatHeader = ({avatar_url, name}: any) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <View style={[styles.backContainer, styles.shadow]}>
          <Icon name="chevron-left" size={20} />
        </View>
      </TouchableOpacity>
      <View>
        <View style={styles.image}>
          <Text style={styles.nameLetters}>{getFirstLetters(name)}</Text>
        </View>
      </View>
      {/* <Image
        source={{
          uri: avatar_url,
        }}
        style={styles.image}
      /> */}

      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: screenDimensions.height / 13,
    backgroundColor: COLORS.screenBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.dividerColor,
    marginBottom: 5,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: COLORS.primaryColor,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    marginLeft: 40,
  },
  nameLetters: {
    fontWeight: '600',
    fontSize: 14,
    color: 'black',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primaryTextColor,
    marginLeft: 20,
  },
  backContainer: {
    backgroundColor: COLORS.dividerColor,
    width: 40,
    height: screenDimensions.height / 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginLeft: 5,
  },
  shadow: {
    shadowOffset: {width: 2, height: 2},
    shadowColor: COLORS.dividerColor,
    shadowOpacity: 0.4,
    elevation: 1,
    // background color must be set
  },
});
