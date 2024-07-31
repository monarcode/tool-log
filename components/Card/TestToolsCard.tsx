import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import ToolsCard from './ToolsCard';

const ToolManagementScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <ToolsCard
        name="Electric Drill"
        timestamp="02 Jan, 2024 02:56pm"
        status="Unavailable"
        image={require('../../assets/images/drill.jpg')}
      />
      <ToolsCard
        name="Shears"
        timestamp="02 Jan, 2024 02:56pm"
        status="Available"
        image={require('../../assets/images/shear.jpg')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
});

export default ToolManagementScreen;
