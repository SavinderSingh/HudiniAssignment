import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TouchableScale from '../../utils/TouchableScale';

interface LetterItemProps {
  letter: string;
  onPress: () => void;
  isSelected: boolean;
  disabled?: boolean;
}

const LetterItem = (props: LetterItemProps) => {
  const {letter, onPress, isSelected, disabled} = props;
  const bgColor = isSelected ? '#c5c5c5' : '#fff';
  return (
    <TouchableScale
      style={styles.mainContainer}
      onPress={onPress}
      activeScale={0.7}
      disabled={isSelected || disabled}>
      <View style={[styles.container, {backgroundColor: bgColor}]}>
        <Text style={styles.letter}>{letter}</Text>
      </View>
    </TouchableScale>
  );
};

export default LetterItem;

const width = 48;

const styles = StyleSheet.create({
  mainContainer: {
    // marginRight: 12,
    marginBottom: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: width,
    width: width,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  letter: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
});
