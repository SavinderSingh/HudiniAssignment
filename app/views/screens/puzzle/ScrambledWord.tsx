import * as React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {getShuffledWord} from '../../../utils/Utils';
import LetterItem from '../../items/LetterItem';

interface ScrambledWordProps {
  letters: {id: string; isSelected: boolean; letter: string}[];
  onLetterPress: (item: object) => void;
  extraData: boolean;
  isButtonDisabled?: boolean;
}

const ScrambledWord = (props: ScrambledWordProps) => {
  const {letters, onLetterPress, extraData, isButtonDisabled} = props;

  const _renderWord = ({item}: any) => {
    // console.log(item);
    return (
      <LetterItem
        letter={item?.letter}
        onPress={() => onLetterPress(item)}
        isSelected={item?.isSelected}
        disabled={isButtonDisabled}
      />
    );
  };

  return (
    <FlatList
      data={letters}
      renderItem={_renderWord}
      numColumns={4}
      // style={{paddingLeft: 12}}
      extraData={extraData}
    />
  );
};

export default ScrambledWord;
