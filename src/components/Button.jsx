import React from 'react';
import './Button.css';

/**
 * Button component with Stripe-quality variants and states.
 *
 * @param {'primary'|'secondary'|'tertiary'|'danger'} variant - visual style
 * @param {'small'|'medium'|'large'} size - button sizing
 * @param {boolean} disabled - disabled state
 * @param {boolean} iconOnly - square icon button (no text padding)
 * @param {string} className - additional class names
 * @param {React.ReactNode} children - button label / icon
 * @param {React.ButtonHTMLAttributes} rest - forwarded props (onClick, type, etc.)
 */
export default function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  iconOnly = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'gd-button',
    `gd-button--${variant}`,
    `gd-button--${size}`,
    iconOnly ? 'gd-button--icon-only' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

/**
 * Convenience export: preset icon-button sizes.
 *
 * Usage:
 *   <Button.Icon size="md"><SomeIcon size={20} /></Button.Icon>
 *
 * size: 'sm' (32px) | 'md' (40px) | 'lg' (48px)
 */
function IconButton({ size = 'md', variant = 'secondary', className = '', children, ...rest }) {
  const sizeMap = { sm: 'small', md: 'medium', lg: 'large' };
  return (
    <Button
      variant={variant}
      size={sizeMap[size] || 'medium'}
      iconOnly
      className={className}
      {...rest}
    >
      {children}
    </Button>
  );
}

Button.Icon = IconButton;
