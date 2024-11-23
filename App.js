import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  FlatList,
  Animated,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { towns } from './data/towns';
import WeatherDisplay from './components/WeatherDisplay';

const API_KEY = 'your_aemet_api_key';
const BASE_URL = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/';

const { width } = Dimensions.get('window');

export default function App() {
  const [province, setProvince] = useState('Bizkaia'); // Default province
  const [townCode, setTownCode] = useState('48020'); // Bilbao's code
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showProvinceModal, setShowProvinceModal] = useState(false);
  const [showTownModal, setShowTownModal] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const provinces = [...new Set(towns.map(town => town.province))];
  const townOptions = towns.filter(town => town.province === province);

  const otherCities = townOptions
    .filter(town => town.code !== townCode)
    .slice(0, 5); // Show 5 other cities from the same province

  useEffect(() => {
    if (townCode) {
      fetchWeatherData(townCode);
    }
  }, [townCode]);

  // Fetch weather for default city on initial load
  useEffect(() => {
    fetchWeatherData('48020'); // Bilbao's code
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [weatherData]);

  const fetchWeatherData = async (code) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}${code}?api_key=${API_KEY}`);
      const dataResponse = await axios.get(response.data.datos);
      setWeatherData(dataResponse.data[0]);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    setLoading(false);
  };

  const renderItem = ({ item, onSelect }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => onSelect(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderOtherCity = (city) => (
    <TouchableOpacity
      key={city.code}
      style={styles.otherCityCard}
      onPress={() => setTownCode(city.code)}
    >
      <Text style={styles.otherCityName}>{city.name}</Text>
      <Text style={styles.otherCityProvince}>{province}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>CAPV Weather</Text>
        <Text style={styles.subtitle}>Your Local Forecast</Text>
      </View>

      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowProvinceModal(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.pickerButtonText}>{province || "Select Province"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.pickerButton, !province && styles.disabledButton]}
          onPress={() => province && setShowTownModal(true)}
          disabled={!province}
          activeOpacity={0.8}
        >
          <Text style={styles.pickerButtonText}>
            {townCode ? towns.find(t => t.code === townCode)?.name : "Select Town"}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading forecast...</Text>
        </View>
      ) : weatherData ? (
        <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={[{ opacity: fadeAnim }]}>
            <WeatherDisplay data={weatherData} />

            <View style={styles.otherCitiesSection}>
              <Text style={styles.otherCitiesTitle}>Other Cities in {province}</Text>
              <View style={styles.otherCitiesContainer}>
                {otherCities.map(renderOtherCity)}
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      ) : null}

      <Modal
        visible={showProvinceModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowProvinceModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Province</Text>
            <FlatList
              data={provinces}
              renderItem={({ item }) => renderItem({
                item,
                onSelect: (selectedProvince) => {
                  setProvince(selectedProvince);
                  setTownCode(townOptions[0]?.code || '');
                  setShowProvinceModal(false);
                }
              })}
              keyExtractor={item => item}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={showTownModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTownModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Town</Text>
            <FlatList
              data={townOptions}
              renderItem={({ item }) => renderItem({
                item: item.name,
                onSelect: (selectedTown) => {
                  const selectedTownData = townOptions.find(t => t.name === selectedTown);
                  setTownCode(selectedTownData.code);
                  setShowTownModal(false);
                }
              })}
              keyExtractor={item => item.code}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#6366f1',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  selectionContainer: {
    padding: 20,
    gap: 12,
  },
  pickerButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6366f1',
  },
  mainContent: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1f2937',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalItemText: {
    fontSize: 16,
    color: '#4b5563',
  },
  otherCitiesSection: {
    padding: 20,
    paddingTop: 0,
  },
  otherCitiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  otherCitiesContainer: {
    gap: 12,
  },
  otherCityCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  otherCityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  otherCityProvince: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
});