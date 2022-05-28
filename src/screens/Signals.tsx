import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  Image,
  LogBox,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import * as signallistActions from '../store/actions/signallist';
import { SignallistState } from '../store/reducers/signallist';
import Signallist from '../components/Signallist';

import Colors from '../constants/Colors';

interface RootState {
  signallist: SignallistState;
}

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Signals = ({ navigation }: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const loadData = useCallback(async () => {
    try {
      dispatch(signallistActions.fetchTradesData());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    loadData();
  }, [loadData]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData().then(() => {
      setRefreshing(false);
    });
  }, [loadData, refreshing]);


  const ref = useRef(null);
  useScrollToTop(ref);

  const signallistData = useSelector(
    (state: RootState) => state.signallist.signallistData
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
        ref={ref}
        refreshControl={
          <RefreshControl
            tintColor='rgb(233, 233, 243)'
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Signallist signalData={signallistData} />
        <StatusBar style='auto' />
      </ScrollView>
    </SafeAreaView>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  image: {
    height: 250,
    width: 150,
    marginTop: 40,
  },
  title: {
    fontWeight: '600',
    letterSpacing: 0.5,
    fontSize: 21,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 24,
    color: Colors.subtitle,
  },
});

export default Signals;
