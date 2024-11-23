import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const CARD_MARGIN = 10;

const WeatherDisplay = ({ data }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.townName}>{data.nombre}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        snapToInterval={CARD_WIDTH + (CARD_MARGIN * 2)}
        decelerationRate="fast"
      >
        {data.prediccion.dia.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{formatDate(day.fecha)}</Text>
              {index === 0 && <Text style={styles.todayBadge}>Today</Text>}
            </View>

            <View style={styles.weatherDetailsContainer}>
              <View style={styles.temperatureContainer}>
                <Text style={styles.temperatureLabel}>Temperature</Text>
                <Text style={styles.temperatureValue}>
                  <Text style={styles.maxTemp}>{day.temperatura.maxima}°</Text>
                  {' / '}
                  <Text style={styles.minTemp}>{day.temperatura.minima}°</Text>
                </Text>
              </View>

              <View style={styles.conditionContainer}>
                <Text style={styles.conditionLabel}>Condition</Text>
                <Text style={styles.conditionValue}>
                  {day.estadoCielo[0]?.descripcion || 'N/A'}
                </Text>
              </View>

              <View style={styles.rainContainer}>
                <Text style={styles.rainLabel}>Rain Chance</Text>
                <Text style={styles.rainValue}>
                  {Math.max(...day.probPrecipitacion.map(p => p.value))}%
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  townName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1f2937',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  dayContainer: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: CARD_MARGIN,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  date: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  todayBadge: {
    backgroundColor: '#6366f1',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  weatherDetailsContainer: {
    gap: 15,
  },
  temperatureContainer: {
    marginBottom: 5,
  },
  temperatureLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  temperatureValue: {
    fontSize: 24,
    fontWeight: '600',
  },
  maxTemp: {
    color: '#ef4444',
  },
  minTemp: {
    color: '#3b82f6',
  },
  conditionContainer: {
    marginBottom: 5,
  },
  conditionLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  conditionValue: {
    fontSize: 16,
    color: '#1f2937',
  },
  rainContainer: {
    marginBottom: 5,
  },
  rainLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  rainValue: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
  },
});

export default WeatherDisplay;