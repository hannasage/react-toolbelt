import { screen, renderWithRouter } from "../TestUtils";

import Table, { ColumnConfig, RowArray, TableProps } from "./Table";

const fakeColumns: ColumnConfig = new Map([
    ["one", "Column One"],
    ["two", "Column Two"],
]);
const fakeRows: RowArray = [
    { one: "value one", two: "value two" },
    { one: "value one again", two: "value two again" },
];
const fakeTableProps: TableProps = {
    columns: fakeColumns,
    rows: fakeRows,
};

describe("Table", () => {
    beforeEach(() => renderWithRouter(<Table {...fakeTableProps} />));
    test("Column names render", async () => {
        const headerOne = await screen.findByText("Column One");
        const headerTwo = await screen.findByText("Column Two");

        expect(headerOne).toBeInTheDocument();
        expect(headerTwo).toBeInTheDocument();
    });

    test("Row values render", async () => {
        const rowOne = await screen.findByText("value two");
        const rowTwo = await screen.findByText("value two again");

        expect(rowOne).toBeInTheDocument();
        expect(rowTwo).toBeInTheDocument();
    });
});
