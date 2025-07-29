/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TableProps } from "@/types/table";
import DropMenu from "./DropMenu";
import { CustomPagination } from "./CustomPagination";

const CustomTable = <T extends { id: string | number }>({
  tableHead,
  items,
  actions,
  customRender = {},
  total,
}: TableProps<T>) => {
  const renderHead = (
    <>
      {tableHead.map((head) => (
        <TableHead
          key={head.id}
          className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 text-center"
        >
          {head.label}
        </TableHead>
      ))}
      {actions && actions.length > 0 && (
        <TableHead className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 text-right"></TableHead>
      )}
    </>
  );

  const renderCells = items.map((item) => (
    <TableRow
      key={item.id}
      className="hover:bg-gray-50 transition-colors duration-200"
    >
      {tableHead.map((head) => (
        <TableCell
          key={head.id}
          className="p-5 text-sm text-gray-800 text-center"
        >
          {customRender?.[head.id as keyof T]
            ? customRender[head.id as keyof T]?.(item)
            : (item as any)[head.id]}
        </TableCell>
      ))}
      {actions && actions.length > 0 && (
        <TableCell className="p-5 text-center">
          <DropMenu items={actions} item={item} />
        </TableCell>
      )}
    </TableRow>
  ));

  return (
    <>
      <div className="w-full overflow-hidden rounded-xl min-h-96 shadow-lg border border-gray-200">
        <Table className="w-full">
          <TableHeader>
            <TableRow>{renderHead}</TableRow>
          </TableHeader>
          <TableBody>{renderCells}</TableBody>
        </Table>
      </div>
      {total > 1 && <CustomPagination total={total} />}
    </>
  );
};

export default CustomTable;
