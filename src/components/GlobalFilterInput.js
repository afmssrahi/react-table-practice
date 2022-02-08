import React from 'react';

const GlobalFilterInput = ({ filter, setFilter }) => {
	return (
		<div>
			<span>
				<input
					className='global-search-input'
					type='text'
					value={filter || ''}
					onChange={(e) => setFilter(e.target.value)}
					placeholder='SEARCH'
				/>
			</span>
		</div>
	);
};

export default GlobalFilterInput;
