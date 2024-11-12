// Ticket.js
import React from 'react';

function Ticket({ ticket }) {
  return (
    <div className="ticket">
      <h4>{ticket.title}</h4>
      <p>Priority: {['No Priority', 'Low', 'Medium', 'High', 'Urgent'][ticket.priority]}</p>
      <p>Status: {ticket.status}</p>
      <p>Assigned to: {ticket.assigned_to?.name || 'Unassigned'}</p>
    </div>
  );
}

export default Ticket;
