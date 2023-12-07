import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import BaseView from '../../hoc/BaseView';
import HeaderModal from '../../components/HeaderModal';
import {useNavigation} from '@react-navigation/native';
import Page from './Page';
import PagerView from 'react-native-pager-view';
import CompleteView from './CompleteView';
import {useDispatch, useSelector} from 'react-redux';
import {getLeaderBoardSelector} from '../../../redux/selectors';
import {setLeaderBoard} from '../../../redux/slices/homeSlice';

const Puzzle = props => {
  const {item} = props.route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const pagerRef = useRef(null);

  const leaderBoard = useSelector(getLeaderBoardSelector);
  console.log('[Puzzle.tsx] init: ', leaderBoard);

  const [initialPage, setInitialPage] = useState(0);
  const [result, setResult] = useState([]);

  const _onBack = () => navigation.goBack();

  const _onSkipAndNext = (isSkipped: boolean) => {
    const data = {
      id: item?.words[initialPage]?.id,
      points: isSkipped ? 0 : item?.words[initialPage]?.points,
      totalPoints: item?.words[initialPage]?.points,
    };
    // console.log('[Puzzle.tsx] SkipAndNext: ', data);
    const _result = [...result, data];
    setResult(_result);
    if (pagerRef?.current) {
      const nextPage = initialPage + 1;
      pagerRef?.current?.setPage(nextPage);
      setInitialPage(nextPage);
    }
    console.log('[Puzzle.tsz] : ', item?.words?.length, initialPage);
    if (initialPage === item?.words?.length - 1) {
      let _totalPoints = 0;
      let _points = 0;
      _result.forEach(it => {
        _totalPoints += it?.totalPoints;
        _points += it?.points;
      });
      console.log('[Puzzle.tsx] : ', _totalPoints, _points);
      const leaderBoardItem = {
        id: new Date().getTime(),
        points: _points,
        totalPoints: _totalPoints,
        category: item?.title,
      };
      console.log('[Puzzle.tsx] : ', leaderBoardItem);
      dispatch(setLeaderBoard(leaderBoardItem));
    }
  };

  return (
    <BaseView>
      <HeaderModal title={item?.title} onClose={() => _onBack()} />
      {initialPage !== item?.words?.length && (
        <View style={styles.row}>
          <Text style={styles.total}>
            {initialPage + 1}/{item?.words?.length}
          </Text>
          <Text style={styles.total}>
            Points: {item?.words[initialPage]?.points}
          </Text>
        </View>
      )}
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={initialPage}
        scrollEnabled={false}>
        {item?.words?.map((it, index) => (
          <Page
            item={it}
            onNext={() => _onSkipAndNext(false)}
            onSkip={() => _onSkipAndNext(true)}
            key={index}
            isLastPage={initialPage + 1 === item?.words?.length}
          />
        ))}
        <CompleteView onGoBack={() => _onBack()} result={result} />
      </PagerView>
    </BaseView>
  );
};

export default Puzzle;

const styles = StyleSheet.create({
  container: {},
  pagerView: {
    flex: 1,
  },
  total: {
    fontSize: 16,
    fontWeight: '700',
    // textAlign: 'center',
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
});
