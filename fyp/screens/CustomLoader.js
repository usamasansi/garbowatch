import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import ProgressBar from 'react-native-progress/Bar'; 

const CustomLoader = ({ children, isLoading }) => {
  const [progressValue, setProgressValue] = useState(0); 

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20; // Adjust the increment as needed for desired speed
      if (progress >= 1) {
        clearInterval(interval); // Stop the interval when progress reaches 100%
      }
      setProgressValue(progress); // Set the progress value
    }, 50); // Change the interval duration for slower/faster filling
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <Image source={require('../assests/images/garbowatch.png')} style={styles.image} />
          <ProgressBar progress={progressValue} width={400} height={10} color="#6EA48C" />
        </>
      ) : (
        children
      )}
    </View>
  );
};

CustomLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '40%',
    marginTop: 20,
  },
});

export default CustomLoader;
