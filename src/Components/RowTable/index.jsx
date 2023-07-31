import React from 'react'

function RowTable({ dataRow, columns, columnsHeaders }) {

  return (
    <tr className="bg-white text-gray-900 border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
      {Object.keys(columns).map((column, key) => {
        return (
          <td
            key={key}
            scope="row"
            className={`${key == 0 ? "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" : "px-6 py-4"}
                        ${!columnsHeaders.find(columnHeader => columnHeader.columnName == [column])?.showMobile && "hidden md:table-cell"}`}
          >
            {column === "acoes" ? columns[column](dataRow) : dataRow[column] !== null ? columns[column](dataRow[column]) : ""}
          </td>
        )
      })}
    </tr>
  )
}

export default RowTable