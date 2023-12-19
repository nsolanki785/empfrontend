import TableBody from '@mui/material/TableBody';
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import { Paper } from '@mui/material';

const admincolumns = [
  {id: '_id', label: 'id', minWidth: 170},
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  {
    id: 'Edit',
    label: 'Edit',
    minWidth: 170,
    align: 'center',
    // format: (value) => value.toLocaleString('en-US'),
  },
 
];


const managercolumns = [
  {id: '_id', label: 'id', minWidth: 170},
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  {
    id: 'Edit',
    label: 'Edit',
    minWidth: 170,
    align: 'center',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Delete',
    label: 'Delete',
    minWidth: 170,
    align: 'center',
    // format: (value) => value.toLocaleString('en-US'),
  },  
];

const employeecolumns = [
  {id: '_id', label: 'EmployeeId', minWidth: 170},
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  {
    id: 'Edit',
    label: 'Edit',
    minWidth: 170,
    align: 'center',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Delete',
    label: 'Delete',
    minWidth: 170,
    align: 'center',
    // format: (value) => value.toLocaleString('en-US'),
  },  
];





const SharedTable = ({data,usedrole,handleEditadmindetails,handleDelete}) =>  {
  const rows = data;
  console.log("rows",rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = usedrole == "admin" ? admincolumns  : usedrole == "manager" ? managercolumns : employeecolumns
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column,index) => {
                      const value = column.id == "name" ? row['firstName'] + " " + row['lastName']  : row[column.id] ;
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                            {column.id== "Edit" &&   
                       
                       <button className='text-white bg-green-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' 
                       onClick={()=>handleEditadmindetails(row,index)}
                       >Edit</button>
                   }
                             {column.id== "Delete" &&   
     
                       <button className='text-white bg-red-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' 
                       onClick={()=>handleDelete(row._id)}
                       >Delete</button>
                   }
                        </TableCell>
                      );
                    })}
                    {/* {column.id== "completed" &&   
                        <div className="form-check form-switch d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={row.completed}/>
                    </div>  } */}
                  
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default SharedTable