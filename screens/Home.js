import { StyleSheet, Text, View } from 'react-native';
import SearchContainer from '../components/SearchContainer';
import { useState } from 'react';

export default function Home() {
  const [citiesList, setCitiesList] = useState([])

  //on Input Change to the Input field, 
  //receive value String from the Input field,
  //compute Array data that will be displayed & stocked by suggestion components.
  const handleInputChange = async (inputValue) => {
    const response = await fetch(`http://api-adresse.data.gouv.fr/search/?q=${inputValue}`);
    const data = await response.json();
    return data.features.map(e => ({ ...e, _searchName: e.properties.name }));
  }

  //on Click on a search suggestion component,
  //receive values stocked in the search suggestion component,
  //populate a new city from citiesList with those values.
  const handleSelection = (result) => {
    const data = { name: result.properties.name, description: result.properties.context }
    setCitiesList([...citiesList, data])
  }

  //display info for the selected search suggestion component.
  let list = citiesList.map((e, i) => {
    return (
      <View key={i} style={styles.resultItem}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>{e.name}</Text>
        <Text style={{ fontSize: 14, fontWeight: '400' }}>{e.description}</Text>
      </View>
    )
  })

  return (
    <View style={styles.container}>
      <SearchContainer
        onInputChange={handleInputChange}
        onResultSelection={handleSelection}
        minChar={3}
        resultsKey={'properties.name'}
        placeholder={"Search city"}
      />
      {list}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    resizeMode: 'contain',
    alignItems: 'stretch',
    padding: 20,
    backgroundColor: '#FFF5E1',
  },
  resultItem: {
    height: 100, 
    backgroundColor: 'white', 
    marginTop: 10,
    paddingHorizontal: 15,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: 15,
    zIndex: 1,
},
});