import * as React from 'react';
import {View, StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import Loader from './Loader';
import {useSelector} from 'react-redux';
import {getLoaderSelector} from '../../redux/selectors';
import { images } from '../../constants/images';

interface BaseViewProps {
  hasStatusBar?: boolean;
  hasHeader?: boolean;
  children: React.ReactNode;
  backgroundColor?: string;
}

const BaseView: React.FC<BaseViewProps> = ({
  children,
  hasHeader,
  backgroundColor,
}) => {
  const loader = useSelector(getLoaderSelector);

  return (
    
      <ImageBackground
        style={{flex: 1}}
        source={images.bgImage}
      >
        <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <View style={[styles.container, {backgroundColor}]}>
        <View
          style={hasHeader === true ? styles.parent : styles.headerLessParent}>
          {children}
        </View>

        {loader && <Loader isVisible={loader} />}
      </View>
      </SafeAreaView>
      </ImageBackground>
    
  );
};

export default BaseView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  parent: {
    flex: 1,
  },
  headerLessParent: {
    flex: 1,
  },
});