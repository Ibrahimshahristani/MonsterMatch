import React, {
  ReactElement, useState, useCallback, useEffect,
} from 'react';
import {
  Dimensions, View, Image, TouchableOpacity, StyleSheet, Text,
} from 'react-native';
import faker from 'faker';

import Monster1Head from './src/assets/img/monster1_head.png';
import Monster2Head from './src/assets/img/monster2_head.png';
import Monster3Head from './src/assets/img/monster3_head.png';
import Monster1Body from './src/assets/img/monster1_body.png';
import Monster2Body from './src/assets/img/monster2_body.png';
import Monster3Body from './src/assets/img/monster3_body.png';
import Monster1Feet from './src/assets/img/monster1_feet.png';
import Monster2Feet from './src/assets/img/monster2_feet.png';
import Monster3Feet from './src/assets/img/monster3_feet.png';
import { randomNumber } from './src/services/ultils';

interface MonsterParts {
  image: any;
  type: string;
  from: string;
}

const monsterHeads: MonsterParts[] = [
  {
    image: Monster1Head,
    type: 'head',
    from: 'monster1',
  },
  {
    image: Monster2Head,
    type: 'head',
    from: 'monster2',
  },
  {
    image: Monster3Head,
    type: 'head',
    from: 'monster3',
  },
];

const monsterBodies: MonsterParts[] = [
  {
    image: Monster1Body,
    type: 'body',
    from: 'monster1',
  },
  {
    image: Monster2Body,
    type: 'body',
    from: 'monster2',
  },
  {
    image: Monster3Body,
    type: 'body',
    from: 'monster3',
  },
];

const monsterFoot: MonsterParts[] = [
  {
    image: Monster1Feet,
    type: 'feet',
    from: 'monster1',
  },
  {
    image: Monster2Feet,
    type: 'feet',
    from: 'monster2',
  },
  {
    image: Monster3Feet,
    type: 'feet',
    from: 'monster3',
  },
];

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height,
  },
  title: {
    fontSize: 30,
    marginBottom: 5,
  },
  image: {
    width: width * 0.9,
    height: 200,
  },
  random: {
    padding: 15,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    marginTop: 5,
  },
  monsterName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

const randomMonsterPart = (monsterParts: MonsterParts[]): MonsterParts => {
  const randomNum = randomNumber(0, monsterParts.length - 1);
  const random = monsterParts[randomNum];

  return random;
};

export default function App(): ReactElement {
  const [{
    monsterHead,
    monsterBody,
    monsterFeet,
    monsterName,
  }, setState] = useState({
    monsterHead: randomMonsterPart(monsterHeads),
    monsterBody: randomMonsterPart(monsterBodies),
    monsterFeet: randomMonsterPart(monsterFoot),
    monsterName: '',
  });

  useEffect(() => {
    if (monsterHead.type === 'head' && monsterBody.type === 'body' && monsterFeet.type === 'feet') {
      const isFromSameMonster = [monsterHead, monsterBody, monsterFeet].every(({ from }) => from === monsterHead.from);
      if (isFromSameMonster) {
        setState((prevState) => ({
          ...prevState,
          monsterName: faker.name.firstName(),
        }));
      }
    }
  }, [monsterHead, monsterHead.type, monsterBody, monsterBody.type, monsterFeet, monsterFeet.type]);

  const onRandom = useCallback(
    () => {
      setState({
        monsterHead: randomMonsterPart(monsterHeads),
        monsterBody: randomMonsterPart(monsterBodies),
        monsterFeet: randomMonsterPart(monsterFoot),
        monsterName: '',
      });
    },
    [],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monster Match</Text>
      <Image style={styles.image} source={monsterHead.image} />
      <Image style={styles.image} source={monsterBody.image} />
      <Image style={styles.image} source={monsterFeet.image} />
      <TouchableOpacity
        style={styles.random}
        onPress={onRandom}
      >
        <Text>Random</Text>
      </TouchableOpacity>
      <Text style={styles.monsterName}>{monsterName}</Text>
    </View>
  );
}
