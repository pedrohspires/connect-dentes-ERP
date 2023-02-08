import React, { useEffect, useState } from 'react'
import RowTable from '../RowTable';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';

function Table({ columnsHeaders, rows, columns }) {
  const [ordenedRows, setOrdenedRows] = useState(rows);
  const [ordenableColumns, setOrdenableColumns] = useState([]);

  const ordenaTabela = (byColumn) => {
    let rowsTemp = ordenedRows;

    rowsTemp.sort((row1, row2) => {
      if(row1[byColumn] > row2[byColumn])
        return ordenableColumns[byColumn].crescente ? -1 : 1;

      if(row1[byColumn] < row2[byColumn])
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

  useEffect(() => setOrdenedRows(rows), [rows]);
  useEffect(() => getOrdenableColumns(), []);

  return (
    <div className="relative overflow-x-auto rounded-xl">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columnsHeaders.map((column, key) => 
              <th 
                key={key} 
                scope="col" 
                className={`px-6 py-3 
                           ${(column.titulo == "Ações" || column.titulo == "Id") && "w-24"} 
                           ${column.ordenavel && "cursor-pointer"}`}
                onClick={() => {
                  if(column.ordenavel)
                    ordenaTabela(column.columnName);
                }}
              >
                <div className='flex justify-between'>
                  <span>{column.titulo}</span>
                  {column.ordenavel && (ordenableColumns[column.columnName]?.crescente ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />)}
                </div>
              </th>)}
          </tr>
        </thead>
        <tbody>
          {ordenedRows.map((row, key) => {
            return <RowTable key={key} dataRow={row} columns={columns} />;
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table