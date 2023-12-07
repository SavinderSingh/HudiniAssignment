import { Icon } from '@rneui/base';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderModalProps {
    title: string;
    onClose: () => void;
}

const HeaderModal = ({title, onClose}: HeaderModalProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={{padding: 8}} onPress={onClose}>
        <Icon 
            name='close'
            type='ant-design'
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderModal;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#888',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  }
});
