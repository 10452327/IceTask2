import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
// Define the type for the stack parameters
type RootStackParamList = {
  Screen1: undefined;
  Screen2: { studentNumber: string; name: string; surname: string };
};

// Create the Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'Screen1'>;

type Screen1Props = {
  navigation: Screen1NavigationProp;
};

const Screen1: React.FC<Screen1Props> = ({ navigation }) => {
  const [studentNumber, setStudentNumber] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleSubmit = () => {
    navigation.navigate('Screen2', { studentNumber, name, surname });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Student Number"
        value={studentNumber}
        onChangeText={setStudentNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

type Screen2RouteProp = RouteProp<RootStackParamList, 'Screen2'>;

type Screen2Props = {
  route: Screen2RouteProp;
};

const Screen2: React.FC<Screen2Props> = ({ route }) => {
  const { studentNumber, name, surname } = route.params;

  return (
    <View style={styles.screen2Container}>
      <Text style={styles.welcomeText}>Welcome, {name} {surname}!</Text>
      <Text style={styles.studentNumberText}>Student Number: {studentNumber}</Text>
    </View>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ADD8E6',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  screen2Container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#90EE90',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  studentNumberText: {
    fontSize: 18,
    textAlign: 'center',
  },
});


