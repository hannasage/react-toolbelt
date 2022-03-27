/* Makes row objects string-indexed */
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

export interface TableProps {
    columns: ColumnConfig;
    rows: RowArray;
}

const Table = ({ columns, rows }: TableProps) => {
    /* Renders the header row of the table from columns.values() */
    const TableHeaders = () => {
        return (
            <tr>
                {Array.from(columns.values()).map((val) => (
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
            <tr>
                {rows.map((object, rowIndex) =>
                    Array.from(columns.keys()).map((col, colIndex) => (
                        <th key={`${rowIndex}:${colIndex}`} scope="row">
                            {object[col]}
                        </th>
                    ))
                )}
            </tr>
        );
    };

    return (
        <table>
            <thead>
                <TableHeaders />
            </thead>
            <tbody>
                <TableRows />
            </tbody>
        </table>
    );
};

export default Table;
