"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Input,
} from "@nextui-org/react";

export default function NextTable({
  columns,
  rows,
}: {
  columns: any;
  rows: any;
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(columns));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(rows.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...rows];

    if (hasSearchFilter) {
      const newData = new Array();
      filteredUsers.map((item) => {
        const values = Object.values(item);
        values.shift();
        const find = values.find((element: any) =>
          element.toLowerCase().includes(filterValue.toLowerCase())
        );
        if (find) {
          newData.push(item);
        }
      });
      filteredUsers = newData;
    }

    return filteredUsers;
  }, [rows, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  return (
    <>
      <Input
        isClearable
        classNames={{
          base: "w-full sm:max-w-[44%]",
          inputWrapper: "border-1",
        }}
        placeholder="Search by name..."
        size="sm"
        //startContent={<SearchIcon className="text-default-300" />}
        value={filterValue}
        variant="bordered"
        onClear={() => setFilterValue("")}
        onValueChange={onSearchChange}
      />
      <Table
        className="border"
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          {columns.map((column: { key: string; label: string }) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody items={sortedItems}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
