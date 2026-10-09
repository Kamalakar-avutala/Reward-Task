import Table from "react-bootstrap/Table";
import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  emptyMessage?: string;
}

const DataTable = <T,>({
  columns,
  data,
  rowKey,
  emptyMessage = "No records found.",
}: DataTableProps<T>) => {
  return (
    <Table responsive hover bordered className="align-middle">
      <thead className="table-light">
        <tr>
          {columns.map((column) => (
            <th key={column.key}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="text-center py-4 text-muted"
            >
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(row)
                    : String(
                        (row as Record<string, unknown>)[column.key] ?? ""
                      )}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default DataTable;