/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ScrambledWord from './ScrambledWord';
import {getShuffledWord} from '../../../utils/Utils';
import TouchableScale from '../../../utils/TouchableScale';
import {Icon} from '@rneui/base';
import ButtonView from '../../components/ButtonView';
import NoMatchModal from '../../modals/NoMatchModal';
import { colors } from '../../../constants/colors';

interface PageProps {
  item: object;
  onSkip: () => void;
  onNext: () => void;
  isLastPage: boolean;
}

const Page = (props: PageProps) => {
  const {item, onSkip, onNext, isLastPage} = props;
  // console.log('[Page.tsx] : ', item?.word);
  const shuffledWord = getShuffledWord(item?.word);

  const scrambledLetters = [...shuffledWord].map((it, index) => {
    const data = {
      id: index.toString(),
      isSelected: false,
      letter: it,
    };
    return data;
  });

  const emptyLetters = [...shuffledWord].map((it, index) => {
    const data = {
      id: index.toString(),
      isSelected: false,
      letter: '',
      foreign_id: '',
    };
    return data;
  });

  //   const letters = [...shuffledWord];
  const [answerLetters, setAnswerLetters] = useState(emptyLetters);
  const [scrambledList, setScrambledList] = useState(scrambledLetters);
  const [extraData, setExtraData] = useState(false);

  const [showMatchedModal, setShowMatchedModal] = useState(false);
  const [isMatched, setIsMatched] = useState(false);

  const _onAddLetter = (data: object) => {
    // console.log('[Page.tsx] onLetter: ', data);
    const list = scrambledList;
    const index = list.findIndex(it => it.id === data?.id);
    list[index].isSelected = true;
    setScrambledList(list);
    // console.log('[Page.tsx] onLetter: ', list);

    const lengthOfSelected = list.filter(it => it.isSelected).length;
    // console.log('[Page.tsx] onLetter: ', lengthOfSelected);
    const _answerList = answerLetters;
    _answerList[lengthOfSelected - 1].letter = list[index].letter;
    _answerList[lengthOfSelected - 1].foreign_id = list[index].id;
    // console.log('[Page.tsx] answerList: ', _answerList);
    setAnswerLetters(_answerList);
    setExtraData(prevState => !prevState);

    const selectedAnswerList = _answerList.filter(it => it.letter !== '');
    if (selectedAnswerList.length === answerLetters.length) {
      const answerWord = answerLetters.map(it => it.letter).join('');
      // console.log('[Page.tsx] answerList: ', answerWord);
      if (item?.word === answerWord) {
        setIsMatched(true);
      } else {
        setIsMatched(false);
      }
      setShowMatchedModal(true);
    }
  };

  const _onClearLetter = () => {
    const _answerLetters = answerLetters;
    const filledLettersLength = _answerLetters.filter(
      it => it.letter !== '',
    ).length;
    // console.log('[Page.tsx] onClearLetter: ', filledLettersLength);
    _answerLetters[filledLettersLength - 1].letter = '';
    setAnswerLetters(_answerLetters);

    const _scrambledList = scrambledList;
    const _scrambledIndex = _scrambledList.findIndex(
      it => it.id === _answerLetters[filledLettersLength - 1].foreign_id,
    );
    _scrambledList[_scrambledIndex].isSelected = false;
    setScrambledList(_scrambledList);
    setExtraData(prevState => !prevState);
  };

  const _clearAllLetters = () => {
    setIsMatched(false);
    setShowMatchedModal(false);
    // clear answers letters list
    const _answerList = answerLetters;
    const _list1 = _answerList.map(it => {
      it.isSelected = false;
      it.letter = '';
      return it;
    });
    setAnswerLetters(_list1);

    // update scrambled letters list
    const _scrambledList = scrambledList;
    const _list2 = _scrambledList.map(it => {
      it.isSelected = false;
      return it;
    });
    setScrambledList(_list2);
    setExtraData(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.answerView}>
        <ScrambledWord
          letters={answerLetters}
          onLetterPress={() => {}}
          extraData={extraData}
          isButtonDisabled={true}
        />

        {answerLetters.filter(it => it.letter !== '').length > 0 && (
          <View style={styles.row}>
            <TouchableScale
              style={{padding: 16}}
              onPress={() => _onClearLetter()}>
              <Icon name="back" type="ant-design" size={32} />
            </TouchableScale>

            <TouchableScale
              style={{padding: 16}}
              onPress={() => _clearAllLetters()}>
              <Icon name="retweet" type="ant-design" size={32} />
            </TouchableScale>
          </View>
        )}
      </View>
      <View style={styles.scrambleView}>
        <ScrambledWord
          letters={scrambledList}
          onLetterPress={_onAddLetter}
          extraData={extraData}
        />
      </View>

      <ButtonView
        title="SKIP"
        containerStyle={{alignSelf: 'center', marginBottom: 24}}
        onPress={() => {
          setShowMatchedModal(false);
          onSkip();
        }}
      />

      <NoMatchModal
        isVisible={showMatchedModal}
        isMatched={isMatched}
        onNext={() => {
          setShowMatchedModal(false);
          onNext();
        }}
        onSkip={() => {
          setShowMatchedModal(false);
          onSkip();
        }}
        isLastPage={isLastPage}
        onRetry={() => _clearAllLetters()}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  answerView: {
    // backgroundColor: '#888',
    flex: 1,
    paddingTop: 40,
  },
  scrambleView: {
    // backgroundColor: '#909090',
    flex: 1,
    // alignItems: 'center',
    paddingVertical: 40,
    
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
