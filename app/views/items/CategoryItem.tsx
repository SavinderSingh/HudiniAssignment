import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { colors } from '../../constants/colors';
import { WIDTH_50 } from '../../constants/dimens';

interface CategoryItemProps {
  item: object;
  onPress: () => void;
  isSelected: boolean;
}

const CategoryItem = ({item, onPress, isSelected}: CategoryItemProps) => {
  const bgColor = isSelected ? colors.primary : '#fff';
  const textColor = isSelected ? '#fff' : '#000';
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
      <View style={[styles.container, {backgroundColor: bgColor}]}>
        <Text style={[styles.title, {color: textColor}]}>{item?.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 32,
  },
  container: {
    height: 48,
    width: WIDTH_50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#888',
    borderRadius: 4,
  },
  title: {
    fontWeight: '500',
  },
});
