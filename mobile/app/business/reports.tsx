import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const reportTypes = [
  { id: 'transactions', icon: 'receipt-long', title: 'ריכוז עסקאות', subtitle: 'סיכום מפורט של כלל העסקאות וההכנסות' },
  { id: 'ubi', icon: 'payments', title: 'מענקי UBI', subtitle: 'דוח זכאות ומימוש מענקים תקופתיים' },
  { id: 'credits', icon: 'assignment-return', title: 'דוח זיכויים', subtitle: 'פירוט החזרים, ביטולים וזיכוי מס' },
];

const quickDates = [
  { label: 'החודש', value: 'month' },
  { label: 'רבעון אחרון', value: 'quarter' },
  { label: 'שנה נוכחית', value: 'year' },
];

export default function BusinessReportsScreen() {
  const router = useRouter();
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel'>('pdf');
  const [selectedReport, setSelectedReport] = useState('transactions');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="history" size={24} color={colors.tertiary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>הפקת דוחות</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.tertiary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.titleSection}>
          <Text style={styles.title}>הפקת דוחות לרואה חשבון</Text>
          <Text style={styles.subtitle}>בצע הפקה של דוחות פיננסיים מתקדמים</Text>
        </Animated.View>

        {/* Date Range */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="calendar-today" size={24} color={colors.tertiary} />
            <Text style={styles.cardTitle}>טווח תאריכים</Text>
          </View>
          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <Text style={styles.dateLabel}>מתאריך</Text>
              <TouchableOpacity style={styles.dateInput}>
                <Text style={styles.dateValue}>בחר תאריך</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dateField}>
              <Text style={styles.dateLabel}>עד תאריך</Text>
              <TouchableOpacity style={styles.dateInput}>
                <Text style={styles.dateValue}>בחר תאריך</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.quickDates}>
            {quickDates.map((date) => (
              <TouchableOpacity key={date.value} style={styles.quickDateChip}>
                <Text style={styles.quickDateText}>{date.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Export Format */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="file-download" size={24} color={colors.tertiary} />
            <Text style={styles.cardTitle}>פורמט ייצוא</Text>
          </View>
          <View style={styles.formatRow}>
            <TouchableOpacity 
              style={[styles.formatOption, selectedFormat === 'pdf' && styles.formatOptionSelected]}
              onPress={() => setSelectedFormat('pdf')}
            >
              <MaterialIcons name="picture-as-pdf" size={32} color={selectedFormat === 'pdf' ? colors.tertiary : colors.onSurfaceVariant} />
              <Text style={[styles.formatText, selectedFormat === 'pdf' && styles.formatTextSelected]}>ייצוא ל-PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.formatOption, selectedFormat === 'excel' && styles.formatOptionSelected]}
              onPress={() => setSelectedFormat('excel')}
            >
              <MaterialIcons name="table-chart" size={32} color={selectedFormat === 'excel' ? colors.tertiary : colors.onSurfaceVariant} />
              <Text style={[styles.formatText, selectedFormat === 'excel' && styles.formatTextSelected]}>ייצוא ל-Excel</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Report Type */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="account-tree" size={24} color={colors.tertiary} />
            <Text style={styles.cardTitle}>סוג הדוח</Text>
          </View>
          <View style={styles.reportTypes}>
            {reportTypes.map((report) => (
              <TouchableOpacity 
                key={report.id}
                style={[styles.reportOption, selectedReport === report.id && styles.reportOptionSelected]}
                onPress={() => setSelectedReport(report.id)}
              >
                <View style={[styles.reportIcon, selectedReport === report.id && styles.reportIconSelected]}>
                  <MaterialIcons name={report.icon as any} size={24} color={colors.tertiary} />
                </View>
                <View style={styles.reportText}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportSubtitle}>{report.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Generate Button */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.buttonSection}>
          <TouchableOpacity activeOpacity={0.9}>
            <LinearGradient
              colors={['#7B2FBE', '#9B59F5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.generateButton}
            >
              <MaterialIcons name="summarize" size={24} color={colors.white} />
              <Text style={styles.generateButtonText}>הפק דוח</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}33`,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  titleSection: {
    marginVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  card: {
    backgroundColor: '#14142B',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  cardHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  dateRow: {
    flexDirection: 'row-reverse',
    gap: 16,
    marginBottom: 16,
  },
  dateField: {
    flex: 1,
    gap: 8,
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  dateInput: {
    backgroundColor: '#0A0A1A',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  dateValue: {
    fontSize: 16,
    color: colors.onSurface,
  },
  quickDates: {
    flexDirection: 'row-reverse',
    gap: 8,
    flexWrap: 'wrap',
  },
  quickDateChip: {
    backgroundColor: `${colors.surfaceContainer}80`,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  quickDateText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  formatRow: {
    flexDirection: 'row-reverse',
    gap: 16,
  },
  formatOption: {
    flex: 1,
    backgroundColor: '#0A0A1A',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: '#2D2D44',
  },
  formatOptionSelected: {
    borderColor: colors.tertiary,
    backgroundColor: `${colors.tertiary}0D`,
  },
  formatText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  formatTextSelected: {
    color: colors.onSurface,
  },
  reportTypes: {
    gap: 16,
  },
  reportOption: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    backgroundColor: '#0A0A1A',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  reportOptionSelected: {
    borderColor: colors.tertiary,
    backgroundColor: `${colors.tertiary}0D`,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${colors.tertiary}1A`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportIconSelected: {
    backgroundColor: `${colors.tertiary}33`,
  },
  reportText: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  reportSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  buttonSection: {
    paddingVertical: 16,
  },
  generateButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
});
