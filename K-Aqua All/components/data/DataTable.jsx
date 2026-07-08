import React from 'react';

/** K-Aqua DataTable — technische Tabelle mit Primary-Kopflinie und Hover-Zeilen. */
export function DataTable({ head, rows }) {
  return (
    <table className="k-table">
      <thead>
        <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}
