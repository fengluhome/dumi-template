import * as React from 'react';
import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import KeyCode from '../../util/KeyCode';
import contains from '../../util/Dom/contains';
import type ScrollLocker from '../../util/Dom/scrollLocker';
import type { IDialogPropTypes } from '../IDialogPropTypes';
import Mask from './Mask';
import { getMotionName, getUUID } from '../util';
import type { ContentRef } from './Content';
import Content from './Content';

export type IDialogChildProps = {
  // zombieJ: This should be handle on top instead of each Dialog.
  // TODO: refactor to remove this.
  getOpenCount?: () => number;
  getContainer: (() => HTMLElement) | unknown;
  switchScrollingEffect?: () => void;
  scrollLocker?: ScrollLocker | unknown;
} & IDialogPropTypes;

export default function Dialog(props: IDialogChildProps | any) {
  const {
    prefixCls = 'rc-dialog',
    zIndex,
    visible = false,
    keyboard = true,
    focusTriggerAfterClose = true,
    scrollLocker,

    // Wrapper
    title,
    wrapStyle,
    wrapClassName,
    wrapProps,
    onClose,
    afterClose,

    // Dialog
    transitionName,
    animation,
    closable = true,

    // Mask
    mask = true,
    maskTransitionName,
    maskAnimation,
    maskClosable = true,
    maskStyle,
    maskProps,
  } = props;

  const lastOutSideActiveElementRef = useRef<HTMLElement>();
  const wrapperRef = useRef<HTMLDivElement>();
  const contentRef = useRef<ContentRef>();

  const [animatedVisible, setAnimatedVisible] = React.useState(visible);

  // ========================== Init ==========================
  const ariaIdRef = useRef<string>();
  if (!ariaIdRef.current) {
    ariaIdRef.current = `rcDialogTitle${getUUID()}`;
  }

  // ========================= Events =========================
  function onDialogVisibleChanged(newVisible: boolean) {
    if (newVisible) {
      // Try to focus
      if (!contains(wrapperRef.current, document.activeElement)) {
        lastOutSideActiveElementRef.current =
          document.activeElement as HTMLElement;
        contentRef.current?.focus();
      }
    } else {
      // Clean up scroll bar & focus back
      setAnimatedVisible(false);

      if (
        mask &&
        lastOutSideActiveElementRef.current &&
        focusTriggerAfterClose
      ) {
        try {
          lastOutSideActiveElementRef.current.focus({ preventScroll: true });
        } catch (e) {
          // Do nothing
        }
        lastOutSideActiveElementRef.current = null;
      }

      // Trigger afterClose only when change visible from true to false
      if (animatedVisible) {
        afterClose?.();
      }
    }
  }

  function onInternalClose(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) {
    onClose?.(e as React.MouseEvent<HTMLButtonElement>);
  }

  // >>> Content
  const contentClickRef = useRef(false);
  const contentTimeoutRef = useRef<NodeJS.Timeout>();

  // We need record content click incase content popup out of dialog
  const onContentMouseDown: React.MouseEventHandler = () => {
    clearTimeout(contentTimeoutRef.current);
    contentClickRef.current = true;
  };

  const onContentMouseUp: React.MouseEventHandler = () => {
    contentTimeoutRef.current = setTimeout(() => {
      contentClickRef.current = false;
    });
  };

  // >>> Wrapper
  // Close only when element not on dialog
  let onWrapperClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  if (maskClosable) {
    onWrapperClick = (e) => {
      if (contentClickRef.current) {
        contentClickRef.current = false;
      } else if (wrapperRef.current === e.target) {
        onInternalClose(e);
      }
    };
  }

  function onWrapperKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (keyboard && e.keyCode === KeyCode.ESC) {
      e.stopPropagation();
      onInternalClose(e);
      return;
    }

    // keep focus inside dialog
    if (visible) {
      if (e.keyCode === KeyCode.TAB) {
        contentRef.current.changeActive(!e.shiftKey);
      }
    }
  }

  // ========================= Effect =========================
  useEffect(() => {
    if (visible) {
      setAnimatedVisible(true);
    }
    return () => {};
  }, [visible]);

  // Remove direct should also check the scroll bar update
  useEffect(
    () => () => {
      clearTimeout(contentTimeoutRef.current);
    },
    [],
  );

  useEffect(() => {
    if (animatedVisible) {
      (scrollLocker as ScrollLocker)?.lock();
      return (scrollLocker as ScrollLocker)?.unLock;
    }
    return () => {};
  }, [animatedVisible, scrollLocker]);

  // ========================= Render =========================
  return (
    <div className={`${prefixCls}-root`}>
      <Mask
        prefixCls={prefixCls}
        visible={mask && visible}
        motionName={getMotionName(prefixCls, maskTransitionName, maskAnimation)}
        style={{
          zIndex,
          ...maskStyle,
        }}
        maskProps={maskProps}
      />
      <div
        tabIndex={-1}
        onKeyDown={onWrapperKeyDown}
        className={classNames(`${prefixCls}-wrap`, wrapClassName)}
        ref={wrapperRef}
        onClick={onWrapperClick}
        role="dialog"
        aria-labelledby={title ? ariaIdRef.current : null}
        style={{
          zIndex,
          ...wrapStyle,
          display: !animatedVisible ? 'none' : null,
        }}
        {...wrapProps}
      >
        <Content
          {...props}
          onMouseDown={onContentMouseDown}
          onMouseUp={onContentMouseUp}
          ref={contentRef}
          closable={closable}
          ariaId={ariaIdRef.current}
          prefixCls={prefixCls}
          visible={visible}
          onClose={onInternalClose}
          onVisibleChanged={onDialogVisibleChanged}
          motionName={getMotionName(prefixCls, transitionName, animation)}
        />
      </div>
    </div>
  );
}
