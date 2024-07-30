import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface DropdownProps {
  options: string[];
  onSelect: (item: string) => void;
  placeholder: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, placeholder }) => {
  const { styles } = useStyles(_styles);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownInput} onPress={toggleDropdown}>
        <Text style={{ color: selectedItem ? 'black' : '#999' }}>
          {selectedItem || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={24} color={selectedItem ? 'black' : '#999'} />
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.dropdownList}>
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dropdownItem, item === selectedItem && styles.selectedItem]}
              onPress={() => handleSelect(item)}>
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  dropdownContainer: {
    position: 'relative',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.gray,
  },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#999',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: '60%',
    backgroundColor: theme.colors.white,
    zIndex: 1000,
    borderRadius: 8,
    marginTop: 4,
    elevation: 3,
  },
  dropdownItem: {
    padding: 12,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  selectedItem: {
    backgroundColor: '#f0f0f0',
  },
}));
