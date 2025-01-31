import * as React from 'react';
import { CSSMotionProps } from 'rc-motion';

export type CollapsibleType = 'header' | 'disabled';

export interface CollapseProps {
  prefixCls?: string;
  activeKey?: Array<string | number> | string | number;
  defaultActiveKey?: Array<string | number> | string | number;
  openMotion?: CSSMotionProps;
  onChange?: (key: Array<string | number> | string | number) => void;
  accordion?: boolean;
  className?: string;
  style?: object;
  destroyInactivePanel?: boolean;
  expandIcon?: (props: object) => React.ReactNode;
  collapsible?: CollapsibleType;
}

export interface CollapsePanelProps {
  id?: string;
  header?: string | React.ReactNode;
  prefixCls?: string;
  headerClass?: string;
  showArrow?: boolean;
  className?: string;
  style?: object;
  isActive?: boolean;
  openMotion?: CSSMotionProps;
  destroyInactivePanel?: boolean;
  accordion?: boolean;
  forceRender?: boolean;
  extra?: string | React.ReactNode;
  onItemClick?: (panelKey: string | number) => void;
  expandIcon?: (props: object) => React.ReactNode;
  panelKey?: string | number;
  role?: string;
  collapsible?: CollapsibleType;
}
