import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '../../Theme/ThemeContext';

export default function DonorProfiles({ navigation }) {
  const { colors } = useAppTheme();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
    const onRefresh = async () => {
      setRefreshing(true);
      await fetchDonors();
      setRefreshing(false);
    };

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await fetch(
        'https://uhpinfogzptzsvulhpvr.supabase.co/rest/v1/Donor?select=*',
        {
          headers: {
          apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocGluZm9nenB0enN2dWxocHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjQyNjEsImV4cCI6MjA2OTgwMDI2MX0.PrVCuwG314G4x3YW-b3p1-xHDLjcLyLbxvh4fMt_UvE',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocGluZm9nenB0enN2dWxocHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjQyNjEsImV4cCI6MjA2OTgwMDI2MX0.PrVCuwG314G4x3YW-b3p1-xHDLjcLyLbxvh4fMt_UvE',
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        }
      );

      const data = await response.json();
      setDonors(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  
  const DonorCard = ({ donor }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={() => navigation.navigate('DonorDetail', { 
          donor: donor
       })}
      activeOpacity={0.8}
    >
      <View style={styles.rowTop}>
        <View style={[styles.iconCircle, { backgroundColor: colors.primary + '15' }]}>
          <Icon name="account-heart" size={26} color={colors.primary} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: colors.text }]}>
            {donor.Name}
          </Text>
          <Text style={[styles.idText, { color: colors.textSecondary }]}>
            Donor ID: {donor.Donor_id}
          </Text>
        </View>

        <View style={[styles.bloodBadge, { backgroundColor: colors.success + '20' }]}>
          <Text style={[styles.bloodText, { color: colors.success }]}>
            {donor.BloodGroup}
          </Text>
        </View>
      </View>

      {/* Bottom Info Row */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Icon name="virus" size={16} color={colors.textSecondary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            CMV: {donor.CMVStatus}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Icon name="dna" size={16} color={colors.textSecondary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {donor.StemCellSource}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <ScrollView
              contentContainerStyle={styles.scrollContent}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Donor Profiles
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Registered stem cell donors
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          donors.map((donor) => (
            <DonorCard key={donor.Donor_id} donor={donor} />
          ))
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },

  header: { marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 4 },

  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  idText: {
    fontSize: 12,
    marginTop: 2,
  },

  bloodBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  bloodText: {
    fontWeight: 'bold',
    fontSize: 13,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  infoText: {
    fontSize: 12,
  },
});