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

import { RoomInterface } from "../interfaces/IRoom";
import { FurnitureInterface } from "../interfaces/IFurniture";
import { StudentInterface } from "../interfaces/IStudent";
import { RepairInterface } from "../interfaces/IRepair";

import {
  GetRooms,
  GetFurniture,
  RepairRooms,
  GetStudent,
} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RepairCreate() {
  const [Rooms, setRooms] = useState<RoomInterface[]>([]);
  const [Furnitures, setFurnitures] = useState<FurnitureInterface []>([]);
  const [Students, setStudents] = useState<StudentInterface[]>([]);
  const [RepairRoom, setRepair] = useState<Partial<RepairInterface>>({});

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
    const name = event.target.name as keyof typeof RepairCreate;
    setRepair({
      ...RepairRoom,
      [name]: event.target.value,
    });
  };
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof RepairRoom;
    const { value } = event.target;
    setRepair({ ...RepairRoom, [id]: value });
    
  };

  const getRooms = async () => {
    let res = await GetRooms();
    if (res) {
      setRooms(res);
    }
  };

  const getFurnitures = async () => {
    let res = await GetFurniture();
    if (res) {
        setFurnitures(res);
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
    getFurnitures();
    getStudent();

  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      Room_id: convertType(RepairRoom.Room_id),
      Furniture_id: convertType(RepairRoom.Furniture_id),
      STUDENT_ID: convertType(RepairRoom.STUDENT_ID),
      Comment:RepairRoom.Comment,
    };
    console.log(data);
    let res = await RepairRooms(data);
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
              ระบบแจ้งซ่อม
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
                value={RepairRoom.Room_id + ""}
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
              <p>เฟอร์นิเจอร์</p>
              <Select
                native
                value={RepairRoom.Furniture_id+ ""}
                onChange={handleChange}
                inputProps={{
                  name: "Furniture_id",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือก
                </option>
                {Furnitures.map((item: FurnitureInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Furniture_type}
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
                value={RepairRoom.STUDENT_ID + ""}
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
            <p>Comment</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Comment"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกคอมเมนต์"
                value={RepairRoom.Comment || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/Repair"
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

export default RepairCreate;