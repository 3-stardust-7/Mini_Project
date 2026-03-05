import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../src/Theme/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const FIELD_META = {
  
  BodyMass: { label: 'BODY MASS (kg)' },
  RhFactor: { label: 'RH FACTOR' },
  CMVStatus: { label: 'CMV STATUS' },
  DiseaseType: { label: 'DISEASE TYPE' },
  DiseaseGroup: { label: 'DISEASE GROUP' },
  RiskGroup: { label: 'RISK GROUP' },
  OutcomeVariable: { label: 'OUTCOME' },
  PostRelapseTransplant: { label: 'POST RELAPSE TRANSPLANT' },
  Fever: { label: 'FEVER' },
  Cough: { label: 'COUGH' },
  Fatigue: { label: 'FATIGUE' },
  DifficultyBreathing: { label: 'DIFFICULTY BREATHING' },
  BloodPressure: { label: 'BLOOD PRESSURE' },
  CholesterolLevel: { label: 'CHOLESTEROL LEVEL' },
};

const DetailCard = ({ label, value, colors, delay }) => {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 350, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: fade,
          transform: [{ translateY: slide }],
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {value !== null && value !== undefined ? String(value) : '—'}
        </Text>
      </View>
    </Animated.View>
  );
};

export default function PatientDetail() {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const patient = route.params?.patient;

  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 420, useNativeDriver: true }),
    ]).start();
  }, []);

  if (!patient) return null;

  const initials = patient.Name
    ? patient.Name.trim().split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  const fields = Object.entries(FIELD_META).map(([key, meta], i) => ({
    ...meta,
    key,
    value: patient[key],
    delay: 120 + i * 60,
  }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>

      {/* Top Bar */}
      <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Text style={[styles.backArrow, { color: colors.text }]}>‹</Text>
        </TouchableOpacity>

        <Text style={[styles.titleTop, { color: colors.text }]}>
          Patient Profile
        </Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Hero Section */}
        <Animated.View
          style={[
            styles.hero,
            { opacity: headerFade, transform: [{ translateY: headerSlide }] },
          ]}
        >
          <View style={[styles.avatar, { backgroundColor: colors.primary + '1A', borderColor: colors.primary + '44' }]}>
            <Text style={[styles.avatarText, { color: colors.primary }]}>
              {initials}
            </Text>
          </View>

          <Text style={[styles.heroName, { color: colors.text }]}>
            {patient.Name}
          </Text>

          <View style={[styles.heroPill, { backgroundColor: colors.error + '20' }]}>
            <Text style={[styles.heroPillText, { color: colors.error }]}>
              ID: {patient.Patient_id} · {patient.RiskGroup || 'N/A'}
            </Text>
          </View>
        </Animated.View>

        {/* Section Label */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          CLINICAL DETAILS
        </Text>

        {/* Cards */}
        <View style={styles.cardsWrap}>
          {fields.map(f => (
            <DetailCard
              key={f.key}
              label={f.label}
              value={f.value}
              colors={colors}
              delay={f.delay}
            />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backArrow: { fontSize: 28, marginTop: -2 },
  titleTop: { fontSize: 16, fontWeight: '600' },

  scrollContent: { paddingBottom: 40 },

  hero: {
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  avatarText: { fontSize: 34, fontWeight: '700' },
  heroName: { fontSize: 22, fontWeight: '700', marginBottom: 10 },

  heroPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },

  heroPillText: { fontSize: 13, fontWeight: '600' },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
    marginHorizontal: 20,
    marginBottom: 10,
  },

  cardsWrap: { paddingHorizontal: 16, gap: 10 },

  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    padding: 14,
  },

  label: { fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '600' },
});