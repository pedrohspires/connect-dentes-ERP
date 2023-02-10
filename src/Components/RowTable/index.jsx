import React from 'react'

function RowTable({ dataRow, columns }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {Object.keys(columns).map((column, key) => {
        return (
          <th
            key={key}
            scope="row"
            className={key == 0 ? "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" : "px-6 py-4"}
          >
            {column === "acoes" ? columns[column](dataRow) : dataRow[column] !== null ? columns[column](dataRow[column]) : ""}
          </th>
        )
      })}
    </tr>
  )
}

export default RowTable