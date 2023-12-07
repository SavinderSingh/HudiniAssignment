import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import ButtonView from '../../components/ButtonView';
import {images} from '../../../constants/images';
import {SCREEN_WIDTH} from '../../../constants/dimens';

const CompleteView = ({
  onGoBack,
  result,
}: {
  onGoBack: () => void;
  result: [];
}) => {
  let totalPoints = 0;
  let points = 0;
  result.forEach(it => {
    totalPoints += it?.totalPoints;
    points += it?.points;
  });
//   console.log('[CompleteView.tsx] ', totalPoints, points);
  return (
    <View style={styles.container}>
      <Text style={styles.thankyou}>Thankyou!</Text>
      <Image
        source={images.success}
        style={styles.successImage}
        resizeMode="cover"
      />
      <Text style={styles.description}>You have successfully completed.</Text>
      <Text style={styles.description}>
        You got
        <Text style={styles.points}> {points} </Text>
        out of
        <Text style={styles.points}> {totalPoints} </Text>
        points.
      </Text>
      <ButtonView title="Go Back" onPress={onGoBack} />
    </View>
  );
};

export default CompleteView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 24,
  },
  thankyou: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    paddingTop: 12,
  },
  points: {
    fontSize: 16,
    fontWeight: '700',
  },
  successImage: {
    height: SCREEN_WIDTH / 2,
    width: SCREEN_WIDTH / 2,
    marginVertical: 36,
  },
});
