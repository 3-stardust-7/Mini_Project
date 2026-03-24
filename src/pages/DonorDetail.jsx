
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
  const {donor}=route.params;

  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-12)).current;

  if (!donor) return null;

  const initials = donor.Name
    ? donor.Name.trim()
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';
    
useEffect(() => {
      Animated.parallel([
        Animated.timing(headerFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 420, useNativeDriver: true }),
      ]).start();
    }, []);

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
                   {donor.Name}
                 </Text>
       
                 <View style={[styles.heroPill, { backgroundColor: colors.error + '20' }]}>
                   <Text style={[styles.heroPillText, { color: colors.error }]}>
                     ID: {donor.donor_id} · {donor.RiskGroup || 'N/A'}
                   </Text>
                 </View>
               </Animated.View>
       
               {/* Section Label */}
               <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                 CLINICAL DETAILS
               </Text>
       
               {/* Cards */}
               <View style={styles.cardsWrap}>
                 <DetailCard label="Age" value={donor.Age} colors={colors} />
                 <DetailCard label="Gender" value={donor.Gender} colors={colors} />
                 <DetailCard label="Blood Group" value={donor.BloodGroup} colors={colors} />
                 <DetailCard label="Body Mass" value={donor.BodyMass} colors={colors} />
                 <DetailCard label="CMV Status" value={donor.CMVStatus} colors={colors} />
               </View>

               <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                         HLA TYPING
                       </Text>
               
                       <View style={styles.cardsWrap}>
                         <DetailCard label="HLA-A" value={`${donor.Hla_a_1 || '-'} / ${donor.Hla_a_2 || '-'}`} colors={colors} />
                         <DetailCard label="HLA-B" value={`${donor.Hla_b_1 || '-'} / ${donor.Hla_b_2 || '-'}`} colors={colors} />
                         <DetailCard label="HLA-C" value={`${donor.Hla_c_1 || '-'} / ${donor.Hla_c_2 || '-'}`} colors={colors} />
                         <DetailCard label="HLA-DRB1" value={`${donor.Hla_drb1_1 || '-'} / ${donor.Hla_drb1_2 || '-'}`} colors={colors} />
                         <DetailCard label="HLA-DQB1" value={`${donor.Hla_dqb1_1 || '-'} / ${donor.Hla_dqb1_2 || '-'}`} colors={colors} />
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
    marginTop: 20,
    marginBottom:10,
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

