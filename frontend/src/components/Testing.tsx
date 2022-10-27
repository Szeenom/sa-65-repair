
import React, { useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { UsersInterface } from "../models/IUser";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link as RouterLink } from "react-router-dom";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const RoomNumber = () => [
  { label: 101 },
  { label: 102 },
  { label: 103 },
  { label: 104 },
  { label: 105 },
  { label: 106 },
  { label: 107 },
  { label: 108 },
  { label: 109 },
  { label: 201 },
  { label: 202 },
  { label: 203 },
  { label: 204 },
  { label: 206 },

];
const Time = () => [
  { label: '1 เทอม' },
  { label: '2 เทอม' },
  { label: '3 เทอม' },
  { label: '1 ปี 1 เทอม' },
  { label: '1 ปี 2 เทอม' },
  { label: '1 ปี 3 เทอม' },


];




export default function Testing() {

    const [users, setUsers] = React.useState<UsersInterface[]>([]);
  
    const ListRoom = async () => {
  
      const apiUrl = "http://localhost:8080/Booking";
  
      const requestOptions = {
  
        method: "GET",
  
        headers: { "Content-Type": "application/json" },
  
      };
  
  
      fetch(apiUrl, requestOptions)
  
        .then((response) => response.json())
  
        .then((res) => {
  
          console.log(res.data);
  
          if (res.data) {
  
            setUsers(res.data);
  
          }
  
        });
  
    };
  
    useEffect(() => {
  
      ListRoom();
  
    }, []);







  const [value, setValue] = React.useState<Date | null>(null);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper>

          <Box
            display={"flex"}
            sx={{
              marginTop: 2,
              px: 2,

            }}

          >
            <Typography

              component="h2"

              variant="h6"

              color="primary"

              gutterBottom

            >

              Booking Room
            </Typography>


          </Box>
          <hr />
          <Grid container spacing={2}>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <p>Room</p>
              <Autocomplete
                disablePortal
                id="combo-box-room"
                options={RoomNumber()}
                fullWidth={true}

                renderInput={(params) => <TextField {...params} label="Room" />}
              />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2} />

            <Grid item xs={4}>
              <p>Time</p>

              <Autocomplete
                disablePortal
                id="combo-box-time"
                options={Time()}
                fullWidth={true}

                renderInput={(params) => <TextField {...params} label="Time" />}
              />

            </Grid>

            <Grid item xs={4} >
              <p>Check in date</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={11}>
              <Button

                style={{ float: "right" }}

                // onClick={submit}

                variant="contained"

                color="primary"

              >

                Submit

              </Button>
            </Grid>
            {/* <Grid item xs={2} /> */}
            <Grid item xs={12} />
          </Grid>

        </Paper>


      </Container>
    </React.Fragment >
  );
}

