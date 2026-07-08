/** Technische Datentabelle (Dimensionen, SDR-Stufen, Artikellisten). */
export interface DataTableProps {
  /** Spaltenköpfe */
  head: string[];
  /** Zeilen als Zellen-Arrays */
  rows: React.ReactNode[][];
}
