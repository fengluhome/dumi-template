import * as React from 'react';

export interface Props {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  id?: string;
  type?: string;
  defaultChecked?: number | boolean;
  checked?: number | boolean;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: any) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  tabIndex?: string | number;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  value?: any;
}
declare const CheckBox:
  | React.ForwardRefExoticComponent<
      Props & React.RefAttributes<HTMLInputElement>
    >
  | any;
export default CheckBox;
