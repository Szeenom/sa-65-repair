import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RepairInterface } from "../interfaces/IRepair";
import { GetRepair } from "../services/HttpClientService";

function Repair() {
  const [repairs, setRepairs] = useState<RepairInterface[]>([]);

  useEffect(() => {
    getRepair();
  }, []);

  const getRepair = async () => {
    let res = await GetRepair();
    if (res) {
        setRepairs(res);
    } 
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Student",
      headerName: "รหัสนักศึกษา",
      width: 250,
      valueFormatter: (params) => params.value.STUDENT_NUMBER,
    },
    {
        field: "Room",
        headerName: "ห้อง",
        width: 150,
        valueFormatter: (params) => params.value.ID,
      },
    {
      field: "Furniture",
      headerName: "เฟอร์นิเจอร์",
      width: 150,
      valueFormatter: (params) => params.value.Furniture_type,
    },

    { field: "Comment", headerName: "Comment", width: 250},
  ];

  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการแจ้งซ่อม
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/Repair/create"
              variant="contained"
              color="primary"
            >
              แจ้งซ่อม
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={repairs}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Repair;