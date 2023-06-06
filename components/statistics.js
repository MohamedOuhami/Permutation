import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

const API_URL = 'https://troubled-red-garb.cyclic.app/professeurs';

const Statistics = () => {
  const [professorsBySpecialty, setProfessorsBySpecialty] = useState([]);
  const [mostRequestedCities, setMostRequestedCities] = useState([]);
  const [professorsByGrade, setProfessorsByGrade] = useState([]);
  const [totalProfessors, setTotalProfessors] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const professorsBySpecialtyData = getTopNItems(data, 'specialite', 10);
      setProfessorsBySpecialty(professorsBySpecialtyData);

      const mostRequestedCitiesData = getTopNItems(data, 'villeDesiree', 10);
      setMostRequestedCities(mostRequestedCitiesData);

      const professorsByGradeData = getTopNItems(data, 'grade', 10);
      setProfessorsByGrade(professorsByGradeData);

      setTotalProfessors(data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getTopNItems = (data, field, n) => {
    const counts = data.reduce((acc, item) => {
      const fieldValue = item[field] || 'Unknown';
      acc[fieldValue] = (acc[fieldValue] || 0) + 1;
      return acc;
    }, {});

    const sortedItems = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sortedItems.slice(0, n);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Statistiques</Text>

      <Card style={styles.totalProfessorsCard}>
        <Text style={styles.totalProfessorsTitle}>Nombre de profs inscrits</Text>
        <Text style={styles.totalProfessorsCount}>{totalProfessors}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.title}>Top 10 Professors by Specialty</Text>
        {professorsBySpecialty.map(([specialty, count]) => (
          <Text key={specialty} style={styles.item}>{`${specialty}: ${count}`}</Text>
        ))}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.title}>Top 10 Most Requested Cities</Text>
        {mostRequestedCities.map(([city, count]) => (
          <Text key={city} style={styles.item}>{`${city}: ${count}`}</Text>
        ))}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.title}>Top 10 Professors by Grade</Text>
        {professorsByGrade.map(([grade, count]) => (
          <Text key={grade} style={styles.item}>{`${grade}: ${count}`}</Text>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  totalProfessorsCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  totalProfessorsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalProfessorsCount: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 6,
  },
});

export default Statistics;
