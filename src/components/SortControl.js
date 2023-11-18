import React from 'react';

const SortControl = ({ currentSelection, onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="sort-control">
      <label>Sort by:</label>
      <select value={currentSelection} onChange={handleSortChange}>
        <option value="release_date">Release Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortControl;
