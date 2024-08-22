import { cn } from '@/lib/utils';

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageSection({ children, className }: PageSectionProps) {
  return (
    <div className={cn('max-w-screen-sm mx-auto w-full px-3', className)}>
      {children}
    </div>
  );
}
