import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Menu, IconButton } from 'react-native-paper';

interface ToolsCardProps {
  name: string;
  timestamp: string;
  status: 'Available' | 'Unavailable';
  image: any;
}

const ToolsCard: React.FC<ToolsCardProps> = ({ name, timestamp, status, image }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.imageBg}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
        <View
          style={[
            styles.statusContainer,
            status === 'Available' ? styles.available : styles.unavailable,
          ]}>
          <View
            style={[
              styles.statusDot,
              status === 'Available' ? styles.availableDot : styles.unavailableDot,
            ]}
          />
          <Text style={styles.status}>{status}</Text>
        </View>
      </View>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <IconButton
            icon="dots-vertical"
            size={20}
            onPress={() => setMenuVisible(true)}
            style={styles.iconButton}
          />
        }
        contentStyle={styles.menuContent}>
        <View style={styles.menuContentWrapper}>
          <Text style={styles.menuHeading}>Status</Text>
          <View style={[styles.menuItem, styles.available]}>
            <View style={[styles.menuItemDot, styles.availableDot]} />
            <Text style={styles.menuItemText}>Available</Text>
          </View>
          <View style={[styles.menuItem, styles.unavailable]}>
            <View style={[styles.menuItemDot, styles.unavailableDot]} />
            <Text style={styles.menuItemText}>Unavailable</Text>
          </View>
        </View>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
  },
  imageBg: {
    backgroundColor: '#F7F7F7',
    width: 73,
    height: 73,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    elevation: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
  },
  timestamp: {
    fontSize: 14,
    color: '#555',
  },
  statusContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    height: 25,
    borderRadius: 15,
    justifyContent: 'space-around',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  availableDot: {
    backgroundColor: '#6DC347',
  },
  unavailableDot: {
    backgroundColor: '#DC2626',
  },
  status: {
    fontSize: 13,
  },
  available: {
    backgroundColor: '#E1F3D8',
    color: '#007700',
  },
  unavailable: {
    backgroundColor: '#f7e0e0',
    color: '#770000',
  },
  menuContent: {
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 10,
    padding: 10,
  },
  menuContentWrapper: {
    padding: 10,
  },
  menuHeading: {
    fontSize: 16,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'space-around',
    marginVertical: 5,
    width: 105,
    height: 25,
  },
  menuItemDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  menuItemText: {
    fontSize: 14,
  },
  iconButton: {
    backgroundColor: '#dddddd',
    borderRadius: 0,
  },
});

export default ToolsCard;
