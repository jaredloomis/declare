import React from "react";

interface TableProps {
  columns: string[];
  children: React.ReactNode;
}

export function Table({ columns, children }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export interface TableRowProps {
  children: React.ReactNode;
}

Table.Row = ({ children }: TableRowProps) => {
  return <tr>{children}</tr>;
};

export interface TableCellProps {
  children: React.ReactNode;
}

Table.Cell = ({ children }: TableCellProps) => {
  return <td>{children}</td>;
};
