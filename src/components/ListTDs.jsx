import React from 'react';

const data = [
  { processName: 'הרשמה לישוב', linkToThread: 'MLC', numberOfProcesses: 1 },
  // Add more data objects as needed
];

const ListTds = () => {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={tableHeaderStyle}>שם תהליך</th>
          <th style={tableHeaderStyle}>קישור לתהליך</th>
          <th style={tableHeaderStyle}>מספר תהליכים מושלמים</th>
          <th style={tableHeaderStyle}>עריכה</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td style={tableCellStyle}>{row.processName}</td>
            <td style={tableCellStyle}>{row.linkToThread}</td>
            <td style={tableCellStyle}>{row.numberOfProcesses}</td>
            <td style={tableCellStyle}><button style={editButtonStyle}>עריכה</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'right',
  background: 'gray',
    color: '#fff'
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

const editButtonStyle = {
  background: '#4CAF50',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  cursor: 'pointer',
};

export default ListTds;
