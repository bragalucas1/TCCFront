import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import {
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import "./TeacherHome.css";
import FileService from "../../services/File/FileService";

const TeacherHomepage = () => {
  const [open, setOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    type: "",
    content: "",
    pdfFile: null,
    sourceCodeFile: null,
  });

  const activityTypes = [
    "Prova",
    "Exercício",
    "Trabalho",
    "Material de Estudo",
    "Lista de Exercícios",
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewActivity({
      title: "",
      type: "",
      pdfFile: null,
      sourceCodeFile: null,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", newActivity.title);
    formData.append("type", newActivity.type);
    formData.append("content", newActivity.content || "");
    formData.append("pdfFile", newActivity.pdfFile);
    formData.append("sourceCodeFile", newActivity.sourceCodeFile);
    try {
      const result = await FileService.uploadActivityFile(formData);
      if (result) {
        alert("Atividade cadastrada com sucesso!");
      }
    } catch (error) {
      alert("Falha ao cadastrar atividade");
    }
    console.log("Nova atividade:", newActivity);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChangePDF = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setNewActivity((prev) => ({
        ...prev,
        pdfFile: file,
      }));
    } else {
      alert("Por favor, selecione apenas arquivos PDF");
    }
  };

  const handleFileChangeSourceCode = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".py")) {
      setNewActivity((prev) => ({
        ...prev,
        sourceCodeFile: file,
      }));
    } else {
      alert("Por favor, selecione apenas arquivos .py");
    }
  };

  return (
    <Container
      disableGutters
      className="home-wrapper"
      maxWidth={false}
      style={{ padding: "20px" }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ marginTop: 10 }}
      >
        <Grid item>
          <Card
            sx={{
              width: 345,
              height: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
            onClick={handleClickOpen}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <AddIcon
                sx={{ fontSize: 60, color: "#1976d2", marginBottom: 2 }}
              />
              <Typography variant="h6" component="div">
                Cadastrar Nova Atividade
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Clique para adicionar uma nova atividade
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
            color: "white",
            fontSize: "1.5rem",
            padding: "24px 32px",
            fontWeight: 600,
            textAlign: "center",
            fontFamily: "Verdana, sans-serif",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            "& .MuiTypography-root": {
              fontSize: "1.5rem",
            },
          }}
        >
          Cadastrar Nova Atividade
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "32px !important",
            background: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <TextField
            autoFocus
            name="title"
            label="Título da Atividade"
            type="text"
            fullWidth
            variant="outlined"
            value={newActivity.title}
            onChange={handleChange}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "#f8f9fa",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                  },
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: "#1976d2",
                  },
                  background: "white",
                  boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.1)",
                },
              },
              "& .MuiFormLabel-root": {
                fontSize: "1rem",
                fontWeight: 500,
                color: "#666",
                "&.Mui-focused": {
                  color: "#1976d2",
                },
              },
              "& .MuiOutlinedInput-input": {
                padding: "16px 20px",
                fontSize: "1rem",
                fontWeight: 500,
              },
            }}
            InputProps={{
              sx: {
                "&::placeholder": {
                  color: "#aab4c5",
                  opacity: 1,
                },
              },
            }}
          />

          <TextField
            autoFocus
            name="content"
            label="Tipo de conteúdo"
            type="text"
            fullWidth
            variant="outlined"
            value={newActivity.content}
            onChange={handleChange}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "#f8f9fa",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                  },
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: "#1976d2",
                  },
                  background: "white",
                  boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.1)",
                },
              },
              "& .MuiFormLabel-root": {
                fontSize: "1rem",
                fontWeight: 500,
                color: "#666",
                "&.Mui-focused": {
                  color: "#1976d2",
                },
              },
              "& .MuiOutlinedInput-input": {
                padding: "16px 20px",
                fontSize: "1rem",
                fontWeight: 500,
              },
            }}
            InputProps={{
              sx: {
                "&::placeholder": {
                  color: "#aab4c5",
                  opacity: 1,
                },
              },
            }}
          />

          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel>Tipo de Atividade</InputLabel>
            <Select
              name="type"
              value={newActivity.type}
              onChange={handleChange}
              label="Tipo de Atividade"
            >
              {activityTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            className="file-upload-box"
            sx={{ display: "flex", justifyContent: "center", gap: 2 }}
          >
            <input
              accept="application/pdf"
              style={{ display: "none" }}
              id="pdf-upload"
              type="file"
              onChange={handleFileChangePDF}
            />
            <label htmlFor="pdf-upload">
              <Button
                variant="contained"
                component="span"
                sx={{
                  marginRight: 1,
                  transition: "background-color 0.9s",
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    color: "white",
                  },
                }}
              >
                <CloudUploadIcon />
                {newActivity.pdfFile ? newActivity.pdfFile.name : "Upload PDF"}
              </Button>
            </label>

            <input
              accept=".py"
              style={{ display: "none" }}
              id="source-code-upload"
              type="file"
              onChange={handleFileChangeSourceCode}
            />
            <label htmlFor="source-code-upload">
              <Button
                variant="contained"
                component="span"
                sx={{
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    color: "white",
                  },
                }}
              >
                <CloudUploadIcon />
                {newActivity.sourceCodeFile
                  ? newActivity.sourceCodeFile.name
                  : "Upload Código Fonte"}
              </Button>
            </label>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Button
            onClick={handleClose}
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherHomepage;
