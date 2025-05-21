
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const DataTable = ({ columns, data, searchable = true, pagination = true, rowsPerPageOptions = [10, 25, 50, 100] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  
  // Filter data based on search term
  const filteredData = searchable && searchTerm
    ? data.filter(row => 
        Object.values(row).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = pagination
    ? filteredData.slice(startIndex, startIndex + rowsPerPage)
    : filteredData;
  
  // Handle pagination
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  return (
    <div className="w-full">
      {searchable && (
        <div className="mb-4 flex justify-between items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md w-full max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                        {column.render ? column.render(row) : row[column.accessor]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {pagination && totalPages > 0 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              className="border rounded px-2 py-1 text-sm"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {rowsPerPageOptions.map(option => (
                <option key={option} value={option}>
                  {option} per page
                </option>
              ))}
            </select>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 rounded border disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <div className="flex items-center">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => goToPage(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded ${
                        currentPage === pageNum
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 rounded border disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
