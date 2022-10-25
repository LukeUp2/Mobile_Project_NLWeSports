import { Image, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react'

import logoImg from '../../assets/logo-nlw-esports.png'

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';


import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {

  const navigation = useNavigation();
  const [games, setGames] = useState<GameCardProps[]>([])

  const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  useEffect(() => {
    fetch('http://192.168.0.38:3333/games')
    .then(response => response.json())
    .then(data => setGames(data))
  },[])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />

        <Heading 
          title="Encontre seu duo" 
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList 
          data={games}
          contentContainerStyle={styles.contentList}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameCard 
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
        />
      </SafeAreaView>
    </Background>
  );
}