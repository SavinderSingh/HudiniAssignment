import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import BaseView from '../../hoc/BaseView';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import HeaderModal from '../../components/HeaderModal';
import {getLeaderBoardSelector} from '../../../redux/selectors';
import {ButtonGroup} from '@rneui/base';
import {categoriesJson} from '../../../json/categoryJson';
import LeaderBoardItem from '../../items/LeaderBoardItem';

const LeaderBoard = () => {
  const navigation = useNavigation();

  const leaderBoard = useSelector(getLeaderBoardSelector);
  console.log('[LeaderBoard] init: ', leaderBoard);

  const buttons = categoriesJson.map(it => it.title);
  // console.log('[LeaderBoard] init: ', buttons);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [list, setList] = useState(
    leaderBoard
      .filter((it: any) => it.category === buttons[0])
      .sort((a: object, b: object) => b?.points - a?.points) || [],
  );

  const _onBack = () => navigation.goBack();

  const _onUpdateIndex = (index: number) => {
    setSelectedIndex(index);
    let filteredList = leaderBoard
      .filter((it: {category: string}) => it?.category === buttons[index])
      .sort((a: object, b: object) => b?.points - a?.points);
    console.log('[LeaderBoard.tsx] list: ', filteredList, leaderBoard);
    setList(filteredList);
    // if(index === 0) {
    //   filteredList = leaderBoard.filter(it => it.category === it.title);
    // } else if(index === 1) {
    //   filteredList = leaderBoard.filter(it => it.category === it.title);
    // } else if(index === 2) {
    //   filteredList = leaderBoard.filter(it => it.category === it.title);
    // };
  };

  const _renderItem = ({item, index}: any) => {
    return <LeaderBoardItem item={item} index={index} />;
  };

  return (
    <BaseView>
      <HeaderModal title={'Leaders board'} onClose={() => _onBack()} />
      <View style={styles.container}>
        <ButtonGroup
          buttons={buttons}
          selectedIndex={selectedIndex}
          onPress={index => _onUpdateIndex(index)}
        />
        <FlatList data={list} renderItem={_renderItem} />
        {list.length < 1 && (
          <Text style={styles.noData}>No Data Available</Text>
        )}
      </View>
    </BaseView>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noData: {
    position: 'absolute',
    top: 144,
    alignSelf: 'center',
    color: '#888',
  },
});
