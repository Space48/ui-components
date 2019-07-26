import clsx from 'clsx';
import React, {ReactChild, ReactType} from 'react';
import defaultTheme from './message.pcss';

export type MessageType = 'error' | 'success' | 'info';

type Props = {
  /**
   * Element node
   * @default 'div'
   */
  as?: ReactType;
  type: MessageType;
  text: string;
  children?: ReactChild;
  className?: string;
  theme?: {
    root?: string;
    icon?: string;
    error?: string;
    success?: string;
    info?: string;
    text?: string;
  };
};

export const Message = ({
  as: ComponentProp = 'div',
  type,
  text,
  className,
  theme = defaultTheme,
  ...rest
}: Props) => (
  <ComponentProp className={clsx(theme.root, className, theme[type])} {...rest}>
    <span className={theme.icon}>ICON</span>
    <span className={theme.text}>{text}</span>
  </ComponentProp>
);
