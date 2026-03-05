
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../src/Theme/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const FIELD_META = {
  Age: { label: 'AGE' },
  Gender: { label: 'GENDER' },
  BloodGroup: { label: 'BLOOD GROUP' },
  Contact: { label: 'CONTACT' },
  CMVStatus: { label: 'CMV STATUS' },
};

const DetailCard = ({ label, value, colors, delay }) => {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 350,
        delay,
        useNativeDriver: true,
      }),
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
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {label}
        </Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {value ?? '—'}
        </Text>
      </View>
    </Animated.View>
  );
};

export default function DonorDetail() {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const donorId = route.params?.donorId;

  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-12)).current;

  useEffect(() => {
    fetchDonor();

    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 420,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const fetchDonor = async () => {
    try {
      const response = await fetch(
        `https://uhpinfogzptzsvulhpvr.supabase.co/rest/v1/Donor?Donor_id=eq.${donorId}&select=*`,
        {
          headers: {
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocGluZm9nenB0enN2dWxocHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjQyNjEsImV4cCI6MjA2OTgwMDI2MX0.PrVCuwG314G4x3YW-b3p1-xHDLjcLyLbxvh4fMt_UvE',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocGluZm9nenB0enN2dWxocHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjQyNjEsImV4cCI6MjA2OTgwMDI2MX0.PrVCuwG314G4x3YW-b3p1-xHDLjcLyLbxvh4fMt_UvE',
          },
        }
      );

      const data = await response.json();

      if (data.length > 0) {
        setDonor(data[0]);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!donor) return null;

  const initials = donor.Name
    ? donor.Name.trim()
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  const fields = Object.entries(FIELD_META).map(([key, meta], i) => ({
    ...meta,
    key,
    value: donor[key],
    delay: 120 + i * 60,
  }));

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      {/* Top Bar */}
      <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.backBtn,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.backArrow, { color: colors.text }]}>‹</Text>
        </TouchableOpacity>

        <Text style={[styles.titleTop, { color: colors.text }]}>
          Donor Profile
        </Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero */}
        <Animated.View
          style={[
            styles.hero,
            { opacity: headerFade, transform: [{ translateY: headerSlide }] },
          ]}
        >
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: colors.primary + '1A',
                borderColor: colors.primary + '44',
              },
            ]}
          >
            <Text style={[styles.avatarText, { color: colors.primary }]}>
              {initials}
            </Text>
          </View>

          <Text style={[styles.heroName, { color: colors.text }]}>
            {donor.Name}
          </Text>

          <View
            style={[
              styles.heroPill,
              { backgroundColor: colors.success + '20' },
            ]}
          >
            <Text style={[styles.heroPillText, { color: colors.success }]}>
              ID: {donor.Donor_id} · {donor.BloodGroup}
            </Text>
          </View>
        </Animated.View>

        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          MEDICAL DETAILS
        </Text>

        <View style={styles.cardsWrap}>
          {fields.map((f) => (
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

