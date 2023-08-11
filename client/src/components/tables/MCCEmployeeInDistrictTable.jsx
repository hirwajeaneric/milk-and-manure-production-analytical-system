import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const columns = [
  {
    field: 'fullName',
    headerName: 'Name',
    // width: 250,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    // width: 150,
  },
  {
    field: 'status',
    headerName: 'Status',
    // width: 150,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    // width: 70,
    renderCell: (params) => <TableActions parameters= {params} />
  },
]

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export const TableStyles = {
  padding: '0px',
  width: '100%',
  height: '250px',
  background: 'white', 
}

var rows = [];

export default function MCCEmployeeInDistrictTable({data}) {
  rows = data;

  return (
    <Box sx={TableStyles}>
      <DataGrid
        rowHeight={38}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[20]}
        disableSelectionOnClick
        experimentalFeatures={{newEditingApi: true}}
        // components={{Toolbar: CustomToolbar}}
      />
    </Box>
  );
};

// Table actions
const TableActions = ({parameters}) => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Box>
      <Tooltip title='View / Edit'>
        <IconButton onClick={() => {navigate(parameters.row.id)}}>
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
};