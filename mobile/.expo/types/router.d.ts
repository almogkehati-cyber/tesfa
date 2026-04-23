/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/forgot-pin` | `/(auth)/login` | `/(auth)/new-password` | `/(auth)/otp` | `/(auth)/pin-setup` | `/(auth)/register` | `/(auth)/reset-password` | `/(auth)/security-setup` | `/(auth)/welcome` | `/(tabs)` | `/(tabs)/activity` | `/(tabs)/directory` | `/(tabs)/guide` | `/(tabs)/home` | `/(tabs)/profile` | `/_sitemap` | `/activity` | `/business` | `/business/admin` | `/business/api-key` | `/business/delete-account` | `/business/delete-success` | `/business/edit-profile` | `/business/pay-confirm` | `/business/pay-employee` | `/business/pay-success` | `/business/payment-received` | `/business/receive-qr` | `/business/refund-execute` | `/business/refund-success` | `/business/refunds` | `/business/register` | `/business/reports` | `/business/reviews` | `/business/settings` | `/business/statistics` | `/business/transactions` | `/directory` | `/forgot-pin` | `/guide` | `/home` | `/login` | `/new-password` | `/otp` | `/pin-setup` | `/profile` | `/profile/about` | `/profile/help` | `/receive` | `/register` | `/reset-password` | `/review` | `/scan` | `/security-setup` | `/send` | `/send/` | `/send/confirm` | `/send/success` | `/settings` | `/settings/` | `/settings/edit-profile` | `/settings/language` | `/settings/notifications` | `/settings/security` | `/settings/seed-phrase` | `/transaction` | `/ubi` | `/ubi/` | `/welcome`;
      DynamicRoutes: `/business/${Router.SingleRoutePart<T>}` | `/review/${Router.SingleRoutePart<T>}` | `/transaction/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/business/[id]` | `/review/[id]` | `/transaction/[id]`;
    }
  }
}
