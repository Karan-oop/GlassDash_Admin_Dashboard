import React, { useState } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const eventDays = new Set([3, 8, 15, 22, 27]);

export default function Calendar() {
  const [date, setDate] = useState(new Date(2025, 0, 1));
  const [selected, setSelected] = useState(1);

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const prev = () => setDate(new Date(year, month - 1, 1));
  const next = () => setDate(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, other: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, other: false });
  while (cells.length % 7 !== 0) { cells.push({ day: cells.length - daysInMonth - firstDay + 1, other: true }); }

  return (
    <div className="glass-card calendar-card">
      <div className="cal-header">
        <div>
          <div className="section-title">{MONTHS[month]} {year}</div>
        </div>
        <div className="cal-nav">
          <button className="cal-nav-btn" onClick={prev}>‹</button>
          <button className="cal-nav-btn" onClick={next}>›</button>
        </div>
      </div>
      <div className="cal-grid">
        {DAYS.map((d) => <div key={d} className="cal-day-header">{d}</div>)}
        {cells.map((cell, i) => (
          <div
            key={i}
            className={[
              'cal-day',
              cell.other ? 'other-month' : '',
              !cell.other && cell.day === selected ? 'today' : '',
              !cell.other && eventDays.has(cell.day) && cell.day !== selected ? 'has-event' : '',
            ].join(' ')}
            onClick={() => !cell.other && setSelected(cell.day)}
          >
            {cell.day}
          </div>
        ))}
      </div>
    </div>
  );
}
