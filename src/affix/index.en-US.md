---
category: Components
type: Navigation
title: Affix
cover: https://gw.alipayobjects.com/zos/alicdn/tX6-md4H6/Affix.svg
---

Wrap Affix around another component to make it stick the viewport.

## When To Use

On longer web pages, it's helpful to stick component into the viewport. This is common for menus and actions.

Please note that Affix should not cover other content on the page, especially when the size of the viewport is small.

### Basic Usage

<code src="./demo/single.tsx" height="300px"/>

## API

| Property     | Description                                        | Type              | Default      |
| ------------ | -------------------------------------------------- | ----------------- | ------------ |
| offsetBottom | Offset from the bottom of the viewport (in pixels) | number            | -            |
| offsetTop    | Offset from the top of the viewport (in pixels)    | number            | 0            |
| target       | Specifies the scrollable area DOM node             | () => HTMLElement | () => window |
| onChange     | Callback for when Affix state is changed           | function(affixed) | -            |

**Note:** Children of `Affix` must not have the property `position: absolute`, but you can set `position: absolute` on `Affix` itself:

```jsx | pure
<Affix style={{ position: 'absolute', top: y, left: x }}>...</Affix>
```

## FAQ

### Affix bind container with `target`, sometime move out of container.

We don't listen window scroll for performance consideration. You can add listener if you still want: <https://codesandbox.io/s/2xyj5zr85p>

Related issues：[#3938](https://github.com/ant-design/ant-design/issues/3938) [#5642](https://github.com/ant-design/ant-design/issues/5642) [#16120](https://github.com/ant-design/ant-design/issues/16120)
