import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,           
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../src/Theme/ThemeContext';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SymptomSelector from '../components/Multiselect';

const API_URL = 'https://uhpinfogzptzsvulhpvr.supabase.co/rest/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocGluZm9nenB0enN2dWxocHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjQyNjEsImV4cCI6MjA2OTgwMDI2MX0.PrVCuwG314G4x3YW-b3p1-xHDLjcLyLbxvh4fMt_UvE';

const HEADERS = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

const FIELD_META = {
  Name:       { icon: '👤', label: 'FULL NAME' },
  Age:        { icon: '🎂', label: 'AGE' },
  Gender:     { icon: '⚧',  label: 'GENDER' },
  BloodGroup: { icon: '🩸', label: 'BLOOD GROUP' },
  Contact:    { icon: '📞', label: 'CONTACT' },
};

const DetailCard = ({ icon, label, value, colors, delay }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 350, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.detailCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={[styles.iconBadge, { backgroundColor: colors.primary + '18' }]}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <View style={styles.detailTextGroup}>
        <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[styles.detailValue, { color: colors.text }]}>{value || '—'}</Text>
      </View>
    </Animated.View>
  );
};

const SectionLabel = ({ text, colors }) => (
  <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>{text}</Text>
);


export default function DiseasePredict() {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const patient = useSelector(state => state.patient.selectedPatient);

  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-12)).current;


  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const [loading, setLoading] = useState(false);

  const validateFields = () => {
  if (selectedSymptoms.length === 0)
    return "Please select at least one symptom";
  return null;
};

  const handleSubmit = async () => {
    const error = validateFields();
    if (error) {
      Alert.alert('Incomplete Form', error);
      return;
    }

    setLoading(true);
    try {
      const diseaseRes = await fetch(`${API_URL}/Patient-Disease`, {
        method: 'POST',
        headers: { ...HEADERS, Prefer: 'return=minimal' },
        body: JSON.stringify({
          Name: patient.Name,  
          Patient_id: patient.Patient_id,          
          Symptoms: selectedSymptoms
        }),
      });

      if (!diseaseRes.ok) {
        const err = await diseaseRes.text();
        console.error('Disease insert error:', err);
        Alert.alert('Error', 'Failed to save symptom data.');
        return;
      }

      Alert.alert('Success', 'Symptoms saved!', [
        { text: 'OK', onPress: () => navigation.navigate('MainTabs') },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!patient) {
    return (
      <SafeAreaView style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>No Patient Selected</Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
          Please go back and select a patient first.
        </Text>
        <TouchableOpacity
          style={[styles.emptyBackBtn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.emptyBackBtnText}>← Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const initials = patient.Name
    ? patient.Name.trim().split(/\s+/).map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  const fields = Object.entries(FIELD_META).map(([key, meta], i) => ({
    ...meta, value: patient[key], key, delay: 120 + i * 65,
  }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>

      {/* Top Navigation Bar */}
      <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backArrow, { color: colors.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: colors.text }]}>Patient Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Section Label */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          PERSONAL DETAILS
        </Text>

        {/* Detail Cards */}
        <View style={styles.cardsWrap}>
          {fields.map(f => (
            <DetailCard
              key={f.key}
              icon={f.icon}
              label={f.label}
              value={f.value}
              colors={colors}
              delay={f.delay}
            />
          ))}
        </View>

        {/* Symptoms */}
        <SectionLabel text="SELECTED SYMPTOMS" colors={colors} />

        <SymptomSelector
          selected={selectedSymptoms}
          setSelected={setSelectedSymptoms}
        />

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitBtn, { backgroundColor: loading ? colors.primary + '88' : colors.primary }]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.submitText}>{loading ? 'Saving...' : 'Save Symptoms'}</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 36 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 28 },
  emptyBackBtn: { paddingHorizontal: 28, paddingVertical: 13, borderRadius: 50 },
  emptyBackBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 28, lineHeight: 34, marginTop: -2, fontWeight: '300' },
  topBarTitle: { fontSize: 16, fontWeight: '600', letterSpacing: 0.3 },

  scrollContent: { paddingBottom: 48 },

  heroSection: {
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  avatarInitials: { fontSize: 34, fontWeight: '700' },
  heroName: { fontSize: 23, fontWeight: '700', marginBottom: 10, letterSpacing: 0.2 },
  heroPill: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 24 },
  heroPillText: { fontSize: 13, fontWeight: '600', letterSpacing: 0.4 },

  sectionLabel: {
    fontSize: 11, fontWeight: '700', letterSpacing: 1.3,
    marginHorizontal: 20, marginBottom: 15, marginTop: 24,
  },

  cardsWrap: { paddingHorizontal: 16, gap: 10, marginBottom: 24 },
  detailCard: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth, borderRadius: 16,
    padding: 14, gap: 14,
  },
  iconBadge: { width: 46, height: 46, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 21 },
  detailTextGroup: { flex: 1 },
  detailLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  detailValue: { fontSize: 16, fontWeight: '600' },

  symptomsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 10, marginBottom: 24, paddingHorizontal: 16,
  },
  symptomCard: {
    width: '47.5%', borderWidth: 1, borderRadius: 16,
    padding: 14, gap: 12,
  },
  symptomHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  symptomIcon: { fontSize: 20 },
  symptomLabel: { fontSize: 13, fontWeight: '600', flex: 1 },

  pillRow: { flexDirection: 'row', gap: 6 },
  pill: {
    flex: 1, paddingVertical: 7, borderRadius: 8,
    borderWidth: 1, alignItems: 'center',
  },
  pillText: { fontSize: 13, fontWeight: '600' },

  submitBtn: {
    padding: 17, borderRadius: 16,
    alignItems: 'center', marginTop: 8, marginHorizontal: 16,
  },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});