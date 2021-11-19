import React from "react";

import { Cell, TableWrapper } from "react-native-table-component";

import styles from "./styles";

export default function TableBody({ tableData }) {
    const {
        tableBody,
        tableText,
        tableTextRight,
    } = styles;

    return (
        tableData.map((rowData, index) => (
            <TableWrapper
                key={index}
                style={tableBody}>
                {rowData.map((cellData, cellIndex) => (
                    <Cell
                        key={cellIndex}
                        data={cellData}
                        textStyle={[tableText, cellIndex === 2 && tableTextRight]}
                    />
                ))}
            </TableWrapper>
        ))
    );
};
