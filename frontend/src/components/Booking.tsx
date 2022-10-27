import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BookingInterface } from "../interfaces/IBooking";
import { GetBooking } from "../services/HttpClientService";

function Booking() {
  const [bookings, setBookings] = useState<BookingInterface[]>([]);

  useEffect(() => {
    getBooking();
  }, []);

  const getBooking = async () => {
    let res = await GetBooking();
    if (res) {
      setBookings(res);
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
      field: "Time",
      headerName: "ระยะเวลา",
      width: 150,
      valueFormatter: (params) => params.value.Time_number,
    },
    {
      field: "Room",
      headerName: "ห้อง",
      width: 150,
      valueFormatter: (params) => params.value.ID,
    },
    { field: "Check_in_date", headerName: "วันที่เช็คอิน", width: 250 },
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
              ข้อมูลการจองห้องพัก
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/Booking/create"
              variant="contained"
              color="primary"
            >
              จองห้องพัก
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={bookings}
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

export default Booking;