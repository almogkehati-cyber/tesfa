import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const recentContacts = [
  { id: '1', name: 'ארי כהן', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWrz1RRvGnfMrhvM7AxXCkEcoivK0pMYnE0shs5KjnG8vta6YOys1kZU3iiD1eZZyS0uHplXTxuf78kIs8MV-c30O_MJf69dsyiOZ2EUAEGESHKYRcreLOOD8xNa7skdQPmCx18Hjq4mLJW5oFd5GDhjCUMqCxcoVLZ8WRNJj2JXwfM3RChuPdZuGhX7ZU3C4ODgTeqdPu3FrH76A-q31lknhOLkAajZktQjxCQJth1PTNfyOoJWeaMrkR6DhGrGCeHJbJv0FJYfY', selected: true },
  { id: '2', name: 'דנה לוי', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDisuba-1mY6OKYSGzGZ8tLWkGy5rF7HHIZQbG78thDJKV9E7TFPBFWjfIfcAi6RJDG7Gskl3LBR6E1ct1GsMTalnr7DCCbPNLcAGVK-wUF_43NgUoqtDiDL9UUkS8S4_BNG4Yah0kbgyCb4ML3DMusk4ydwpvwJQj1IX0c-_Uofeh4bqfvP4fEnTqIOgibqVkYySyXDpyV0fj0f9bgsEYPdiZYSDAoct-hfPb5oOVRCm43k-MTiQR4-QkNb8KpevXuCCfInf4Q274', selected: false },
  { id: '3', name: 'נועם רז', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXxXMh-bkgifdXr3lpw3P5Zb4kbL3OM__PS14FY2E7OF4JfSLn-hkTq4TUfp1IfGmj3iX2qQqrOM38Ojd9_83UpRWuwaUtBrQuVx8mox8ZnYhqkp0YHmDx4Cm93uHi9caxuE0ubgltoPqubZHgXaIPCBo0XYRkcGjNkJw1wB51D6w5VpbhBbYmCvCbhDDeJJQYNkOufI1ScPHUQnhbJBiIM9FXraYTuRA0adBHKut9jBY97--tD6g5IrjP4L96wC_cwElZUCgzzAw', selected: false },
  { id: '4', name: 'מאיה גולן', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK7msuGPzJSN_8ii-G31qJtlN2Xc7LstMNtiT5ccyGbL6GOD23oX8DW601Z3KtfnhScS7RsdSpTL4EaDOfxW3hb_gVy9bQr71ohymmH0FPCAyCs1vRBeZojz8xa1RAo0HM24Tav7vGOkryFmdMgZ2rPBZFucAPjIe1fprBfRWt1O5jiZ0JtVpvEKdGuT6-5kYoXhdA6vorjPW7VdQGyY2_6QpGPgDYoRFYnyYwdQd83LzVMuQ1OMU0Q8kAKhGnSoZLoh5obVbL-Gs', selected: false },
];

const employees = [
  { id: '1', name: 'יוסי מזרחי', role: 'מנהל צוות פיתוח', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdt0l8cXsLh2GOdonX8kl4Pnph30n-5r4l57NIDmwJoE7KxW-SbNDy2Q3jslKKlbF_NeWvzuN6irOBvfz27oSYnNJwj6bU5J8PF0hRG_5Eq3GRKnRemXkiMle6e9kGPc4DFgyHiBARH6XVaK6ogv075tFJOEqfJYKTnHuhzrthRV6dY22LsN-95SWMWhaRxOa6VYAG0foyISRjpjgMP4CTOc6ZzZAL0u-fPnIJTqp_rNcDuN0VmYYnHnQgQ6Nk_LR71LGLPquxA0w' },
  { id: '2', name: 'שירה אלבז', role: 'מעצבת מוצר בכירה', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjt0K6j-vdvRTvwKeWA1GAZeweJgd9K5OFeiQDPfby4NoN1nHhcDRRamqZ0L81fITkWubfPDHJQIY3UOj8qUTXwK97tusJmLb_Xf76MTY_9AIJWzh33f8XOABLo5mqw-sJBq9XlfdBT5vVWalrD4PsqngFkZPNSTMKoHs5jdFwsOJM40sPLa8VOuUdD6epYDlMfMe1EEta7HjMS7lyhVluMBxzyhvK67GnXFnKhaOoJ96-0DqgK_hRCubQsSratVQXn3LbiR9FjvU' },
  { id: '3', name: 'דוד אברהם', role: 'רכז שיווק', initials: 'דא' },
];

export default function PayEmployeeScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="account-balance-wallet" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>תשלום לעובד</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Amount Input */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.amountSection}>
          <Text style={styles.amountLabel}>סכום לתשלום ב-TSF</Text>
          <View style={styles.amountInput}>
            <Text style={styles.currencyLabel}>TSF</Text>
            <TextInput
              style={styles.amountValue}
              placeholder="0.00"
              placeholderTextColor={colors.surfaceContainerHighest}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              textAlign="center"
            />
          </View>
          <View style={styles.balanceBadge}>
            <Text style={styles.balanceText}>יתרה זמינה: 12,450.00 TSF</Text>
          </View>
        </Animated.View>

        {/* Search */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color={colors.onSurfaceVariant} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="חיפוש עובד או איש קשר..."
            placeholderTextColor={`${colors.onSurfaceVariant}80`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            textAlign="right"
          />
        </Animated.View>

        {/* Recent Contacts */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.contactsSection}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity>
              <Text style={styles.seeAll}>הצג הכל</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>אנשי קשר אחרונים</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contactsScroll}>
            {recentContacts.map((contact) => (
              <TouchableOpacity key={contact.id} style={styles.contactItem}>
                <View style={[styles.contactAvatar, contact.selected && styles.contactAvatarSelected]}>
                  <Image source={{ uri: contact.image }} style={styles.contactImage} />
                </View>
                <Text style={styles.contactName}>{contact.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.contactItem}>
              <View style={styles.addContactButton}>
                <MaterialIcons name="add" size={24} color={colors.primaryFixedDim} />
              </View>
              <Text style={styles.contactName}>חדש</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>

        {/* Employees List */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.employeesSection}>
          <View style={styles.employeesHeader}>
            <Text style={styles.employeesLabel}>עובדים פעילים</Text>
          </View>
          {employees.map((employee) => (
            <TouchableOpacity key={employee.id} style={styles.employeeItem}>
              <MaterialIcons name="chevron-left" size={24} color={colors.onSurfaceVariant} />
              <View style={styles.employeeInfo}>
                <Text style={styles.employeeName}>{employee.name}</Text>
                <Text style={styles.employeeRole}>{employee.role}</Text>
              </View>
              {employee.image ? (
                <Image source={{ uri: employee.image }} style={styles.employeeAvatar} />
              ) : (
                <View style={styles.employeeInitials}>
                  <Text style={styles.initialsText}>{employee.initials}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.9}>
          <LinearGradient
            colors={['#7b2fbe', '#9b59f5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.payButton}
          >
            <Text style={styles.payButtonText}>בצע תשלום</Text>
            <MaterialIcons name="send" size={20} color={colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginBottom: 16,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  currencyLabel: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
  },
  amountValue: {
    fontSize: 56,
    fontWeight: '800',
    color: colors.onSurface,
    minWidth: 150,
  },
  balanceBadge: {
    marginTop: 16,
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  balanceText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 32,
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.onSurface,
  },
  contactsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  contactsScroll: {
    gap: 16,
    paddingVertical: 8,
  },
  contactItem: {
    alignItems: 'center',
    gap: 8,
  },
  contactAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2,
    backgroundColor: colors.surfaceContainerHighest,
  },
  contactAvatarSelected: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primaryContainer,
  },
  contactImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  contactName: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  addContactButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.outlineVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  employeesSection: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    overflow: 'hidden',
  },
  employeesHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}1A`,
  },
  employeesLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
  },
  employeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.outlineVariant}1A`,
  },
  employeeInfo: {
    flex: 1,
    marginRight: 16,
    alignItems: 'flex-end',
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  employeeRole: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  employeeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
  },
  employeeInitials: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onPrimaryContainer,
  },
  footer: {
    position: 'absolute',
    bottom: 96,
    left: 24,
    right: 24,
  },
  payButton: {
    height: 56,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
});
