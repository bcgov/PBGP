import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { buttonBase, buttonColor } from './Button';

export interface LinkProps extends NextLinkProps {
  href: string;
  variant: keyof typeof buttonColor;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = props => {
  const { href, variant, disabled, shallow, replace, children } = props;

  if (disabled) {
    return (
      <span className={`${buttonColor[variant]} ${variant !== 'link' ? buttonBase : ''}`}>
        {children}
      </span>
    );
  }

  return (
    <NextLink href={href} shallow={shallow} replace={replace}>
      <a className={`${buttonColor[variant]} ${variant !== 'link' ? buttonBase : 'text-blue-500'}`}>
        {children}
      </a>
    </NextLink>
  );
};
