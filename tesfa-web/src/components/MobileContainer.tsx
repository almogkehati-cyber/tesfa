import { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="flex flex-col items-center min-h-screen w-full">
      <div className="w-full max-w-[430px] min-h-screen relative bg-[#121222] shadow-2xl overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
