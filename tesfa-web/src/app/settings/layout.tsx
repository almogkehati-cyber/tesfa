import MobileContainer from '@/components/MobileContainer';
import { ReactNode } from 'react';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return <MobileContainer>{children}</MobileContainer>;
}
