import {Icon, Overlay} from '@rneui/base';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/dimens';
import ButtonView from '../components/ButtonView';
import TouchableScale from '../../utils/TouchableScale';
import {colors} from '../../constants/colors';

interface NoMatchModalProps {
  isVisible: boolean;
  isMatched: boolean;
  onSkip: () => void;
  onNext: () => void;
  onRetry: () => void;
  isLastPage: boolean;
}

const NoMatchModal = (props: NoMatchModalProps) => {
  const {isVisible, onSkip, onRetry, onNext, isMatched, isLastPage} = props;
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlayStyle}
      animationType="slide">
      <View style={styles.parent}>
        <Icon
          name={isMatched ? 'checkcircleo' : 'closecircleo'}
          type="ant-design"
          size={120}
          color={isMatched ? '#2E9F4A' : '#f33'}
        />
        <Text style={styles.text}>{isMatched ? 'Matched' : 'Not Matched'}</Text>

        <ButtonView
          title={isMatched ? (isLastPage ? 'Submit' : 'Next') : 'Retry'}
          onPress={isMatched ? onNext : onRetry}
        />
        {!isMatched && (
          <TouchableScale onPress={onSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableScale>
        )}
      </View>
    </Overlay>
  );
};

export default NoMatchModal;

const styles = StyleSheet.create({
  container: {},
  overlayStyle: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  parent: {
    backgroundColor: '#fff',
    width: SCREEN_WIDTH - 48,
    height: SCREEN_HEIGHT / 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    paddingTop: 16,
  },
  skipText: {
    padding: 16,
    fontSize: 16,
    fontWeight: '700',
    color: colors.buttonBorder,
  },
});
