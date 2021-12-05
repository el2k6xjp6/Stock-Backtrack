import React, { useState } from "react";
import {
  Table,
  TableRow,
  Symbol,
  Cost,
  Amount,
  Date,
} from "./styles";

const Row = (props: RowType) => {
  const { symbol, cost, amount, date } = props;
  return (
    <TableRow>
      <Symbol>{symbol}</Symbol>
      <Cost>{cost}</Cost>
      <Amount>{amount}</Amount>
      <Date>{date}</Date>
    </TableRow>
  );
};

type RowType = {
  symbol: string;
  cost: number;
  amount: number;
  date: string;
};

type Props = {
  quotes: Array<RowType>;
};

export const DataTable = (props: Props) => {
  const { quotes } = props;
  return (
    <Table>
      <thead>
        <tr>
          <Symbol>Symbol</Symbol>
          <Cost>Cost</Cost>
          <Amount>Shares</Amount>
          <Date>Date</Date>
        </tr>
        </thead>
      <tbody>
        {quotes.map((row: RowType) => {
          return Row({ ...row });
        })}
      </tbody>
    </Table>
  );
};
