import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for medicines
const medicinesData = [
  {
    id: '1',
    name: 'Aspirin',
    content: 'Acetylsalicylic acid',
    composition: 'Aspirin 100%',
    dosage: '325 mg',
    symptoms: ['Fever', 'Pain', 'Inflammation'],
    action: 'Analgesic, Anti-inflammatory, Antipyretic',
    type: 'pill',
    price: 5.99,
    alternatives: ['Ibuprofen', 'Acetaminophen']
  },
  {
    id: '2',
    name: 'Amoxicillin',
    content: 'Amoxicillin trihydrate',
    composition: 'Amoxicillin 90%, Inactive ingredients 10%',
    dosage: '500 mg',
    symptoms: ['Bacterial infections'],
    action: 'Antibiotic',
    type: 'pill',
    price: 12.99,
    alternatives: ['Cephalexin', 'Azithromycin']
  },
  {
    id: '3',
    name: 'Insulin',
    content: 'Human insulin (rDNA origin)',
    composition: 'Insulin 100 units/mL',
    dosage: 'Varies',
    symptoms: ['Diabetes'],
    action: 'Blood glucose regulation',
    type: 'syringe',
    price: 89.99,
    alternatives: ['Metformin', 'Glipizide']
  },
  // Add more medicines as needed
];

const MedicineScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [medicines, setMedicines] = useState(medicinesData);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [aiRecommendations, setAiRecommendations] = useState([]);

  useEffect(() => {
    // Simulating AI-powered search and recommendations
    const filteredMedicines = medicinesData.filter(medicine =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.symptoms.some(symptom => symptom.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    setMedicines(filteredMedicines);

    // Simulating AI recommendations based on search query
    if (searchQuery.length > 2) {
      const recommendations = medicinesData
        .filter(medicine => !filteredMedicines.includes(medicine))
        .slice(0, 3)
        .map(medicine => ({
          id: medicine.id,
          name: medicine.name,
          reason: `Recommended for ${medicine.symptoms[0].toLowerCase()}`
        }));
      setAiRecommendations(recommendations);
    } else {
      setAiRecommendations([]);
    }
  }, [searchQuery]);

  const renderMedicineItem = ({ item }) => (
    <TouchableOpacity style={styles.medicineItem} onPress={() => setSelectedMedicine(item)}>
      <Text style={styles.medicineName}>{item.name}</Text>
      <Text>Type: {item.type}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const renderAiRecommendation = ({ item }) => (
    <TouchableOpacity 
      style={styles.recommendationItem} 
      onPress={() => {
        setSearchQuery(item.name);
        setSelectedMedicine(medicinesData.find(med => med.id === item.id));
      }}
    >
      <Text style={styles.recommendationName}>{item.name}</Text>
      <Text>{item.reason}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search medicines..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      {aiRecommendations.length > 0 && (
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationsTitle}>AI Recommendations:</Text>
          <FlatList
            data={aiRecommendations}
            renderItem={renderAiRecommendation}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      <FlatList
        data={medicines}
        renderItem={renderMedicineItem}
        keyExtractor={item => item.id}
      />

      <Modal
        visible={!!selectedMedicine}
        animationType="slide"
        onRequestClose={() => setSelectedMedicine(null)}
      >
        {selectedMedicine && (
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedMedicine(null)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedMedicine.name}</Text>
            <Text>Content: {selectedMedicine.content}</Text>
            <Text>Composition: {selectedMedicine.composition}</Text>
            <Text>Dosage: {selectedMedicine.dosage}</Text>
            <Text>Symptoms: {selectedMedicine.symptoms.join(', ')}</Text>
            <Text>Action: {selectedMedicine.action}</Text>
            <Text>Type: {selectedMedicine.type}</Text>
            <Text>Price: ${selectedMedicine.price.toFixed(2)}</Text>
            <Text style={styles.alternativesTitle}>Alternatives:</Text>
            {selectedMedicine.alternatives.map((alt, index) => (
              <Text key={index}>• {alt}</Text>
            ))}
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  medicineItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alternativesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  recommendationsContainer: {
    marginBottom: 10,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recommendationItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 10,
  },
  recommendationName: {
    fontWeight: 'bold',
  },
});

export default MedicineScreen;