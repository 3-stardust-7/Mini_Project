import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../Theme/ThemeContext';

export default function AddPatient({ navigation }) {
  const { colors } = useAppTheme();

  const [bloodGroup, setBloodGroup] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [bodyMass, setBodyMass] = useState('');
  const [rhFactor, setRhFactor] = useState('');
  const [cmvStatus, setCmvStatus] = useState('');
  const [diseaseType, setDiseaseType] = useState('');
  const [diseaseGroup, setDiseaseGroup] = useState('');
  const [riskGroup, setRiskGroup] = useState('');
  const [postRelapse, setPostRelapse] = useState('');

 const handleSubmit = async () => {
  try {
    const response = await fetch(
      'https://uhpinfogzptzsvulhpvr.supabase.co/rest/v1/Patient',
      {
        method: 'POST',
        headers: {
          apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocGluZm9nenB0enN2dWxocHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjQyNjEsImV4cCI6MjA2OTgwMDI2MX0.PrVCuwG314G4x3YW-b3p1-xHDLjcLyLbxvh4fMt_UvE',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocGluZm9nenB0enN2dWxocHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjQyNjEsImV4cCI6MjA2OTgwMDI2MX0.PrVCuwG314G4x3YW-b3p1-xHDLjcLyLbxvh4fMt_UvE',
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          Name: name,
          Age: parseInt(age),
          Gender: gender,
          BloodGroup: bloodGroup,
          Contact: contact,
          BodyMass: parseFloat(bodyMass),
          RhFactor: rhFactor,
          CMVStatus: cmvStatus,
          DiseaseType: diseaseType,
          DiseaseGroup: diseaseGroup,
          RiskGroup: riskGroup,
          PostRelapseTransplant: postRelapse.toLowerCase() === 'yes',
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log(errorText);
      alert('Insert failed');
      return;
    }

     Alert.alert('Success', 'Patient added successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('MainTabs'),
      },
    ]);
  } catch (error) {
    console.log(error);
    alert('Something went wrong');
  }
};

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Add Patient
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Enter patient details below
          </Text>
        </View>

        {/* Form Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <TextInput
            placeholder="Blood Group"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            onChangeText={setBloodGroup}
          />

          <TextInput
            placeholder="Name"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Age"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            onChangeText={setAge}
          />

          <TextInput
            placeholder="Gender"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            onChangeText={setGender}
          />

          <TextInput
            placeholder="Body Mass (kg)"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setBodyMass}
          />

          <TextInput
            placeholder="Rh Factor (plus/minus)"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setRhFactor}
          />

          <TextInput
            placeholder="CMV Status (present/absent)"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setCmvStatus}
          />

          <TextInput
            placeholder="Disease Type"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setDiseaseType}
          />

          <TextInput
            placeholder="Disease Group (malignant/nonmalignant)"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setDiseaseGroup}
          />

          <TextInput
            placeholder="Risk Group (high/low)"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setRiskGroup}
          />

          <TextInput
            placeholder="Post Relapse Transplant (yes/no)"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setPostRelapse}
          />

          <TextInput
            placeholder="Contact"
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            onChangeText={setContact}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  button: {
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});