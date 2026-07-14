import { ReactNode } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { useLocale } from 'next-intl';

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  className?: string;
}

export function ButtonPrimary({ children, href, className = '', ...props }: ButtonPrimaryProps) {
  const baseClasses = `ka-btn ka-btn--primary ka-btn-drop ${className}`;
  const locale = useLocale();

  if (href) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Link href={href as any} locale={locale} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} type="button" {...props}>
      {children}
    </button>
  );
}
