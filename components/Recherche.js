import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Recherche = () => {
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villeDesiree, setVilleDesiree] = useState('');
  const [professors, setProfessors] = useState([]);

  const specialiteOptions = ['Informatique', 'Mathématiques', 'Physique', 'Chimie'];
  const villeActuelleOptions = ['Tétouan', 'Marrakech', 'Settat', 'Rabat'];
  const villeDesireeOptions = ['Tétouan', 'Marrakech', 'Settat', 'Rabat'];

  useEffect(() => {
    handleSearch();
  }, [specialite, villeActuelle, villeDesiree]);

  const handleSearch = async () => {
    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
      const data = await response.json();

      // Filter the data based on the selected criteria
      const filteredData = data.filter((professor) => {
        if (specialite && professor.specialite !== specialite) {
          return false;
        }
        if (villeActuelle && professor.villeFaculteActuelle !== villeActuelle) {
          return false;
        }
        if (villeDesiree && !professor.villeDesiree.includes(villeDesiree)) {
          return false;
        }
        return true;
      });

      setProfessors(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderProfessor = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.professorName}>{`${item.prenom} ${item.nom}`}</Text>
        <Text style={styles.professorDetails}>{`Specialité: ${item.specialite}`}</Text>
        <Text style={styles.professorDetails}>{`Ville Actuelle: ${item.villeFaculteActuelle}`}</Text>
        <Text style={styles.professorDetails}>{`Ville Désirée: ${item.villeDesiree}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Spécialité</Text>
      <Picker
        style={styles.picker}
        selectedValue={specialite}
        onValueChange={(value) => setSpecialite(value)}
      >
        <Picker.Item label="Toutes les spécialités" value="" />
        {specialiteOptions.map((option) => (
          <Picker.Item label={option} value={option} key={option} />
        ))}
      </Picker>

      <Text style={styles.label}>Ville Actuelle</Text>
      <Picker
        style={styles.picker}
        selectedValue={villeActuelle}
        onValueChange={(value) => setVilleActuelle(value)}
      >
        <Picker.Item label="Toutes les villes" value="" />
        {villeActuelleOptions.map((option) => (
          <Picker.Item label={option} value={option} key={option} />
        ))}
      </Picker>

      <Text style={styles.label}>Ville Désirée</Text>
      <Picker
        style={styles.picker}
        selectedValue={villeDesiree}
        onValueChange={(value) => setVilleDesiree(value)}
      >
        <Picker.Item label="Toutes les villes" value="" />
        {villeDesireeOptions.map((option) => (
          <Picker.Item label={option} value={option} key={option} />
        ))}
      </Picker>

      <Button title="Rechercher" onPress={handleSearch} />

      {professors.length > 0 ? (
        <FlatList
          data={professors}
          renderItem={renderProfessor}
          keyExtractor={(item) => item._id}
          style={styles.professorsList}
        />
      ) : (
        <Text style={styles.noResultsText}>Aucun résultat trouvé.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
  },
  professorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  professorDetails: {
    fontSize: 14,
    marginBottom: 2,
  },
  noResultsText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  professorsList: {
    marginTop: 16,
  },
});

export default Recherche;
