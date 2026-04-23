import MobileContainer from '@/components/MobileContainer';
import { ReactNode } from 'react';

export default function BusinessLayout({ children }: { children: ReactNode }) {
  return <MobileContainer>{children}</MobileContainer>;
}
