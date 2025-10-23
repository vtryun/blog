'use client';

import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'createdAt', headerName: 'CreatedAt', width: 300 },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          // onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  },
];

export default function PostDataGrid({ rows }: { rows: any[] }) {
  const [clientRows, setClientRows] = useState<any[]>([]);

  useEffect(() => {
    setClientRows(rows);
  }, [rows]);

  if (clientRows.length === 0 && rows.length > 0) {
    return <div>Loading data...</div>;
  }

  return (
    <DataGrid rows={rows} columns={columns} isCellEditable={() => true} hideFooter/>
  );
}
