import React, { FC } from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Colors from '../constants/Colors';

interface SignallistItemProps {
  dateReadable: string;
  price: number;
  securityName: string;
  strategy: string;
}

const SignallistItem: FC<SignallistItemProps> = ({
  dateReadable,
  price,
  securityName,
  strategy,
}) => {
  return (
    <TouchableHighlight
      underlayColor='white'
      onPress={() => {
        console.log(securityName);
      }}
    >
      <View
        style={[styles.activeListItem, styles.listItem]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={styles.logo}
            source={{
              uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${securityName.toString()}.png`,
            }}
          />
          <View>
            <Text style={styles.nameText}>{securityName}</Text>
            <Text style={styles.tickerText}>{strategy}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.priceText}>
            $
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    width: '100%',
    height: 75,
    padding: 16,
    justifyContent: 'space-between',
  },
  activeListItem: {
    backgroundColor: 'white',
    opacity: 0.9,
    shadowColor: 'black',
    shadowRadius: 15,
    shadowOpacity: 0.05,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 16,
    borderRadius: 16,
    borderWidth: 0.3,
    borderColor: Colors.border,
  },
  nameText: {
    fontSize: 17,
    width: 145,
  },
  tickerText: {
    color: Colors.secondarySubtitle,
    fontSize: 16,
  },
  priceText: {
    fontSize: 17,
    textAlign: 'right',
  },
  changeText: {
    textAlign: 'right',
    fontSize: 16,
  },
});

export default SignallistItem;
