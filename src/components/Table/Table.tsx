import { ICursorManager } from "../../network/hooks/UseCursorManager/UseCursorManager";

export interface TableRow {
    [key: string]: any;
}

/* Convenient, descriptive type aliases */
type Attribute = string;
type Header = string;

/* The <Attribute, Header> shape ensures that your ColumnConfig renders
 * the proper data in the proper column.
 *
 * Attribute:  The name of the object attribute to be rendered in the
 * column
 *
 * Header:  The column name */
export type ColumnConfig = Map<Attribute, Header>;
export type RowArray = Array<TableRow>;
export interface TableConfig {
    columns: ColumnConfig;
    rows: RowArray;
}

export interface TableProps {
    config: TableConfig;
    pageController?: ICursorManager;
}

const Table = ({ config, pageController }: TableProps) => {
    /* Renders the header row of the table from columns.values() */
    const TableHeaders = () => {
        return (
            <tr>
                {Array.from(config.columns.values()).map((val) => (
                    <th key={val} scope="col">
                        {val}
                    </th>
                ))}
            </tr>
        );
    };

    /* Iterates each row, and then uses the key value from columns.keys()
     * to render each cell in the appropriate column. */
    const TableRows = () => {
        return (
            <>
                {config.rows.map((object, rowIndex) => (
                    <tr key={rowIndex}>
                        {Array.from(config.columns.keys()).map(
                            (col, colIndex) => (
                                <td key={`${rowIndex}:${colIndex}`}>
                                    {object[col]}
                                </td>
                            )
                        )}
                    </tr>
                ))}
            </>
        );
    };

    /* Handles pagination button logic and display */
    function PaginationButtons({ values, controller }: ICursorManager) {
        return (
            <div>
                {values.hasPrev && (
                    <button
                        onClick={() => controller.goTo(values.currentIndex - 1)}
                    >
                        <span>Previous</span>
                    </button>
                )}
                {values.hasNext && (
                    <button
                        onClick={() => controller.goTo(values.currentIndex + 1)}
                    >
                        <span>Next</span>
                    </button>
                )}
            </div>
        );
    }

    return (
        <>
            <table>
                <thead>
                    <TableHeaders />
                </thead>
                <tbody>
                    <TableRows />
                </tbody>
            </table>
            {pageController ? (
                <PaginationButtons
                    values={pageController.values}
                    controller={pageController.controller}
                />
            ) : null}
        </>
    );
};

export default Table;
