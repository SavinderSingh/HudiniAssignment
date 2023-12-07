import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface LeaderBoardItemProps {
    item: object;
    index: number;
}

const LeaderBoardItem = (props: LeaderBoardItemProps) => {
  const {item, index} = props;
  const bgColor = index % 2 === 0 ? '#f2f2f2' : '#fff';
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Text style={styles.name}>{index + 1}. Anonymous User</Text>
      <Text style={styles.points}>{item?.points}/{item?.totalPoints}</Text>
    </View>
  );
};

export default LeaderBoardItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  points: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
  }
});
