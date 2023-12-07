import {Button} from '@rneui/base';
import * as React from 'react';
import {Text, View, StyleSheet, ViewStyle} from 'react-native';
import { WIDTH_50 } from '../../constants/dimens';
import { colors } from '../../constants/colors';

interface ButtonViewProps {
  title: string;
  titleStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  onPress: () => void;
  disabled?: boolean;
}

const ButtonView = (props: ButtonViewProps) => {
  const {title, titleStyle, containerStyle, buttonStyle, onPress, disabled} = props;
  return (
    <Button
      title={title}
      titleStyle={[styles.titleStyle, titleStyle]}
      containerStyle={[styles.containerStyle, containerStyle]}
      buttonStyle={[styles.buttonStyle, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
      disabledStyle={{borderWidth: 0}}
      activeOpacity={0.7}
    />
  );
};

export default ButtonView;

const styles = StyleSheet.create({
  container: {},
  containerStyle: {
    width: WIDTH_50,
    height: 48,
    marginTop: 32,
  },
  buttonStyle: {
    height: 48,
    borderRadius: 4,
    backgroundColor: colors.buttonBg,
    borderWidth: 2,
    borderColor: colors.buttonBorder,
  },
  titleStyle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
});
