import React, { useState } from "react";

import { Box, Button, Chip, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { TableComponent } from "../../components/TableComponent";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CelebrationIcon from "@mui/icons-material/Celebration";
import {
  deleteMedicalRecord,
  getMedicalRecord,
} from "../../redux/medicalRecordApiCalls";
import LinearProgress from "@mui/material/LinearProgress";
import { removeMedicalRecords } from "../../redux/medicalRecordRedux";

export const MedicalRecordListImpl = () => {
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState("s");
  const [deleteTrigger, setDeleteTrigger] = useState("s");
  const token = useSelector((state) => state.user.token);
  const medicalRecords = useSelector(
    (state) => state.medicalRecord.medicalRecords
  );

  //   const [deleteTrigger, setDeleteTrigger] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeMedicalRecords());
      const result = await getMedicalRecord(dispatch, token);
      if (result) {
        console.log("Get user data success");
        setTrigger(trigger + "s");
        setLoading(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading, deleteTrigger]);

  React.useEffect(() => {
    const getNormalUserData = async () => {
      let rowData = [];
      medicalRecords.map(
        (item) => {
          // if (item.status) {
          rowData.push({
            id: item._id,
            col1: item.medicalCondition,
            col2: item.date,
            col3: item.reportAdded,
            col4: item.medicalReport,
            col5: item.prescription,

            col6: item.event_location,
            col7: item.event_date,
            col8: item.event_time,
            col9: item.status,
            col10: item.event_image,
          });
        }
        // }
      );
      setRows(rowData);
    };
    getNormalUserData();
  }, [trigger, dispatch, deleteTrigger]);

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // alert(id);
        const status = await deleteMedicalRecord(id, dispatch, token);
        if (status) {
          setDeleteTrigger(deleteTrigger + "z");
          Swal.fire(
            "Deleted!",
            "Your MedicalRecord has been deleted.",
            "success"
          );
        } else {
          Swal.fire(
            "Can't Delete!",
            "Your MedicalRecord has not been deleted.",
            "error"
          );
        }
      }
    });
  };

  const updateItem = (id) => {
    console.log(id);
    navigate(`/updateMedicalRecord/${id}`);
  };

  const createMedicalRecord = (id) => {
    navigate(`/createMedicalRecord/${id}`);
  };

  const viewPrescription = (id, prescriptions) => {
    console.log(id);
    prescriptions.map((item) => {
      console.log(item);
    });
  };

  const wishBirthday = (data) => {
    console.log(data);
    window.location.href = `https://api.whatsapp.com/send/?phone=${data.col7}`;
  };

  const changeItem = (id) => {
    console.log(id);
    //API call
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        alert(id);
        Swal.fire("Change!", "User activation changed.", "success");
      }
    });
  };

  const viewReport = (id, url) => {
    console.log(url);
  };

  const columns = [
    // { field: "id", headerName: "MedicalRecord Id", width: 300 },
    {
      field: "col1",
      headerName: "Medical Condition",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.col10} alt="" /> */}
            {params.row.col1}
          </div>
        );
      },
    },
    { field: "col2", headerName: "Date", width: 180 },
    {
      field: "col5",
      headerName: "View Prescription",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="edit"
              size="large"
              color="warning"
              onClick={() => viewPrescription(params.row.id, params.row.col5)}
            >
              <VisibilityIcon />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "col3",
      headerName: "View Report",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {/* params.row.isCancel */}
            <Stack direction="row" alignItems="center" spacing={1}>
              {params.row.col3 ? (
                <IconButton
                  aria-label="edit"
                  size="large"
                  color="success"
                  onClick={() => viewReport(params.row.id, params.row.col4)}
                >
                  <CheckIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="error"
                  // onClick={() => changeItem(params.row.id)}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            {/* params.row.isCancel */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                aria-label="edit"
                size="large"
                color="success"
                onClick={() => updateItem(params.row.id)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                aria-label="delete"
                size="large"
                color="error"
                onClick={() => deleteItem(params.row.id)}
              >
                <DeleteIcon />
              </IconButton>

              <Button
                variant="contained"
                // color="secondary"
                endIcon={<AddIcon />}
                onClick={() => createMedicalRecord(params.row.id)}
              >
                Create
              </Button>
            </Stack>
          </>
        );
      },
    },
  ];
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        bgcolor: "#FFF",
      }}
    >
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div>
              <h2>Medical Records</h2>
            </div>
            {/* <div>
                <Button
                  variant="contained"
                  href="/createEvent"
                  // color="secondary"
                  endIcon={<AddIcon />}
                >
                  Create
                </Button>
            </div> */}

            {/* <Button variant="contained">Contained1</Button> */}
          </Grid>

          <div style={{ marginTop: "20px" }}>
            <TableComponent rows={rows} columns={columns} />
          </div>
        </div>
      )}
    </Box>
  );
};
