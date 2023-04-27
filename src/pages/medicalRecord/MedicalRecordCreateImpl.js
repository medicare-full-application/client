import React, { useState } from "react";
import { Box, Button, Chip, Grid, MenuItem, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";

import app from "../../firebase";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMedicalRecord } from "../../redux/medicalRecordApiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const MedicalRecordCreateImpl = () => {
  const [type, settype] = useState("");
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [sizeForm, setSizeForm] = useState(6);

  const [event_nameError, setevent_nameError] = useState(false);
  const [doctorFeeError, setDoctorFeeError] = useState(false);
  const [medicineFeeError, setMedicineFeeError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);

  const [event_nameMessageError, setevent_nameMessageError] = useState("");
  const [doctorFeeMessageError, setDoctorFeeMessageError] = useState("");
  const [medicineFeeMessageError, setMedicineFeeMessageError] = useState("");
  const [descriptionMessageError, setdescriptionMessageError] = useState("");

  const patientId = window.location.pathname.split("/")[2];

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.currentUser._id);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const data = new FormData(e.currentTarget);

    let formData = {
      medicalCondition: data.get("medicalCondition"),
      prescription: data.get("prescription"),
      doctorFee: data.get("doctorFee"),
      medicineFee: data.get("medicineFee"),
      user_id: userId,
    };

    if (!data.get("medicalCondition")) {
      setevent_nameError(true);
      setevent_nameMessageError("Medical Condition can't be empty!");
    } else if (!data.get("prescription")) {
      setdescriptionError(true);
      setdescriptionMessageError("Description can't be empty!");
    } else if (!data.get("doctorFee")) {
      setdescriptionError(true);
      setdescriptionMessageError("Doctor fee can't be empty!");
    }else if (!data.get("medicineFee")) {
      setdescriptionError(true);
      setdescriptionMessageError("Medicine fee can't be empty!");
    }else {

      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prevProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + prevProgress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Image added unsuccess!",
          });
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            let userData = {
              ...formData,
              medicalReport: downloadURL,
              recordBy: userId,
              recordFor: patientId,
              reportAdded: downloadURL ? true : false
            };

            const status = addMedicalRecord(userData, token);

            if (status) {
              Swal.fire({
                title: "Success!",
                text: "Medical Record added success!",
                icon: "success",
                confirmButtonText: "Ok",
                confirmButtonColor: "#378cbb",
                // showConfirmButton: false,
                // timer: 2000,
              });
              navigate("/medicalRecord");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Medical Record added unsuccess!",
              });
            }
          });
        }
      );
    }

    console.log(formData);
  };

  return (
    <Grid container direction="column">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h3">Create Medical Record</Typography>
        </Grid>
        <Button variant="contained" color="third" href="/patient" startIcon={<ArrowBackIcon />}>
          Back
        </Button>
      </Grid>
      <Box
        sx={{
          my: 1,
          mx: 4,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleClick}
          className="productForm"
          sx={{ m: 5 }}
        >
          {/* <div className="productFormLeft"> */}
          <Grid container spacing={4}>
            {/* <Grid item md={10}> */}
            <Grid container spacing={4}>
              <Grid item md={sizeForm}>
                <TextField
                  error={event_nameError}
                  // defaultValue={employeeNo}
                  // variant="standard"
                  // disabled
                  margin="normal"
                  required
                  fullWidth
                  id="medicalCondition"
                  label="Medical Condition"
                  name="medicalCondition"
                  autoComplete="medicalCondition"
                  autoFocus
                  helperText={event_nameMessageError}
                  onClick={(e) => {
                    setevent_nameError(false);
                    setevent_nameMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>
              
              
              <Grid item md={sizeForm}>
                <TextField
                  // error={imageError}
                  // defaultValue={null}
                  // variant="standard"
                  type="file"
                  margin="normal"
                  // required
                  fullWidth
                  id="file"
                  label="Upload Medical Report"
                  name="file"
                  autoComplete="file"
                  autoFocus
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // helperText={imageMessageError}
                  onChange={(e) => {
                    // setImageError(false);
                    // setImageMessageError("");
                    setFile(e.target.files[0]);
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  error={doctorFeeError}
                  // defaultValue={employeeNo}
                  // variant="standard"
                  // disabled
                  type="number"
                  margin="normal"
                  required
                  fullWidth
                  id="doctorFee"
                  label="Doctor Fee(Rs.)"
                  name="doctorFee"
                  autoComplete="doctorFee"
                  autoFocus
                  helperText={doctorFeeMessageError}
                  onClick={(e) => {
                    setDoctorFeeError(false);
                    setDoctorFeeMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item md={sizeForm}>
                <TextField
                  error={medicineFeeError}
                  // defaultValue={employeeNo}
                  // variant="standard"
                  // disabled
                  type="number"
                  margin="normal"
                  required
                  fullWidth
                  id="medicineFee"
                  label="Medicine Fee(Rs.)"
                  name="medicineFee"
                  autoComplete="medicineFee"
                  autoFocus
                  helperText={medicineFeeMessageError}
                  onClick={(e) => {
                    setMedicineFeeError(false);
                    setMedicineFeeMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  error={descriptionError}
                  // defaultValue={product.fullname}
                  // variant="standard"
                  multiline
                  margin="normal"
                  required
                  fullWidth
                  id="prescription"
                  label="Prescription"
                  name="prescription"
                  autoComplete="prescription"
                  autoFocus
                  helperText={descriptionMessageError}
                  onChange={(e) => {
                    setdescriptionError(false);
                    setdescriptionMessageError("");
                    // handleChange();
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              {/* <Grid item md={sizeForm}></Grid> */}
              <Grid
                item
                md={12}
                container
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  size="large"
                  color="primary"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};
