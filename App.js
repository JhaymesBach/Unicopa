import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import GameCard from './GameCard';
import dados from './assets/dados.json';
import { SectionList } from 'react-native';
import { useState } from 'react';
export default function App() {

  const agruparPorData =(jogos) => {
    return jogos.reduce((acc, jogo) => {

      const data = jogo.data_brasilia;

      if (!acc[data]) {
        acc[data] = [];
      }

      acc[data].push(jogo);

      return acc;

    }, {})
  }

  const [favoritos, setFavoritos] = useState([]);
  
  const toggleFavorito = (id) => {
  setFavoritos((prev) => {
    if (prev.includes(id)) {
      return prev.filter((item) => item !== id);
    } else {
      return [...prev, id];
    }
  });
};
  

const jogos = [

  
   
    {
      "id": 1,
      "fase": "Fase de grupos",
      "grupo": "A",
      "data_et": "2026-06-11",
      "hora_et": "15:00",
      "data_brasilia": "2026-06-11",
      "hora_brasilia": "16:00",
      "time_casa": "México",
      "sigla_casa": "MEX",
      "time_fora": "África do Sul",
      "sigla_fora": "RSA",
      "confronto": "México x África do Sul",
      "estadio": "Estádio Azteca",
      "cidade": "Cidade do México",
      "pais": "México"
    },
    {
      "id": 2,
      "fase": "Fase de grupos",
      "grupo": "A",
      "data_et": "2026-06-11",
      "hora_et": "22:00",
      "data_brasilia": "2026-06-11",
      "hora_brasilia": "23:00",
      "time_casa": "Coreia do Sul",
      "sigla_casa": "KOR",
      "time_fora": "Tchéquia",
      "sigla_fora": "CZE",
      "confronto": "Coreia do Sul x Tchéquia",
      "estadio": "Estádio Akron",
      "cidade": "Guadalajara",
      "pais": "México"
    }
  ]

  const jogosAgrupados = agruparPorData(jogos);

  const jogosTratados = Object.keys(jogosAgrupados).map(data => {
  return {
    title: data,
    data: jogosAgrupados[data]
  }
});

  return (
    <ImageBackground style={styles.container}
      source={require('./assets/bg-overlay.png')}>
      <Image style={styles.logo}
        source={require('./assets/unicopa.png')}
      />

      <Text style={styles.title}>CALENDÁRIO</Text>

    <SectionList 
    
    sections={jogosTratados}
    keyExtractor={(item, index) => item + index}
    renderItem={() => null }
    renderSectionHeader={ ({section}) => (
      <View style={styles.card}>

        <Text style={styles.data}>
          {section.title}
                  </Text>
          {
          section.data.map(jogo =>  (
            <GameCard
            key={jogo.id}
            game={jogo}
            isFavorito={favoritos.includes(jogo.id)}
            onToggleFavorito={() => toggleFavorito(jogo.id)}
/>
          ))
          }


      </View>
    )


    }
    
    
    />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#040b13',
    alignItems: 'center',
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 50,
    resizeMode: 'contain'
  },
  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#0c1b2a',
    width: 320,
    borderRadius: 12,
    padding: 15,
  },
  data: {
    color: '#f2cc2f',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },

  jogo: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e2d3d',
    paddingBottom: 15
  },
  grupo: {
    color: '#8fa3b8',
    fontSize: 12,
    marginBottom: 10
  },
  linhaPrincipal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  bandeira: {
    width: 28,
    height: 28,
    borderRadius: 14
  },
  sigla: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  horario: {
    alignItems: 'center'
  },
  hora: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  local: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subTitulo: {
    color: '#8fa3b8',
    fontSize: 12
  }
});