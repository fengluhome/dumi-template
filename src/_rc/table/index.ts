import Table, { INTERNAL_HOOKS, TableProps } from './Table';
import { FooterComponents as Summary } from './Footer';
import Column from './sugar/Column';
import ColumnGroup from './sugar/ColumnGroup';
import { INTERNAL_COL_DEFINE } from './utils/legacyUtil';

export {
  Summary,
  Column,
  ColumnGroup,
  INTERNAL_COL_DEFINE,
  INTERNAL_HOOKS,
  TableProps,
};

export default Table;
