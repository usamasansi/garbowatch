// Report.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapViewComponent from './MapViewComponent';

const Report = () => {
  const [showMap, setShowMap] = useState(false);

  const handleShowMap = () => {
    // Toggle the visibility of the MapViewComponent
    setShowMap(!showMap);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Your other components go here */}
      <TouchableOpacity onPress={handleShowMap}>
        <Text>Show/Hide Map</Text>
      </TouchableOpacity>

      {/* Render the MapViewComponent conditionally based on the state */}
      {showMap && (
        <MapViewComponent
          latitude={12.841550}
          longitude={77.667060}
        />
      )}
    </View>
  );
};

export default Report;