import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, FlatList, Modal, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

// Mock data for doctor and patients
const doctorData = {
  id: 'D001',
  name: 'Dr. Jane Smith',
  specialization: 'Cardiologist',
  experience: '15 years',
  education: 'MD, Cardiology - Harvard Medical School',
  certifications: ['American Board of Internal Medicine', 'American College of Cardiology'],
  patients: [
    { id: 'P001', name: 'John Doe', status: 'Stable', healthScore: 85 },
    { id: 'P002', name: 'Alice Johnson', status: 'Critical', healthScore: 60 },
    { id: 'P003', name: 'Bob Williams', status: 'Improving', healthScore: 75 },
  ],
  routine: [
    { time: '09:00', activity: 'Morning Rounds' },
    { time: '11:00', activity: 'Patient Consultations' },
    { time: '13:00', activity: 'Lunch Break' },
    { time: '14:00', activity: 'Surgeries' },
    { time: '17:00', activity: 'Evening Rounds' },
  ],
};

const patientsData = {
  'P001': {
    id: 'P001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    condition: 'Hypertension',
    admissionDate: '2023-09-15',
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily' },
    ],
    allergies: ['Penicillin', 'Sulfa drugs'],
    labReports: [
      { date: '2023-09-16', test: 'Complete Blood Count', result: 'Normal', fileType: 'pdf' },
      { date: '2023-09-17', test: 'Lipid Panel', result: 'High Cholesterol', fileType: 'image' },
      { date: '2023-09-18', test: 'Chest X-ray', result: 'Normal', fileType: 'xray' },
    ],
    vitals: [
      { date: '2023-09-15', heartRate: 72, bloodPressure: '120/80', temperature: 98.6 },
      { date: '2023-09-16', heartRate: 75, bloodPressure: '118/78', temperature: 98.4 },
      { date: '2023-09-17', heartRate: 70, bloodPressure: '122/82', temperature: 98.7 },
    ],
    soundAnalysis: {
      coughingFrequency: 5,
      sneezingFrequency: 2,
      noseRunning: 'Yes',
      sleepQuality: 'Poor',
    },
    nurseNotes: 'Patient complains of occasional dizziness. Recommend monitoring blood pressure closely.',
  },
  // ... (other patient data remains the same)
};

export default function DoctorProfile() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);
  const [selectedLabReport, setSelectedLabReport] = useState(null);
  const [ecgData, setEcgData] = useState([]);

  useEffect(() => {
    let intervalId;
    if (selectedPatient && activeTab === 'analysis') {
      const fetchEcgData = async () => {
        try {
          const response = await fetch('https://kmvzxczv-8000.inc1.devtunnels.ms/ecg');
          const data = await response.json();
          if (Array.isArray(data) && data.length === 140) {
            setEcgData(data);
          } else {
            console.error('Invalid ECG data format');
          }
        } catch (error) {
          console.error('Error fetching ECG data:', error);
        }
      };

      fetchEcgData(); // Fetch immediately
      intervalId = setInterval(fetchEcgData, 5000); // Then every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedPatient, activeTab]);

  const renderPatientList = () => (
    <FlatList
      data={doctorData.patients}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.patientItem}
          onPress={() => setSelectedPatient(selectedPatient?.id === item.id ? null : patientsData[item.id])}
        >
          <Text style={styles.patientName}>{item.name}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Health Score: {item.healthScore}</Text>
        </TouchableOpacity>
      )}
    />
  );

  const renderDoctorInfo = () => (
    <View style={styles.infoSection}>
      <Text style={styles.sectionTitle}>Doctor Information</Text>
      <Text>Name: {doctorData.name}</Text>
      <Text>Specialization: {doctorData.specialization}</Text>
      <Text>Experience: {doctorData.experience}</Text>
      <Text>Education: {doctorData.education}</Text>
      <Text style={styles.subSectionTitle}>Certifications</Text>
      {doctorData.certifications.map((cert, index) => (
        <Text key={index}>• {cert}</Text>
      ))}
      <Text style={styles.subSectionTitle}>Daily Routine</Text>
      {doctorData.routine.map((item, index) => (
        <Text key={index}>{item.time}: {item.activity}</Text>
      ))}
    </View>
  );

  const renderPatientInfo = () => (
    <ScrollView>
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Patient Information</Text>
        <Text>Name: {selectedPatient.name}</Text>
        <Text>Age: {selectedPatient.age}</Text>
        <Text>Gender: {selectedPatient.gender}</Text>
        <Text>Condition: {selectedPatient.condition}</Text>
        <Text>Admission Date: {selectedPatient.admissionDate}</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'info' && styles.activeTab]}
          onPress={() => setActiveTab('info')}
        >
          <Text>Medical Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'analysis' && styles.activeTab]}
          onPress={() => setActiveTab('analysis')}
        >
          <Text>Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'monitoring' && styles.activeTab]}
          onPress={() => setActiveTab('monitoring')}
        >
          <Text>Monitoring</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'info' && renderMedicalInfo()}
      {activeTab === 'analysis' && renderAnalysis()}
      {activeTab === 'monitoring' && renderMonitoring()}
    </ScrollView>
  );

  const renderMedicalInfo = () => (
    <View>
      <View style={styles.infoSection}>
        <Text style={styles.subSectionTitle}>Medications</Text>
        {selectedPatient.medications.map((med, index) => (
          <Text key={index}>{med.name} - {med.dosage}, {med.frequency}</Text>
        ))}
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.subSectionTitle}>Allergies</Text>
        {selectedPatient.allergies.map((allergy, index) => (
          <Text key={index}>{allergy}</Text>
        ))}
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.subSectionTitle}>Lab Reports</Text>
        {selectedPatient.labReports.map((report, index) => (
          <TouchableOpacity
            key={index}
            style={styles.labReportItem}
            onPress={() => setSelectedLabReport(report)}
          >
            <Text>{report.date}: {report.test}</Text>
            <Text>Result: {report.result}</Text>
            <Text>File Type: {report.fileType}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderAnalysis = () => (
    <View>
      <View style={styles.infoSection}>
        <Text style={styles.subSectionTitle}>Sound Analysis</Text>
        <BarChart
          data={{
            labels: ['Coughing', 'Sneezing'],
            datasets: [{
              data: [
                selectedPatient.soundAnalysis.coughingFrequency,
                selectedPatient.soundAnalysis.sneezingFrequency
              ]
            }]
          }}
          width={width - 40}
          height={200}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
        <Text>Nose Running: {selectedPatient.soundAnalysis.noseRunning}</Text>
        <Text>Sleep Quality: {selectedPatient.soundAnalysis.sleepQuality}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.subSectionTitle}>ECG Analysis</Text>
        <LineChart
          data={{
            labels: Array.from({ length: 15 }, (_, i) => (i * 10).toString()),
            datasets: [{
              data: ecgData.length ? ecgData : [0]
            }]
          }}
          width={width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '0',
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
          withDots={false}
          withInnerLines={false}
          withOuterLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          fromZero={true}
          yAxisInterval={6}
        />
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.subSectionTitle}>Nurse Notes</Text>
        <TextInput
          style={styles.notesInput}
          multiline
          value={selectedPatient.nurseNotes}
          onChangeText={(text) => {/* Update notes */}}
        />
      </View>
    </View>
  );

  const renderMonitoring = () => (
    <View>
      <View style={styles.infoSection}>
        <Text style={styles.subSectionTitle}>Vital Signs</Text>
        <LineChart
          data={{
            labels: selectedPatient.vitals.map(v => v.date.slice(-5)),
            datasets: [
              {
                data: selectedPatient.vitals.map(v => v.heartRate),
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                strokeWidth: 2
              },
              {
                data: selectedPatient.vitals.map(v => parseInt(v.bloodPressure.split('/')[0])),
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                strokeWidth: 2
              },
              {
                data: selectedPatient.vitals.map(v => v.temperature),
                color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                strokeWidth: 2
              }
            ]
          }}
          width={width - 40}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
        <Text>Red: Heart Rate, Blue: Systolic BP, Green: Temperature</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.subSectionTitle}>AI Predictive Analysis</Text>
        <PieChart
          data={[
            { name: 'Low Risk', population: 70, color: 'rgba(0, 255, 0, 0.5)', legendFontColor: '#7F7F7F', legendFontSize: 12 },
            { name: 'Medium Risk', population: 20, color: 'rgba(255, 255, 0, 0.5)', legendFontColor: '#7F7F7F', legendFontSize: 12 },
            { name: 'High Risk', population: 10, color: 'rgba(255, 0, 0, 0.5)', legendFontColor: '#7F7F7F', legendFontSize: 12 },
          ]}
          width={width - 40}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius:  16
            }
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
        <Text>AI-based risk assessment for patient condition progression</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.subSectionTitle}>Real-time Monitoring</Text>
        <Text>Breathing Pace: 16 breaths/min</Text>
        <Text>Heart Rate: 72 bpm</Text>
        <Text>Blood Pressure: 120/80 mmHg</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.subSectionTitle}>Video Analysis</Text>
        <TouchableOpacity
          style={styles.videoPlaceholder}
          onPress={() => setShowFullScreenVideo(true)}
        >
          <Text>Tap to view full-screen video feed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLabReportModal = () => (
    <Modal
      visible={!!selectedLabReport}
      animationType="slide"
      onRequestClose={() => setSelectedLabReport(null)}
    >
      <View style={styles.labReportModal}>
        {selectedLabReport && (
          <>
            <Text style={styles.labReportTitle}>{selectedLabReport.test}</Text>
            <Text>Date: {selectedLabReport.date}</Text>
            <Text>Result: {selectedLabReport.result}</Text>
            {selectedLabReport.fileType === 'pdf' && (
              <View style={styles.filePlaceholder}>
                <Text>PDF Viewer Placeholder</Text>
              </View>
            )}
            {selectedLabReport.fileType === 'image' && (
              <Image
                source={{ uri: 'https://example.com/placeholder-image.jpg' }}
                style={styles.labReportImage}
              />
            )}
            {selectedLabReport.fileType === 'xray' && (
              <Image
                source={{ uri: 'https://example.com/placeholder-xray.jpg' }}
                style={styles.labReportImage}
              />
            )}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedLabReport(null)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      {renderDoctorInfo()}
      <Text style={styles.sectionTitle}>Patient List</Text>
      {renderPatientList()}
      {selectedPatient && renderPatientInfo()}
      <Modal
        visible={showFullScreenVideo}
        animationType="slide"
        onRequestClose={() => setShowFullScreenVideo(false)}
      >
        <View style={styles.fullScreenVideo}>
          <Text>Full-screen Video Feed Placeholder</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowFullScreenVideo(false)}
          >
            <Text>Back to Doctor Profile</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {renderLabReportModal()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  infoSection: {
    marginBottom: 15,
  },
  patientItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tab: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  notesInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    padding: 5,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  fullScreenVideo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  labReportItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  labReportModal: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  labReportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filePlaceholder: {
    width: 300,
    height: 400,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  labReportImage: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});