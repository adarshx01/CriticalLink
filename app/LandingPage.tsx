import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const AlertCard = ({ title, message, type }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = type === 'urgent' ? '#FF6B6B' : '#4ECDC4';

  return (
    <Animated.View
      style={[
        styles.alertCard,
        { backgroundColor },
        { transform: [{ scale: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] }) }] },
      ]}
    >
      <Text style={styles.alertTitle}>{title}</Text>
      <Text style={styles.alertMessage}>{message}</Text>
    </Animated.View>
  );
};

const StatCard = ({ title, value, icon }) => (
  <View style={styles.statCard}>
    <Icon name={icon} size={30} color="#45B7D1" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

export default function LandinPage() {
  const [occupancyData, setOccupancyData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [65, 70, 68, 72, 75, 71, 69] }],
  });

  useEffect(() => {
    // Simulating real-time data updates
    const interval = setInterval(() => {
      setOccupancyData(prevData => ({
        ...prevData,
        datasets: [{ data: prevData.datasets[0].data.map(val => val + Math.random() * 5 - 2.5) }],
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hospital Dashboard</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.alertContainer}>
        <AlertCard
          title="Emergency Alert"
          message="Mass casualty incident reported. All staff on standby."
          type="urgent"
        />
        <AlertCard
          title="System Update"
          message="New COVID-19 protocols added. Please review."
          type="info"
        />
      </View>

      <View style={styles.statsContainer}>
        <StatCard title="Patients" value="237" icon="people" />
        <StatCard title="Doctors" value="42" icon="medical" />
        <StatCard title="Nurses" value="98" icon="heart" />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Hospital Occupancy</Text>
        <LineChart
          data={occupancyData}
          width={width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(69, 183, 209, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Icon name="add-circle" size={30} color="#45B7D1" />
            <Text style={styles.quickActionText}>New Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Icon name="calendar" size={30} color="#45B7D1" />
            <Text style={styles.quickActionText}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Icon name="bed" size={30} color="#45B7D1" />
            <Text style={styles.quickActionText}>Bed Management</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Icon name="stats-chart" size={30} color="#45B7D1" />
            <Text style={styles.quickActionText}>Reports</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#45B7D1',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  notificationButton: {
    padding: 10,
  },
  alertContainer: {
    padding: 20,
  },
  alertCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  alertMessage: {
    fontSize: 14,
    color: '#FFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  chartContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  quickActionsContainer: {
    padding: 20,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    marginTop: 10,
    color: '#333',
    fontWeight: '600',
  },
});