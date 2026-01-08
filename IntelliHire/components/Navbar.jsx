// components/Navbar.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Navbar = ({ title }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();
  const handleOption = (option) => {
    setDropdownVisible(false);
    switch (option) {
      case 'Profile':
        navigation.navigate('profile');
        break;
      case 'History':
        navigation.navigate('history');
        break;
      case 'Logout':
        navigation.replace('Login'); // or clear token, etc.
        break;
    }
  };

  return (
    <View style={styles.navbar}>
      <Image source={require('../assets/Logo_mini.png')} style={styles.logo} />

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={() => setDropdownVisible(true)}>
        <Ionicons name="person-circle-outline" size={28} color="#111" />
      </TouchableOpacity>

      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdown}>
            {['Profile', 'History', 'Logout'].map((item) => (
              <TouchableOpacity key={item} style={styles.dropdownItem} onPress={() => handleOption(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    // height: 60,
    // backgroundColor: '#fff',
    // paddingHorizontal: 15,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // elevation: 4, // for Android shadow
    // shadowColor: '#000', // for iOS shadow
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    zIndex: 10, // ensure it stays on top if needed
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    width: 150,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
});

export default Navbar;
