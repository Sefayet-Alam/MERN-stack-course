import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// Use environment variable for API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL;

if (!API_BASE_URL) {
  console.error("REACT_APP_API_URL environment variable is not set.");
}

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [data, setData] = useState({ blogs: [], teams: [], services: [] });
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEntity, setCurrentEntity] = useState("");
  const [currentRow, setCurrentRow] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    if (!token) {
      console.error("Authorization token is missing!");
      return;
    }

    try {
      const blogsResponse = await axios.get(`${API_BASE_URL}/blogs`, {
        headers: { Authorization: `${token}` },
      });
      const teamsResponse = await axios.get(`${API_BASE_URL}/teams`, {
        headers: { Authorization: `${token}` },
      });
      const servicesResponse = await axios.get(`${API_BASE_URL}/services`, {
        headers: { Authorization: `${token}` },
      });
      setData({
        blogs: blogsResponse.data,
        teams: teamsResponse.data,
        services: servicesResponse.data,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    if (!token) {
      console.error("Authorization token is missing!");
      return;
    }

    try {
      const url = currentRow?._id
        ? `${API_BASE_URL}/${currentEntity}/${currentRow._id}`
        : `${API_BASE_URL}/${currentEntity}`;
      const method = currentRow?._id ? "put" : "post";

      console.log("Saving Data:", formData);
      const response = await axios[method](url, formData, {
        headers: { Authorization: `${token}` },
      });

      console.log("Save Successful:", response.data);
      fetchData();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDelete = async (entity, id) => {
    if (!token) {
      console.error("Authorization token is missing!");
      return;
    }

    console.log("Deleting ID:", id);
    try {
      const response = await axios.delete(`${API_BASE_URL}/${entity}/${id}`, {
        headers: { Authorization: `${token}` },
      });

      console.log("Delete Successful:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleOpenDialog = (entity, row = null) => {
    setCurrentEntity(entity);
    setCurrentRow(row);

    const initialFormData = row ||
      (entity === "blogs"
        ? { title: "", content: "", author: "", image: "" }
        : entity === "teams"
        ? { name: "", role: "", image: "", bio: "" }
        : { name: "", description: "", icon: "" });

    setFormData(initialFormData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({});
    setCurrentRow(null);
    setCurrentEntity("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderTable = (entity, rows, columns) => (
    <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
      <Typography variant="h6" sx={{ margin: 2 }}>
        {entity.charAt(0).toUpperCase() + entity.slice(1)}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              {columns.map((column) => (
                <TableCell key={column}>
                  {column === "image" || column === "icon" ? (
                    <img
                      src={row[column]}
                      alt={column}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    row[column]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <Button onClick={() => handleOpenDialog(entity, row)}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(entity, row._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Dashboard
      </Typography>

      <Button
        variant="contained"
        onClick={() => handleOpenDialog("blogs")}
        sx={{ marginBottom: 4 }}
      >
        Create Blog
      </Button>
      {renderTable("blogs", data.blogs, ["title", "author", "image", "content"])}

      <Button
        variant="contained"
        onClick={() => handleOpenDialog("teams")}
        sx={{ marginBottom: 4 }}
      >
        Create Team Member
      </Button>
      {renderTable("teams", data.teams, ["name", "role", "image", "bio"])}

      <Button
        variant="contained"
        onClick={() => handleOpenDialog("services")}
        sx={{ marginBottom: 4 }}
      >
        Create Service
      </Button>
      {renderTable("services", data.services, ["name", "description", "icon"])}

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{currentRow ? "Edit" : "Create"} {currentEntity}</DialogTitle>
        <DialogContent>
          {Object.keys(formData).map((key) => (
            <TextField
              key={key}
              margin="dense"
              label={key}
              name={key}
              value={formData[key] || ""}
              onChange={handleInputChange}
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
