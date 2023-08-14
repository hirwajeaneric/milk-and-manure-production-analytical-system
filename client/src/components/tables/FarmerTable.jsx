import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { MoreHoriz, Preview } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const columns = [
  {
    field: 'fullname',
    headerName: 'Name',
    width: 200,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'district',
    headerName: 'District',
    width: 200,
  },
  {
    field: 'sector',
    headerName: 'Sector',
    width: 170,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 70,
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
  height: '270px',
  background: 'white'
}

var rows = [];

export default function FarmerTable({data}) {
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
        components={{Toolbar: CustomToolbar}}
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
          <MoreHoriz />
        </IconButton>
      </Tooltip>
    </Box>
  )
};