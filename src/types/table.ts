import type { ReactNode } from "react";

export type TableHeadItem = {
  id: string;
  label: string;
};
export type TableAction<T> = {
  icon: ReactNode;
  title: string;
  onClick: (item: T) => void;
};
export type TableCustomRender<T> = {
  [k in keyof T]?: (item: T) => ReactNode;
};
export interface TableProps<T> {
  items: T[];
  tableHead: TableHeadItem[];
  actions?: (item: T) => TableAction<T>[];
  customRender?: TableCustomRender<T>;
  total:number
}
