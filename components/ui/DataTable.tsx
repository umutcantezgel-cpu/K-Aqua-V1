import React from "react";
import clsx from "clsx";

export type DataTableProps = React.TableHTMLAttributes<HTMLTableElement>;

export const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="w-full overflow-x-auto rounded-lg border border-card-border">
        <table
          ref={ref}
          className={clsx(
            "w-full border-collapse text-[15px] text-start",
            "[&_th]:font-heading [&_th]:font-bold [&_th]:text-start [&_th]:p-3 [&_th]:px-4 [&_th]:border-b-2 [&_th]:border-primary [&_th]:whitespace-nowrap [&_th]:text-foreground [&_th]:bg-card",
            "[&_td]:p-3 [&_td]:px-4 [&_td]:border-b [&_td]:border-card-border [&_td]:text-muted-foreground [&_td]:transition-colors [&_td]:duration-fast [&_td]:bg-card",
            "[&_tr:hover_td]:!bg-primary-soft [&_tr:hover_td]:!text-foreground",
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

DataTable.displayName = "DataTable";
