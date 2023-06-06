import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';

const Combinaison = () => {
  const [professors, setProfessors] = useState([]);
  const [combinations, setCombinations] = useState([]);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
      const data = await response.json();
      setProfessors(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCombination = () => {
    const combinationsData = [];

    professors.forEach((professor) => {
      const { _id, villeFaculteActuelle, villeDesiree } = professor;
      const possibleCombinations = professors.filter(
        (p) =>
          p._id !== _id &&
          p.villeFaculteActuelle === villeDesiree &&
          p.villeDesiree === villeFaculteActuelle
      );

      if (possibleCombinations.length > 0) {
        combinationsData.push({
          professor,
          combinations: possibleCombinations,
        });
      }
    });

    setCombinations(combinationsData);
  };

  const renderCombination = ({ item }) => {
    const { professor, combinations } = item;
    return (
      <View style={styles.card}>
        <Text style={styles.professorName}>{`${professor.prenom} ${professor.nom}`}</Text>
        <Text style={styles.professorDetails}>{`Ville Actuelle: ${professor.villeFaculteActuelle}`}</Text>
        <Text style={styles.professorDetails}>{`Ville Désirée: ${professor.villeDesiree}`}</Text>
        <Text style={styles.combinationLabel}>Possible Combinations:</Text>
        {combinations && combinations.length > 0 ? (
          <FlatList
            data={combinations}
            renderItem={renderCombinationItem}
            keyExtractor={(item) => item._id}
            style={styles.combinationsList}
          />
        ) : (
          <Text style={styles.noCombinationsText}>No combinations found.</Text>
        )}
      </View>
    );
  };

  const renderCombinationItem = ({ item }) => {
    const { prenom, nom, villeFaculteActuelle, villeDesiree } = item;
    return (
      <Text style={styles.combinationItem}>{`${prenom} ${nom} (${villeFaculteActuelle} - ${villeDesiree})`}</Text>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Find Combinations" onPress={handleCombination} />

      {combinations && combinations.length > 0 ? (
        <FlatList
          data={combinations}
          renderItem={renderCombination}
          keyExtractor={(item) => item.professor._id}
          style={styles.combinationsList}
        />
      ) : (
        <Text style={styles.noCombinationsText}>No combinations found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  combinationLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  combinationsList: {
    marginLeft: 8,
  },
  noCombinationsText: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default Combinaison;
