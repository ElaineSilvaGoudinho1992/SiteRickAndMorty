import React from 'react';

const Filter = ({ filterStatus, onFilterChange }) => {
  return (
    <div className="filter">
      <label htmlFor="status-filter">Status:</label>
      <select id="status-filter" value={filterStatus} onChange={onFilterChange}>
        <option value="">Todos (All)</option>
        <option value="alive">Vivo (Alive)</option>
        <option value="dead">Morto (Dead)</option>
        <option value="unknown">Desconhecido (Unknown)</option>
      </select>
    </div>
  );
};

export default Filter;