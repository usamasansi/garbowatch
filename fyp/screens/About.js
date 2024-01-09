import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Garbage Deduction</Text>

        <Text style={styles.description}>
          Garbage Deduction is an innovative app designed to revolutionize waste management
          practices. Our mission is to contribute to a cleaner environment by facilitating
          efficient garbage disposal and encouraging sustainable waste reduction strategies.
        </Text>

        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.description}>
          We envision a world where waste is minimized, recycling is maximized, and every individual
          takes responsibility for reducing their ecological footprint.
        </Text>

        <Text style={styles.sectionTitle}>Key Features</Text>
        <Text style={styles.description}>
          - Real-time garbage reporting {'\n'}
          - Community-driven initiatives {'\n'}
          - Educational resources on waste management {'\n'}
          - User-friendly interface for seamless user experience {'\n'}
          - And much more!
        </Text>

        <Text style={styles.sectionTitle}>Join us in the Movement</Text>
        <Text style={styles.description}>
          Garbage Deduction aims to create a community-driven platform where users can collaborate,
          share ideas, and work together towards a cleaner and greener future.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'grey'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color:'grey'
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color:'grey'
  },
});

export default About;