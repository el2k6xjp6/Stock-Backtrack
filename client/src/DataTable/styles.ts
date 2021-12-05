import styled from 'styled-components';

export const Table = styled.table`
  width: 90%;
  margin: 50px 5%;
  text-align: -webkit-center;
  padding: 10px;
  font-size: 1.8rem;
  border:2px #26648E solid;
  border-radius: 4px;
`

export const TableRow = styled.tr`
  height: 50px;
  width: 100%;
`

export const AddButton = styled.div`
  width: calc(100% - 8px);
  background-color: #26648E;
  border-radius: 30px;
  margin: 8px 4px;
  line-height: 46px;
  color: #FFFFFF;
  border:2px #000000 solid;
`

export const Symbol = styled.td`
  width: 30%;
  line-height: 46px;
`

export const Cost = styled.td`
  width: 30%;
  line-height: 46px;
`

export const Amount = styled.td`
  width: 10%;
  text-align: center;
  line-height: 46px;
`

export const Date = styled.td`
  width: 30%;
  text-align: right;
  line-height: 46px;
`

export const DeleteButton = styled.div`
  width: calc(25% - 8px);
  background-color: #26648E;
  line-height: 46px;
  margin: 0 4px;
  color: #FFFFFF;
  border-radius: 30px;
  border:2px #000000 solid;
`