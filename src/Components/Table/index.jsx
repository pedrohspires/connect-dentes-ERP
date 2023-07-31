import React, { useEffect, useState } from 'react'
import RowTable from '../RowTable';
import EmptyTable from '../EmptyTable';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';

function Table({ columnsHeaders, rows, columns }) {
  const [ordenedRows, setOrdenedRows] = useState(rows);
  const [ordenableColumns, setOrdenableColumns] = useState([]);

  const ordenaTabela = (byColumn) => {
    let rowsTemp = ordenedRows;

    rowsTemp.sort((row1, row2) => {

      if(columns[byColumn](row1[byColumn]) > columns[byColumn](row2[byColumn]))
        return ordenableColumns[byColumn].crescente ? -1 : 1;

      if(columns[byColumn](row1[byColumn]) < columns[byColumn](row2[byColumn]))
        return ordenableColumns[byColumn].crescente ? 1 : -1;

      return 0;
    });

    setOrdenableColumns({...ordenableColumns, [byColumn]: {crescente: !ordenableColumns[byColumn].crescente}});
    setOrdenedRows(rowsTemp);
  }

  const getOrdenableColumns = () => {
    let ordenableColumns = {};

    for(let column of columnsHeaders){
      if(column.ordenavel){
        ordenableColumns = {...ordenableColumns, [column.columnName]: {crescente: true}}
      }
    };

    setOrdenableColumns(ordenableColumns);
  }

  function getIconeOrdenacao(column) {
    return column.ordenavel && (ordenableColumns[column.columnName]?.crescente ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />);
  }

  function listaLinhasDaTabela() {
    return ordenedRows.length > 0
      &&
      ordenedRows.map((row, key) => {
        return <RowTable key={key} dataRow={row} columns={columns} columnsHeaders={columnsHeaders} />;
      });
  }

  useEffect(() => setOrdenedRows(rows), [rows]);
  useEffect(() => getOrdenableColumns(), []);
  
  return (
    <div className="relative overflow-x-auto rounded-xl">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-900 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-100">
          <tr>
            {columnsHeaders.map((column, key) => 
              <th 
                key={key} 
                scope="col" 
                className={`px-6 py-3 
                           ${(column.titulo == "Ações" || column.titulo == "Id") && "w-24"} 
                           ${column.ordenavel && "cursor-pointer"}
                           ${!column.showMobile && "hidden md:table-cell"}`}
                onClick={() => {
                  if(column.ordenavel)
                    ordenaTabela(column.columnName);
                }}
              >
                <div className='flex justify-between'>
                  <span>{column.titulo}</span>
                  {getIconeOrdenacao(column)}
                </div>
              </th>)}
          </tr>
        </thead>
        <tbody>
          { listaLinhasDaTabela() }
        </tbody>
      </table>
      {ordenedRows.length == 0 && <EmptyTable />}
    </div>
  )
}

export default Table