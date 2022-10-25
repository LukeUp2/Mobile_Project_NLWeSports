import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';

import logoImg from '../../assets/logo-nlw-esports.png'
import { Entypo } from '@expo/vector-icons'

import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch'

export function Game() {

  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const route = useRoute();
  const game = route.params as GameParams
  const navigation = useNavigation()
  

  const handleGoBack = () => {
    navigation.goBack();
  }

  const getDiscordUser = async (adsId: string) => {
    fetch(`http://192.168.0.38:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDuoSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.0.38:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  },[])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left" 
              color={THEME.COLORS.CAPTION_300} 
              size={20}
            />

          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo}/>

          <View style={styles.right}/>
        </View>

        <Image 
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece e a jogar!"
        />

        <FlatList 
          data={duos}
          horizontal
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListTest}>Não há anúncios publicados ainda</Text>
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard 
              data={item}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
        />

      <DuoMatch 
        visible={discordDuoSelected.length > 0}
        discord={discordDuoSelected}
        onClose={() => setDiscordDuoSelected('')}
      />
      </SafeAreaView>
    </Background>
  );
}