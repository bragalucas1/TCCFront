// TeacherActivities.jsx
import React, { useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import FileService from "../../services/File/FileService";

const TeacherActivities = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [deletingActivity, setDeletingActivity] = useState(null);
  const [newActivity, setNewActivity] = useState({
    title: "",
    type: "",
    content: "",
    pdfFile: null,
    sourceCodeFile: null,
  });

  // Mock data
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Prova 1",
      type: "Prova",
      content: "Conteúdo básico de Python",
    },
    {
      id: 2,
      title: "Lista de Exercícios 1",
      type: "Lista de Exercícios",
      content: "Estruturas de repetição",
    },
  ]);

  const activityTypes = [
    "Prova",
    "Exercício",
    "Trabalho",
    "Material de Estudo",
    "Lista de Exercícios",
  ];

  const handleAdd = () => {
    setOpenAdd(true);
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setOpenEdit(true);
  };

  const handleDelete = (activity) => {
    setDeletingActivity(activity);
    setOpenDelete(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChangePDF = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      if (isEditing) {
        setEditingActivity((prev) => ({
          ...prev,
          pdfFile: file,
        }));
      } else {
        setNewActivity((prev) => ({
          ...prev,
          pdfFile: file,
        }));
      }
    } else {
      alert("Por favor, selecione apenas arquivos PDF");
    }
  };

  const handleFileChangeSourceCode = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".py")) {
      if (isEditing) {
        setEditingActivity((prev) => ({
          ...prev,
          sourceCodeFile: file,
        }));
      } else {
        setNewActivity((prev) => ({
          ...prev,
          sourceCodeFile: file,
        }));
      }
    } else {
      alert("Por favor, selecione apenas arquivos .py");
    }
  };

  const handleAddSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newActivity.title);
      formData.append("type", newActivity.type);
      formData.append("content", newActivity.content);
      formData.append("pdfFile", newActivity.pdfFile);
      formData.append("sourceCodeFile", newActivity.sourceCodeFile);

      const result = await FileService.uploadActivityFile(formData);
      if (result) {
        const newId = Math.max(...activities.map((a) => a.id)) + 1;
        setActivities((prev) => [...prev, { ...newActivity, id: newId }]);
        alert("Atividade cadastrada com sucesso!");
        setOpenAdd(false);
        setNewActivity({
          title: "",
          type: "",
          content: "",
          pdfFile: null,
          sourceCodeFile: null,
        });
      }
    } catch (error) {
      alert("Erro ao cadastrar atividade");
    }
  };

  const handleEditSubmit = async () => {
    try {
      // Implement backend call here
      setActivities((prev) =>
        prev.map((activity) =>
          activity.id === editingActivity.id ? editingActivity : activity
        )
      );
      alert("Atividade atualizada com sucesso!");
      setOpenEdit(false);
    } catch (error) {
      alert("Erro ao atualizar atividade");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      // Implement backend call here
      setActivities((prev) =>
        prev.filter((activity) => activity.id !== deletingActivity.id)
      );
      alert("Atividade removida com sucesso!");
      setOpenDelete(false);
    } catch (error) {
      alert("Erro ao remover atividade");
    }
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          mt: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "#333",
          }}
        >
          Gerenciamento de Atividades
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#115293",
            },
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          Adicionar Atividade
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 600 }}>Título</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Conteúdo</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow
                key={activity.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f8f9fa",
                  },
                }}
              >
                <TableCell>{activity.title}</TableCell>
                <TableCell>{activity.type}</TableCell>
                <TableCell>{activity.content}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <IconButton
                      onClick={() => handleEdit(activity)}
                      color="primary"
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.04)",
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(activity)}
                      color="error"
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(211, 47, 47, 0.04)",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Activity Dialog */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)",
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
          }}
        >
          Cadastrar nova atividade
        </DialogTitle>
        <DialogContent sx={{ padding: "32px !important" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="title"
              label="Título"
              value={newActivity.title}
              onChange={handleChange}
              fullWidth
            />
            <FormControl fullWidth>
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
            <TextField
              name="content"
              label="Conteúdo"
              value={newActivity.content}
              onChange={handleChange}
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <input
                accept="application/pdf"
                style={{ display: "none" }}
                id="pdf-upload"
                type="file"
                onChange={(e) => handleFileChangePDF(e, false)}
              />
              <label htmlFor="pdf-upload">
                <Button variant="contained" component="span">
                  <CloudUploadIcon sx={{ mr: 1 }} />
                  {newActivity.pdfFile
                    ? newActivity.pdfFile.name
                    : "Upload PDF"}
                </Button>
              </label>
              <input
                accept=".py"
                style={{ display: "none" }}
                id="source-code-upload"
                type="file"
                onChange={(e) => handleFileChangeSourceCode(e, false)}
              />
              <label htmlFor="source-code-upload">
                <Button variant="contained" component="span">
                  <CloudUploadIcon sx={{ mr: 1 }} />
                  {newActivity.sourceCodeFile
                    ? newActivity.sourceCodeFile.name
                    : "Upload Código"}
                </Button>
              </label>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "16px 32px",
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            onClick={() => setOpenAdd(false)}
            color="inherit"
            sx={{ textTransform: "none", color: "#1976d2" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddSubmit}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", backgroundColor: "#1976d2" }}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)",
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
          }}
        >
          Editar Atividade
        </DialogTitle>
        <DialogContent sx={{ padding: "32px !important" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              name="title"
              label="Título"
              value={editingActivity?.title || ""}
              onChange={handleEditChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Tipo de Atividade</InputLabel>
              <Select
                name="type"
                value={editingActivity?.type || ""}
                onChange={handleEditChange}
                label="Tipo de Atividade"
              >
                {activityTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="content"
              label="Conteúdo"
              value={editingActivity?.content || ""}
              onChange={handleEditChange}
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <input
                accept="application/pdf"
                style={{ display: "none" }}
                id="pdf-upload-edit"
                type="file"
                onChange={(e) => handleFileChangePDF(e, true)}
              />
              <label htmlFor="pdf-upload-edit">
                <Button variant="contained" component="span">
                  <CloudUploadIcon sx={{ mr: 1 }} />
                  {editingActivity?.pdfFile
                    ? editingActivity.pdfFile.name
                    : "Upload PDF"}
                </Button>
              </label>
              <input
                accept=".py"
                style={{ display: "none" }}
                id="source-code-upload-edit"
                type="file"
                onChange={(e) => handleFileChangeSourceCode(e, true)}
              />
              <label htmlFor="source-code-upload-edit">
                <Button variant="contained" component="span">
                  <CloudUploadIcon sx={{ mr: 1 }} />
                  {editingActivity?.sourceCodeFile
                    ? editingActivity.sourceCodeFile.name
                    : "Upload Código"}
                </Button>
              </label>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 32px", justifyContent: "center" }}>
          <Button
            onClick={() => setOpenEdit(false)}
            color="inherit"
            sx={{
              textTransform: "none",
              color: "#1976d2",
              justifyContent: "center",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", backgroundColor: "#1976d2" }}
          >
            Salvar Alterações
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Activity Dialog */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#b71c1c", // Vermelho escuro
            fontSize: "1.5rem",
            padding: "24px 32px",
            fontWeight: 600,
            textAlign: "center",
            fontFamily: "Verdana, sans-serif",
          }}
        >
          Excluir Atividade
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", padding: "24px" }}>
          <Typography>
            Tem certeza de que deseja excluir a atividade "
            {deletingActivity?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
          <Button
            onClick={() => setOpenDelete(false)}
            color="inherit"
            sx={{
              textTransform: "none",
              color: "#1976d2",
              justifyContent: "center",
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            sx={{
              justifyContent: "center",
              backgroundColor: "#f28b82", // Vermelho claro
              color: "white",
              "&:hover": {
                backgroundColor: "#e57373",
              },
              boxShadow: "0 4px 12px rgba(243, 57, 57, 0.2)",
            }}
          >
            Confirmar Exclusão
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherActivities;
