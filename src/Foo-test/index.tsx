import React from 'react';

export interface IHelloProps {
  /**
   * 可以这样写属性描述 设置属性名称
   * @description       也可以显式加上描述名 设置属性名称
   * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述
   * @default       123
   */

  title?: string; // 支持识别 TypeScript 可选类型为非必选属性

  /**
   * 可以这样写属性描述 设置属性名称
   * @description       也可以显式加上描述名 设置属性名称
   * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述
   * @default  1
   */

  type?: string;
}
export default ({ title }: IHelloProps) => {
  return <h1>{title}</h1>;
};
