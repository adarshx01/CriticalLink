import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import DoctorProfile from './DoctorProfile';
import MedicineScreen from './MedicineScreen';
// Placeholder components for other tabs
const HomeScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Home Screen</Text></View>;
const DoctorsScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Doctors Screen</Text></View>;
// const MedicineScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Medicine Screen</Text></View>;

// Patient List Screen (unchanged)
const PatientListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [patients, setPatients] = React.useState([
    { id: '1', name: 'John Doe', wardNum: '101', medicalReason: 'Fever' },
    { id: '2', name: 'Jane Smith', wardNum: '102', medicalReason: 'Fracture' },
    { id: '3', name: 'Bob Johnson', wardNum: '103', medicalReason: 'Surgery' },
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.includes(searchQuery) ||
    patient.wardNum.includes(searchQuery)
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 }}
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder="Search patients..."
      />
      <FlatList
        data={filteredPatients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PatientProfile', { patient: item })}>
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text>Name: {item.name}</Text>
              <Text>ID: {item.id}</Text>
              <Text>Ward: {item.wardNum}</Text>
              <Text>Reason: {item.medicalReason}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Patient Profile Screen
const PatientProfileScreen = ({ route }) => {
  const { patient } = route.params;

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Patient Details</Text>
        <Text>Name: {patient.name}</Text>
        <Text>ID: {patient.id}</Text>
        <Text>Ward: {patient.wardNum}</Text>
        <Text>Medical Reason: {patient.medicalReason}</Text>
      </View>
      
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Live Video</Text>
        <View style={{ height: 200, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
          <Text>Live Video Placeholder</Text>
        </View>
      </View>
      
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Real-time Monitoring</Text>
        <View style={{ height: 200, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
          <Text>Real-time Monitoring Data Placeholder</Text>
        </View>
      </View>
    </ScrollView>
  );
};

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const PatientStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="PatientList" component={PatientListScreen} options={{ title: 'Patients' }} />
//     <Stack.Screen name="PatientProfile" component={PatientProfileScreen} options={{ title: 'Patient Profile' }} />
//   </Stack.Navigator>
// );

// New LiveScreen component
const LiveScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([
    { id: '1', name: 'John Doe', condition: 'Step-down', risk: 'Low' },
    { id: '2', name: 'Jane Smith', condition: 'ICU', risk: 'High' },
    { id: '3', name: 'Bob Johnson', condition: 'Regular', risk: 'Medium' },
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder="Search patients..."
      />
      <TouchableOpacity style={styles.allFeedsButton}>
        <Text style={styles.allFeedsButtonText}>All Feeds</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredPatients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.patientItem}
            onPress={() => navigation.navigate('PatientLiveView', { patientId: item.id })}
          >
            <Text style={styles.patientName}>{item.name}</Text>
            <Text>Condition: {item.condition}</Text>
            <Text>Risk: {item.risk}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// New PatientLiveView component
const PatientLiveView = ({ route }) => {
  const { patientId } = route.params;
  const [activeTab, setActiveTab] = useState('vitals');

  const patientData = {
    id: 1,
    name: "John Doe",
    age: 45,
    condition: "Step-down",
    risk: "Low",
    vitalSigns: [
      { time: '00:00', heartRate: 72, respRate: 16, oxygenSat: 98 },
      { time: '04:00', heartRate: 75, respRate: 18, oxygenSat: 97 },
      { time: '08:00', heartRate: 68, respRate: 15, oxygenSat: 99 },
      { time: '12:00', heartRate: 70, respRate: 17, oxygenSat: 98 },
      { time: '16:00', heartRate: 73, respRate: 16, oxygenSat: 97 },
      { time: '20:00', heartRate: 71, respRate: 15, oxygenSat: 98 },
    ],
    sleepPattern: [
      { date: '2023-09-15', deepSleep: 3, lightSleep: 4, awake: 1 },
      { date: '2023-09-16', deepSleep: 4, lightSleep: 3, awake: 1 },
      { date: '2023-09-17', deepSleep: 3.5, lightSleep: 3.5, awake: 1 },
      { date: '2023-09-18', deepSleep: 4, lightSleep: 4, awake: 0.5 },
      { date: '2023-09-19', deepSleep: 3, lightSleep: 4, awake: 1.5 },
    ],
    intakeLog: [
      { time: '08:00', type: 'Water', amount: '250ml' },
      { time: '09:30', type: 'Food', amount: 'Breakfast' },
      { time: '12:00', type: 'Water', amount: '300ml' },
      { time: '13:00', type: 'Food', amount: 'Lunch' },
      { time: '16:00', type: 'Water', amount: '200ml' },
      { time: '18:30', type: 'Food', amount: 'Dinner' },
    ],
    aiPredictions: [
      { condition: 'Risk of Dehydration', probability: 0.15 },
      { condition: 'Sleep Apnea', probability: 0.08 },
      { condition: 'Potential Infection', probability: 0.03 },
    ],
  };

  const renderVitalsChart = () => (
    <LineChart
      data={{
        labels: patientData.vitalSigns.map(v => v.time),
        datasets: [
          {
            data: patientData.vitalSigns.map(v => v.heartRate),
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            strokeWidth: 2
          },
          {
            data: patientData.vitalSigns.map(v => v.respRate),
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            strokeWidth: 2
          },
          {
            data: patientData.vitalSigns.map(v => v.oxygenSat),
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
            strokeWidth: 2
          }
        ]
      }}
      width={300}
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
  );

  const renderSleepChart = () => (
    <LineChart
      data={{
        labels: patientData.sleepPattern.map(s => s.date.slice(-5)),
        datasets: [
          {
            data: patientData.sleepPattern.map(s => s.deepSleep),
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            strokeWidth: 2
          },
          {
            data: patientData.sleepPattern.map(s => s.lightSleep),
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
            strokeWidth: 2
          },
          {
            data: patientData.sleepPattern.map(s => s.awake),
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            strokeWidth: 2
          }
        ]
      }}
      width={300}
      height={200}
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 1,
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
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{patientData.name}</Text>
        <Text>Age: {patientData.age}</Text>
        <Text>Condition: {patientData.condition}</Text>
        <Text>Risk: {patientData.risk}</Text>
      </View>
      
      <View style={styles.liveView}>
        <Text style={styles.sectionTitle}>Live View</Text>
        {/* <View style={styles.liveViewPlaceholder}> */}
        <Video
          source={{ uri: 'http://127.0.0.1:5000/video_feedy' }}
          style={styles.video}
          resizeMode="cover"
          repeat={true}
          onError={(error) => console.error('Video Error:', error)}
        />
      {/* </View> */}
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'vitals' && styles.activeTab]}
          onPress={() => setActiveTab('vitals')}
        >
          <Text>Vital Signs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sleep' && styles.activeTab]}
          onPress={() => setActiveTab('sleep')}
        >
          <Text>Sleep Pattern</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'intake' && styles.activeTab]}
          onPress={() => setActiveTab('intake')}
        >
          <Text>Intake Log</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'predictions' && styles.activeTab]}
          onPress={() => setActiveTab('predictions')}
        >
          <Text>AI Predictions</Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'vitals' && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Vital Signs</Text>
          {renderVitalsChart()}
        </View>
      )}
      
      {activeTab === 'sleep' && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Sleep Pattern</Text>
          {renderSleepChart()}
        </View>
      )}
      
      {activeTab === 'intake' && (
        <View style={styles.logContainer}>
          <Text style={styles.chartTitle}>Intake Log</Text>
          {patientData.intakeLog.map((item, index) => (
            <Text key={index}>{`${item.time}: ${item.type} - ${item.amount}`}</Text>
          ))}
        </View>
      )}
      
      {activeTab === 'predictions' && (
        <View style={styles.predictionsContainer}>
          <Text style={styles.chartTitle}>AI Predictions</Text>
          {patientData.aiPredictions.map((prediction, index) => (
            <Text key={index}>{`${prediction.condition}: ${(prediction.probability * 100).toFixed(2)}%`}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PatientStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="PatientList" component={PatientListScreen} options={{ title: 'Patients' }} />
    <Stack.Screen name="PatientProfile" component={PatientProfileScreen} options={{ title: 'Patient Profile' }} />
  </Stack.Navigator>
);

const LiveStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="LiveScreen" component={LiveScreen} options={{ title: 'Live Monitoring' }} />
    <Stack.Screen name="PatientLiveView" component={PatientLiveView} options={{ title: 'Patient Live View' }} />
  </Stack.Navigator>
);

export default function App() {
  return (
 
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Patients" 
          component={PatientStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Live" 
          component={LiveStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pulse" color={color} size={size} />
            ),
          }}
        />
<Tab.Screen 
          name="Doctor" 
          component={DoctorProfile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="medical" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Medicine" 
          component={MedicineScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="medkit" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>

  );
}

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
    padding: 5,
  },
  allFeedsButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  allFeedsButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  patientItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientInfo: {
    marginBottom: 20,
  },
  liveView: {
    marginBottom: 20,
  },
  liveViewPlaceholder: {
    height: 200,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
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
  video: {
    flex: 1,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logContainer: {
    marginBottom: 20,
  },
  predictionsContainer: {
    marginBottom: 20,
  },
});