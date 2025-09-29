import type { TInputUIProps } from './type';
import styles from './input.module.scss';

export const Input = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
}: TInputUIProps) => {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};