import React, { useMemo } from 'react';
import { useGlobalFilter, usePagination, useTable } from 'react-table';
import { COLUMNS } from './columns';
import GlobalFilterInput from './GlobalFilterInput';
import MOCK_DATA from './MOCK_DATA.json';
import './table.css';

const PaginationTable = () => {
	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => MOCK_DATA, []);

	const tableInstance = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		usePagination
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		setPageSize,
		gotoPage,
		pageOptions,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		prepareRow,
		state,
		setGlobalFilter,
	} = tableInstance;

	const { globalFilter, pageIndex, pageSize } = state;

	const handlePageNumber = (e, pageNumber) => {
		gotoPage(pageNumber);
		Array.from(e.target.parentElement.children).forEach((ele) => {
			ele.className = '';
		});
		e.target.className = 'active';
	};

	return (
		<div className='table-container'>
			<h2>Pagination Table</h2>
			<div className='table-top-bar'>
				<GlobalFilterInput
					filter={globalFilter}
					setFilter={setGlobalFilter}
				/>
				<select
					value={pageSize}
					onChange={(e) => setPageSize(Number(e.target.value))}
				>
					{[5, 10, 15, 20, 25, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
			{/* apply the table props */}
			<table {...getTableProps()}>
				<thead>
					{
						// Loop over the header rows
						headerGroups.map((headerGroup) => (
							// Apply the header row props
							<tr {...headerGroup.getHeaderGroupProps()}>
								{
									// Loop over the headers in each row
									headerGroup.headers.map((column) => (
										// Apply the header cell props
										<th {...column.getHeaderProps()}>
											{
												// Render the header
												column.render('Header')
											}
										</th>
									))
								}
							</tr>
						))
					}
				</thead>
				{/* Apply the table body props */}
				<tbody {...getTableBodyProps()}>
					{
						// Loop over the table rows
						page.map((row) => {
							// Prepare the row for display
							prepareRow(row);
							return (
								// Apply the row props
								<tr {...row.getRowProps()}>
									{
										// Loop over the rows cells
										row.cells.map((cell) => {
											// Apply the cell props
											return (
												<td {...cell.getCellProps()}>
													{
														// Render the cell contents
														cell.render('Cell')
													}
												</td>
											);
										})
									}
								</tr>
							);
						})
					}
				</tbody>
			</table>
			<div className='table-pagination-bar'>
				<div className='table-pagination-buttons'>
					<button
						className='prev'
						onClick={previousPage}
						disabled={!canPreviousPage}
					>
						Previous
					</button>
					<div className='numeric-buttons'>
						{pageOptions.map((pageNumber) => (
							<button
								key={pageNumber}
								onClick={(e) => handlePageNumber(e, pageNumber)}
							>
								{pageNumber + 1}
							</button>
						))}
					</div>
					<button
						className='next'
						onClick={nextPage}
						disabled={!canNextPage}
					>
						Next
					</button>
				</div>

				<div>
					<span className='pagination-count'>
						<strong>Page:</strong> {pageIndex + 1} of{' '}
						{pageOptions.length}
					</span>
				</div>
			</div>
		</div>
	);
};

export default PaginationTable;
