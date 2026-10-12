import React from 'react';

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="filter-bar">
      <div style={{ flex: 1, minWidth: '220px' }}>
        <input
          type="text"
          placeholder="Search by title, description or project..."
          className="search-input"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      <select
        className="select-filter"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="All">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        className="select-filter"
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
      >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select
        className="select-filter"
        value={filters.sortBy}
        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
      >
        <option value="">Sort: Newest</option>
        <option value="deadline_asc">Deadline: Soonest first</option>
        <option value="deadline_desc">Deadline: Latest first</option>
      </select>
    </div>
  );
}
