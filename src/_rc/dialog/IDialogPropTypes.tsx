import type { ReactNode, CSSProperties } from 'react';
import type { GetContainer } from '@/_rc/util/PortalWrapper';

export type IDialogPropTypes = {
  className?: string;
  keyboard?: boolean;
  style?: CSSProperties;
  mask?: boolean;
  children?: any;
  afterClose?: () => any;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  closable?: boolean;
  maskClosable?: boolean;
  visible?: boolean;
  destroyOnClose?: boolean;
  mousePosition?: {
    x: number;
    y: number;
  } | null;
  title?: ReactNode;
  footer?: ReactNode;
  transitionName?: string;
  maskTransitionName?: string;
  animation?: any;
  maskAnimation?: any;
  wrapStyle?: Record<string, any>;
  bodyStyle?: Record<string, any>;
  maskStyle?: Record<string, any>;
  prefixCls?: string;
  wrapClassName?: string;
  width?: string | number;
  height?: number;
  zIndex?: number;
  bodyProps?: any;
  maskProps?: any;
  wrapProps?: any;
  getContainer?: GetContainer | false | unknown;
  closeIcon?: ReactNode;
  modalRender?: (node: ReactNode) => ReactNode;
  forceRender?: boolean;
  // https://github.com/ant-design/ant-design/issues/19771
  // https://github.com/react-component/dialog/issues/95
  focusTriggerAfterClose?: boolean;
};
