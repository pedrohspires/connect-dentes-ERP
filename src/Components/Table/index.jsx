import React from 'react'
import RowTable from '../RowTable';

function Table({ columnsHeaders, rows, columns }) {
  return (
    <div className="relative overflow-x-auto rounded-xl">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columnsHeaders.map((column, key) => <th key={key} scope="col" className={`px-6 py-3 ${(column == "Ações" || column == "Id") && "w-24"}`}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, key) => {
            return <RowTable key={key} dataRow={row} columns={columns} />;
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table