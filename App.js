import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { api } from './src/services/api';
import { useEffect, useState } from 'react';
import { Filmes } from './src/components/Filmes';

export default function App() {

  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function loadFilmes(){
      const response = await api.get('r-api/?api=filmes')
      setFilmes(response.data)
      setLoading(false)
    }

    loadFilmes()
  }, [])

  if(loading){
    return(
      <View style={{alignItems: 'center', justifyContent:'center', flex:1}}>
        <ActivityIndicator size={45} color='#121212'/>
      </View>
    )
  }else{
    return (
      <View style={styles.container}>
        <FlatList
          data={filmes}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <Filmes data={item}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
