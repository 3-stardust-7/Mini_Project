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

export default function AddDonor({ navigation }) {
  const { colors } = useAppTheme();

  const [bloodGroup, setBloodGroup] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [cmvStatus, setCmvStatus] = useState('');
  const [antigenDiff, setAntigenDiff] = useState('');
  const [alleleDiff, setAlleleDiff] = useState('');
  const [cd34Dose, setCd34Dose] = useState('');
  const [cd3Dose, setCd3Dose] = useState('');
  const [stemCellSource, setStemCellSource] = useState('');

  const handleSubmit = async () => {
  try {
    const response = await fetch(
      'https://uhpinfogzptzsvulhpvr.supabase.co/rest/v1/Donor',
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
          CMVStatus: cmvStatus,
          AntigenDifferences: parseInt(antigenDiff),
          AlleleDifferences: parseInt(alleleDiff),
          CD34Dose: parseFloat(cd34Dose),
          CD3Dose: parseFloat(cd3Dose),
          StemCellSource: stemCellSource,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log(errorText);
      alert('Insert failed');
      return;
    }

    Alert.alert('Success', 'Donor added successfully!', [
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
            Add Donor
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Enter donor details below
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
            placeholder="CMV Status (present/absent)"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setCmvStatus}
          />

          <TextInput
            placeholder="Antigen Differences (0-3)"
            keyboardType="numeric"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setAntigenDiff}
          />

          <TextInput
            placeholder="Allele Differences (0-4)"
            keyboardType="numeric"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setAlleleDiff}
          />

          <TextInput
            placeholder="CD34+ Cell Dose (×10^6/kg)"
            keyboardType="numeric"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setCd34Dose}
          />

          <TextInput
            placeholder="CD3+ Cell Dose (×10^8/kg)"
            keyboardType="numeric"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setCd3Dose}
          />

          <TextInput
            placeholder="Stem Cell Source (peripheral_blood/bone_marrow)"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            onChangeText={setStemCellSource}
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
            style={[styles.button, { backgroundColor: colors.success }]}
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