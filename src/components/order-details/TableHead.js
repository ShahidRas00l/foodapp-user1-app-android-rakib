import React from "react";

import { Cell, TableWrapper } from "react-native-table-component";

import styles from "./styles";

export default function TableHead({ tableHeadData }) {
    const {
        tableHead,
        tableText,
        tableTextRight,
    } = styles;

    return (
        <TableWrapper style={tableHead}>
            {tableHeadData.map((item, index) => (
                <Cell
                    key={index}
                    data={item}
                    textStyle={[tableText, index === 2 && tableTextRight]}
                />
            ))}
        </TableWrapper>
    );
};
