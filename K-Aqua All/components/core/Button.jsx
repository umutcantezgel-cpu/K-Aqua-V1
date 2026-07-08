import React from 'react';

/**
 * K-Aqua Button — primäre Handlungsaufforderung.
 * Reiner Wrapper über die .k-btn-Klassen aus styles.css.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'end',
  href,
  onClick,
  disabled = false,
  type = 'button',
  ariaLabel,
}) {
  const cls = `k-btn k-btn--${variant} k-btn--${size}`;
  const content = (
    <React.Fragment>
      {icon && iconPosition === 'start' ? icon : null}
      {children}
      {icon && iconPosition === 'end' ? icon : null}
    </React.Fragment>
  );
  if (href && !disabled) {
    return (
      <a className={cls} href={href} aria-label={ariaLabel}
        target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
