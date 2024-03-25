import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

function App() {
  const [hello, setHello] = useState("")

   useEffect(() => {
       axios.get('http://10.0.2.2:8080/api/hello')
       .then(response => setHello(response.data))
       .catch(error => console.log(error))
   }, []);

   return (
    <View style={styles.container}>
      <Text style={styles.title}>
      백엔드에서 가져온 데이터입니다 : {hello}
      </Text>
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor : 'blue',
    alignItems : 'center',
    justifyContent : 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color : 'white',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;