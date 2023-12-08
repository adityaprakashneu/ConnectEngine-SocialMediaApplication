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
