import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';

// ─── Single field row inside a tab ───────────────────────────────────────────
const FieldRow = ({ label, value, colors }) => (
  <View style={[styles.fieldRow, { borderBottomColor: colors.border }]}>
    <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
      {label}
    </Text>
    <Text style={[styles.fieldValue, { color: colors.text }]}>
      {value ?? '—'}
    </Text>
  </View>
);

// ─── Badge (for scores / risk levels) ────────────────────────────────────────
const Badge = ({ value, colors }) => {
  if (!value) return <Text style={[styles.fieldValue, { color: colors.text }]}>—</Text>;

  const lv = String(value).toLowerCase();
  let bg = colors.primary + '20';
  let fg = colors.primary;

  if (lv.includes('high') || lv.includes('low survival')) {
    bg = colors.error + '20'; fg = colors.error;
  } else if (lv.includes('low') || lv.includes('high survival')) {
    bg = '#22c55e20'; fg = '#16a34a';
  } else if (lv.includes('medium') || lv.includes('moderate')) {
    bg = '#f59e0b20'; fg = '#d97706';
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.badgeText, { color: fg }]}>{value}</Text>
    </View>
  );
};

// ─── Content panel for one donor ─────────────────────────────────────────────
const DonorPanel = ({ donor, colors, visible }) => {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: visible ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={{ opacity: fade }}>
      {/* Identity */}
      <View style={[styles.panelSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.panelSectionTitle, { color: colors.textSecondary }]}>
          IDENTITY
        </Text>
        <FieldRow label="Donor ID" value={donor.Donor_id} colors={colors} />
        <FieldRow label="Donor Name" value={donor.Donor_Name} colors={colors} />
        <FieldRow label="ABO Match" value={donor.AboMatch} colors={colors} />
      </View>

      {/* HLA & Matching */}
      <View style={[styles.panelSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.panelSectionTitle, { color: colors.textSecondary }]}>
          HLA &amp; MATCHING
        </Text>
        <FieldRow label="HLA Match" value={donor.HlaMatch} colors={colors} />
        <FieldRow label="Antigen Match" value={donor.Antigen} colors={colors} />
        <FieldRow label="Allele Match" value={donor.Allele} colors={colors} />
      </View>

      {/* Risk & Outcomes */}
      <View style={[styles.panelSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.panelSectionTitle, { color: colors.textSecondary }]}>
          RISK &amp; OUTCOMES
        </Text>

        <View style={[styles.fieldRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Survival Rate</Text>
          <Badge value={donor.Survival} colors={colors} />
        </View>

        <View style={[styles.fieldRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>GVHD Risk</Text>
          <Badge value={donor.GvhdRisk} colors={colors} />
        </View>

        <View style={[styles.fieldRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Relapse Risk</Text>
          <Badge value={donor.RelapseRisk} colors={colors} />
        </View>
      </View>

      {/* Compatibility Score — hero number */}
      <View style={[styles.scoreCard, { backgroundColor: colors.primary + '12', borderColor: colors.primary + '30' }]}>
        <Text style={[styles.scoreLabel, { color: colors.textSecondary }]}>
          COMPATIBILITY SCORE
        </Text>
        <Text style={[styles.scoreValue, { color: colors.primary }]}>
          {donor.CompatabilityScore ?? '—'}
        </Text>
      </View>
    </Animated.View>
  );
};

// ─── Main exported component ──────────────────────────────────────────────────
/**
 * Usage in PatientDetail (replace the old donors section):
 *
 *   {!loadingDonors && donors.length > 0 && (
 *     <>
 *       <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
 *         MATCHED DONORS
 *       </Text>
 *       <DonorTabs donors={donors} colors={colors} />
 *     </>
 *   )}
 */
export default function DonorTabs({ donors, colors }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!donors || donors.length === 0) return null;

  return (
    <View style={styles.root}>
      {/* Tab bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBar}
      >
        {donors.map((donor, i) => {
          const isActive = i === activeIndex;
          const shortName = donor.Donor_Name
            ? donor.Donor_Name.trim().split(' ')[0]   // first name only keeps tabs compact
            : `Donor ${i + 1}`;

          return (
            <TouchableOpacity
              key={donor.id ?? i}
              onPress={() => setActiveIndex(i)}
              style={[
                styles.tab,
                {
                  borderBottomColor: isActive ? colors.primary : 'transparent',
                  borderBottomWidth: 2,
                },
              ]}
              activeOpacity={0.7}
            >
              {/* rank bubble */}
              <View
                style={[
                  styles.rankBubble,
                  {
                    backgroundColor: isActive
                      ? colors.primary
                      : colors.card,
                    borderColor: isActive ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.rankText,
                    { color: isActive ? '#fff' : colors.textSecondary },
                  ]}
                >
                  {i + 1}
                </Text>
              </View>

              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? colors.primary : colors.textSecondary },
                ]}
                numberOfLines={1}
              >
                {shortName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Panel */}
      <View style={styles.panelWrap}>
        {donors.map((donor, i) => (
          <DonorPanel
            key={donor.id ?? i}
            donor={donor}
            colors={colors}
            visible={i === activeIndex}
          />
        ))}
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    marginHorizontal: 16,
    marginTop: 4,
  },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 2,
    paddingBottom: 2,
  },

  tab: {
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 5,
    minWidth: 72,
  },

  rankBubble: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rankText: {
    fontSize: 11,
    fontWeight: '700',
  },

  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // Panel
  panelWrap: {
    marginTop: 14,
    gap: 10,
  },

  panelSection: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
    marginBottom: 10,
  },

  panelSectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
  },

  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },

  fieldValue: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: 8,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Compatibility score hero
  scoreCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 10,
  },

  scoreLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
  },

  scoreValue: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1,
  },
});