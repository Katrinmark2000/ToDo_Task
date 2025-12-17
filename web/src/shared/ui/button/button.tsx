import type { TButtonUIProps } from './type';
import styles from './Button.module.scss';
import clsx from 'clsx'


export const Button = ({
	onClick,
	children,
	className,
	color,
}: TButtonUIProps) => (
	<button
	className={clsx(styles.button, styles[color], className)}
	onClick={onClick}
    type="button"
	color={color}>
	{children}
	</button>
);