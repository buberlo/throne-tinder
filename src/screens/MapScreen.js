import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { MapView, Marker } from 'react-native-maps';
import { useStalls } from '../context/StallContext';
import { sortNearbyStalls, getMapRegion } from '../utils/geo';
import MapPin from '../components/MapPin';
import { colors, spacing, typography } from '../theme';

const FALLBACK_CENTER = { latitude: 37.7749, longitude: -122.4194 };

export default function MapScreen() {
  const { stalls, reservations } = useStalls();
  const [selectedId, setSelectedId] = useState(null);

  const center = useMemo(
    () => stalls?.[0]?.coordinates ?? FALLBACK_CENTER,
    [stalls]
  );
  const nearbyStalls = useMemo(
    () => sortNearbyStalls(stalls ?? [], center),
    [stalls, center]
  );
  const region = useMemo(
    () => getMapRegion(nearbyStalls, center),
    [nearbyStalls, center]
  );
  const reservedIds = useMemo(
    () =>
      new Set(
        (reservations ?? []).map((item) => item.stallId ?? item.id)
      ),
    [reservations]
  );

  const handlePinPress = (stall) => {
    setSelectedId(stall.id);
    Alert.alert(
      stall.name,
      `${stall.mood} · Cleanliness ${stall.cleanlinessScore}/10`,
      [{ text: 'Nice' }]
    );
  };

  if (!stalls?.length) {
    return (
      <View style={styles.empty}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.emptyText}>Scanning nearby stalls…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region} showsUserLocation>
        {nearbyStalls.map((stall) => (
          <Marker
            key={stall.id}
            coordinate={stall.coordinates}
            onPress={() => handlePinPress(stall)}
          >
            <MapPin
              stall={stall}
              reserved={reservedIds.has(stall.id)}
              selected={selectedId === stall.id}
            />
          </Marker>
        ))}
      </MapView>

      <View style={styles.legend}>
        <LegendDot