import React from "react";
import { View } from "react-native";

import { Table } from "react-native-table-component";

import styles from "./styles";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

export default function Body({ tableHeadData, tableData }) {
    const {
        tableArea,
    } = styles;

    return (
        <View style={tableArea}>
            <Table>
                <TableHead tableHeadData={tableHeadData} />
                <TableBody tableData={tableData} />
            </Table>
        </View>
    );
};
