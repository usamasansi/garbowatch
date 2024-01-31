// MapViewComponent.js
import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapViewComponent = ({ latitude, longitude }) => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: latitude || 37.78825, // Default to a specific location if not provided
          longitude: longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {latitude && longitude && (
          <Marker coordinate={{ latitude, longitude }} title="Location" />
        )}
      </MapView>
    </View>
  );
};

export default MapViewComponent;