/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import BaseView from '../../hoc/BaseView';
import {categoriesJson} from '../../../json/categoryJson';
import CategoryItem from '../../items/CategoryItem';
import ButtonView from '../../components/ButtonView';
import {WIDTH_50} from '../../../constants/dimens';
import {colors} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../../navigator/Routes';

const Home = () => {
  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const _renderCategoryItem = (item: object) => {
    const isSelected = selectedCategory
      ? selectedCategory?.id === item?.id
      : false;

    return (
      <CategoryItem
        item={item}
        onPress={() => _onCategoryPress(item)}
        isSelected={isSelected}
      />
    );
  };

  const _onCategoryPress = (item: object) => {
    // console.log('[Home.tsx] onCategoryPress: ', item);
    if (selectedCategory !== null && selectedCategory?.id === item?.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(item);
    }
  };

  const _onStart = () => {
    navigation.navigate(Routes.Puzzle, {item: selectedCategory});
  };

  const _onLeaderBoard = () => {
    navigation.navigate(Routes.LeaderBoard);
  };

  return (
    <BaseView>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Words Puzzle</Text>
        </View>
        <View style={styles.view}>
          {categoriesJson.map(_renderCategoryItem)}
        </View>
        <ButtonView
          title="START"
          onPress={() => _onStart()}
          disabled={selectedCategory === null}
        />
      </View>
      <TouchableOpacity
        onPress={() => _onLeaderBoard()}
        style={{alignSelf: 'center', marginBottom: 24}}>
        <Text style={styles.leaderBoard}>Leaders Board</Text>
      </TouchableOpacity>
    </BaseView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginVertical: '40%',
  },
  titleView: {
    height: 48,
    width: WIDTH_50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#888',
    borderRadius: 4,
    backgroundColor: colors.titleBg,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  leaderBoard: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.buttonBorder,
  },
});
