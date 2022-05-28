import React, { FC, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

import SignallistItem from './SignallistItem';
import Signal from '../models/Signal';
import Colors from '../constants/Colors';

interface SignalProps {
  signalData: Signal[];
}

const Signallist: FC<SignalProps> = ({ signalData }) => {

  const signalLongData = signalData.filter(
    (signal) => signal.type === 'BUY'
  );
  const signalShortData = signalData.filter(
    (signal) => signal.type === 'SELL'
  );

  const renderItem = useCallback(
    ({ item }: RenderItemParams<Signal>) => {
      return (
        <SignallistItem
          dateReadable={item.dateReadable}
          price={item.price}
          securityName={item.securityName}
          strategy={item.strategy}
        />
      );
    },
    []
  );

  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'flex-start',
        marginLeft: '6%',
      }}
    >
      <Text style={styles.signalslistText}>Top Long</Text>
      <View
        style={[{ height: signalData.length * 75 }, styles.signalslistContainer]}
      >
        <DraggableFlatList
          data={signalLongData}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
          renderItem={renderItem}
        />
      </View>
      <Text style={styles.signalslistText}>Top Short</Text>
      <View
        style={[{ height: signalData.length * 75 }, styles.signalslistContainer]}
      >
        <DraggableFlatList
          data={signalShortData}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
          renderItem={renderItem}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  signalslistText: {
    fontWeight: '600',
    fontSize: 21,
    marginTop: 64,
    marginBottom: 10,
  },
  signalslistContainer: {
    width: '88%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.border,
    backgroundColor: 'white',
  },
});

export default Signallist;
