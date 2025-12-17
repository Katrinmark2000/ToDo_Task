import type { TInputUIProps } from './type';
import styles from './input.module.scss';
import { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, TInputUIProps>(
  ({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
}, ref) => {
  return (
    <input
      ref={ref}
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
)