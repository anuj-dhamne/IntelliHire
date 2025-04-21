import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileCard = ({ user }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png' }} // Hardcoded profile picture
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>@{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  username: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#4B5563',
  },
});

export default ProfileCard;
