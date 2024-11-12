// KanbanBoard.js
import React, { useState, useEffect } from 'react';
import { fetchTickets } from './api';
import Ticket from './Ticket';
import './kanban.css';

const groupOptions = {
  status: 'Status',
  user: 'User',
  priority: 'Priority',
};

const sortOptions = {
  priority: 'Priority',
  title: 'Title',
};

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('kanban-grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('kanban-sorting') || 'priority');

  useEffect(() => {
    fetchTickets().then(setTickets).catch(console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban-grouping', grouping);
    localStorage.setItem('kanban-sorting', sorting);
  }, [grouping, sorting]);

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sorting === 'priority') return b.priority - a.priority;
    if (sorting === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const groupedTickets = sortedTickets.reduce((acc, ticket) => {
    const key = grouping === 'status' ? ticket.status
                : grouping === 'user' ? ticket.assigned_to.name
                : ticket.priority;

    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  return (
    <div>
      <div className="controls">
        <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
          {Object.entries(groupOptions).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
          {Object.entries(sortOptions).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      <div className="kanban-board">
        {Object.entries(groupedTickets).map(([group, tickets]) => (
          <div key={group} className="kanban-column">
            <h3>{group}</h3>
            {tickets.map(ticket => <Ticket key={ticket.id} ticket={ticket} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
