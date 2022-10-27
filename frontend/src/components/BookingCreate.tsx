import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { RoomInterface } from "../interfaces/IRoom";
import { TimeInterface } from "../interfaces/ITime";
import { StudentInterface } from "../interfaces/IStudent";
import { BookingInterface } from "../interfaces/IBooking";

import {
  GetRooms,
  GetBooking,
  GetPlaylistByUID,
  GetTimes,
  BookingRooms,
  GetStudent,
} from "../services/HttpClientService";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BookingCreate() {
  const [Rooms, setRooms] = useState<RoomInterface[]>([]);
  const [Times, setTimes] = useState<TimeInterface []>([]);
  const [Students, setStudents] = useState<StudentInterface[]>([]);
  const [BookingRoom, setBooking] = useState<BookingInterface>({
    Check_in_date: new Date(),
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof BookingRoom;
    setBooking({
      ...BookingRoom,
      [name]: event.target.value,
    });
  };

  const getRooms = async () => {
    let res = await GetRooms();
    if (res) {
      setRooms(res);
    }
  };

  const getTimes = async () => {
    let res = await GetTimes();
    if (res) {
      setTimes(res);
    }
  };

  const getStudent = async () => {
    let res = await GetStudent();
    if (res) {
      setStudents(res);
    }
  };

  useEffect(() => {
    getRooms();
    getTimes();
    getStudent();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      Room_id: convertType(BookingRoom.Room_id),
      TimeID: convertType(BookingRoom.TimeID),
      STUDENT_ID: convertType(BookingRoom.STUDENT_ID),
      Check_in_date:BookingRoom.Check_in_date,
    };
    console.log(data);
    let res = await BookingRooms(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ระบบจองห้องพัก
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลขห้อง</p>
              <Select
                native
                value={BookingRoom.Room_id + ""}
                onChange={handleChange}
                inputProps={{
                  name: "Room_id",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือก
                </option>
                {Rooms.map((item: RoomInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ระยะเวลาเข้าพัก</p>
              <Select
                native
                value={BookingRoom.TimeID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "TimeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกระยะเวลาเข้าพัก
                </option>
                {Times.map((item: TimeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Time_number}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <p>รหัสนักศึกษา</p>
              <Select
                native
                value={BookingRoom.STUDENT_ID + ""}
                onChange={handleChange}
                
                inputProps={{
                  name: "STUDENT_ID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกรหัสนักศึกษา
                </option>
                {Students.map((item: StudentInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.STUDENT_NUMBER}
                  </option>
                ))}
              </Select>
            </FormControl>
             
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่เช็คอิน</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={BookingRoom.Check_in_date}
                  onChange={(newValue) => {
                    setBooking({
                      ...BookingRoom,
                      Check_in_date: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/Booking"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default BookingCreate;