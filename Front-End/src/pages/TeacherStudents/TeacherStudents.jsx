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
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

const TeacherStudents = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    turma: "",
    registration: "",
  });

  // Mock data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "João Silva",
      turma: "3º Ano A",
      registration: "2024001",
    },
    {
      id: 2,
      name: "Maria Santos",
      turma: "3º Ano B",
      registration: "2024002",
    },
  ]);

  // Upload handlers remain the same...
  const handleUploadClick = () => {
    setOpenUpload(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      setUploadFile(file);
    } else {
      alert("Por favor, selecione apenas arquivos .txt");
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadFile) {
      alert("Por favor, selecione um arquivo");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      // Implement backend call here
      alert("Arquivo carregado com sucesso!");
      setOpenUpload(false);
      setUploadFile(null);
    } catch (error) {
      alert("Erro ao carregar arquivo");
    }
  };

  // Edit handlers remain the same...
  const handleEdit = (student) => {
    setEditingStudent(student);
    setOpenEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      // Implement backend call here
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingStudent.id ? editingStudent : student
        )
      );
      alert("Aluno atualizado com sucesso!");
      setOpenEdit(false);
    } catch (error) {
      alert("Erro ao atualizar aluno");
    }
  };

  // New delete handlers
  const handleDelete = (student) => {
    setDeletingStudent(student);
    setOpenDelete(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Implement backend call here
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== deletingStudent.id)
      );
      alert("Aluno removido com sucesso!");
      setOpenDelete(false);
    } catch (error) {
      alert("Erro ao remover aluno");
    }
  };

  // New add handlers
  const handleAdd = () => {
    setOpenAdd(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSubmit = async () => {
    try {
      // Implement backend call here
      const newId = Math.max(...students.map((s) => s.id)) + 1;
      setStudents((prevStudents) => [
        ...prevStudents,
        { ...newStudent, id: newId },
      ]);
      alert("Aluno adicionado com sucesso!");
      setOpenAdd(false);
      setNewStudent({ name: "", turma: "", registration: "" });
    } catch (error) {
      alert("Erro ao adicionar aluno");
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
          Gerenciamento de Alunos
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleAdd}
            sx={{
              backgroundColor: "#2e7d32",
              "&:hover": {
                backgroundColor: "#1b5e20",
              },
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Adicionar Aluno
          </Button>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={handleUploadClick}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Realizar Carga
          </Button>
        </Box>
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
              <TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Turma</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Matrícula</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f8f9fa",
                  },
                }}
              >
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.turma}</TableCell>
                <TableCell>{student.registration}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <IconButton
                      onClick={() => handleEdit(student)}
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
                      onClick={() => handleDelete(student)}
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
      <Dialog
        open={openUpload}
        onClose={() => setOpenUpload(false)}
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
          Carregar Lista de Alunos
        </DialogTitle>
        <DialogContent sx={{ padding: "32px !important" }}>
          <Typography variant="body1" sx={{ mb: 3, color: "#666" }}>
            Selecione um arquivo .txt com a lista de alunos
          </Typography>
          <input
            accept=".txt"
            style={{ display: "none" }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{
                padding: "12px",
                borderRadius: "8px",
                textTransform: "none",
                border: "2px dashed #1976d2",
                "&:hover": {
                  border: "2px dashed #115293",
                  backgroundColor: "rgba(25, 118, 210, 0.04)",
                },
              }}
            >
              {uploadFile ? uploadFile.name : "Escolher arquivo"}
            </Button>
          </label>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Button onClick={() => setOpenUpload(false)} sx={{ fontWeight: 600 }}>
            Cancelar
          </Button>
          <Button
            onClick={handleUploadSubmit}
            variant="contained"
            sx={{
              fontWeight: 600,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
	  <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #d32f2f 0%, #c62828 100%)",
            color: "white",
            fontSize: "1.5rem",
            padding: "24px 32px",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Confirmar Exclusão
        </DialogTitle>
        <DialogContent sx={{ padding: "32px !important" }}>
          <Typography variant="body1">
            Tem certeza que deseja remover o aluno{" "}
            <strong>{deletingStudent?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Button onClick={() => setOpenDelete(false)} sx={{ fontWeight: 600 }}>
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ fontWeight: 600 }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Student Dialog */}
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
            background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
            color: "white",
            fontSize: "1.5rem",
            padding: "24px 32px",
            fontWeight: 600,
            textAlign: "center",
            fontFamily: "Verdana, sans-serif",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          Adicionar Novo Aluno
        </DialogTitle>
        <DialogContent sx={{ padding: "32px !important" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              name="name"
              label="Nome"
              value={newStudent.name}
              onChange={handleAddChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <TextField
              name="turma"
              label="Turma"
              value={newStudent.turma}
              onChange={handleAddChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <TextField
              name="registration"
              label="Matrícula"
              value={newStudent.registration}
              onChange={handleAddChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Button onClick={() => setOpenAdd(false)} sx={{ fontWeight: 600 }}>
            Cancelar
          </Button>
          <Button
            onClick={handleAddSubmit}
            variant="contained"
            color="success"
            sx={{ fontWeight: 600 }}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal de Edição */}
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
            fontFamily: "Verdana, sans-serif",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          Editar Aluno
        </DialogTitle>
        <DialogContent sx={{ padding: "32px !important" }}>
          {editingStudent && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                name="name"
                label="Nome"
                value={editingStudent.name}
                onChange={handleEditChange}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
              <TextField
                name="turma"
                label="Turma"
                value={editingStudent.turma}
                onChange={handleEditChange}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
              <TextField
                name="registration"
                label="Matrícula"
                value={editingStudent.registration}
                onChange={handleEditChange}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Button onClick={() => setOpenEdit(false)} sx={{ fontWeight: 600 }}>
            Cancelar
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            sx={{
              fontWeight: 600,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherStudents;
