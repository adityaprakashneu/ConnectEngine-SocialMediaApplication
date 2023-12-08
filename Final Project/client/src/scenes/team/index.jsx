import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [selected, setSelected] = useState("Dashboard");
  const [user, setUser] = useState(null);

  const selectedRows = document.querySelectorAll(
    '.MuiDataGrid-row[aria-selected="true"]'
  );

  selectedRows.forEach((row) => {
    const dataId = row.getAttribute("data-id");
    console.log(dataId);
  });

  console.log(token);

  const getAllUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/getAll`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const deleteUser = async (dataId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/delete/${dataId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const handleDeleteClick = () => {
    const selectedRows = document.querySelectorAll(
      '.MuiDataGrid-row[aria-selected="true"]'
    );

    selectedRows.forEach((row) => {
      const dataId = row.getAttribute("data-id");
      console.log(dataId);
      deleteUser(dataId)
    });
  };

  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1.25 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row }) => (
        <Typography>{`${row.firstName} ${row.lastName}`}</Typography>
      ),
    },
    {
      field: "occupation",
      headerName: "Occupation",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.75,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 0.75,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.4,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { email } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              email.endsWith("admin@socialnetwork.com")
                ? colors.greenAccent[600]
                : email.endsWith("manager@socialnetwork.com")
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {email.endsWith("admin@socialnetwork.com") && (
              <>
                <AdminPanelSettingsOutlinedIcon />
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  Admin
                </Typography>
              </>
            )}
            {email.endsWith("manager@socialnetwork.com") && (
              <>
                <SecurityOutlinedIcon />
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  Manager
                </Typography>
              </>
            )}
            {!email.endsWith("admin@socialnetwork.com") &&
              !email.endsWith("manager@socialnetwork.com") && (
                <>
                  <LockOpenOutlinedIcon />
                  <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                    User
                  </Typography>
                </>
              )}
          </Box>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: () => <DeleteIcon onClick={handleDeleteClick()} />,
    },
  ];
