import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Alert,
  AlertTitle,
  Collapse,
  Fade,
  Grow,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import TeacherService from "../../services/Teacher/TeacherService";
import { CheckCircleIcon } from "lucide-react";
import FileService from "../../services/File/FileService";

const TeacherStudents = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const [shouldFetchStudents, setShouldFetchStudents] = useState(true);
  const [uploadFile, setUploadFile] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: "",
    nome: "",
    turma: "",
    matricula: "",
  });
  const [students, setStudents] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [editFeedback, setEditFeedback] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [addFeedback, setAddFeedback] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [deleteFeedback, setDeleteFeedback] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const handleUploadClick = () => {
    setOpenUpload(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      setUploadFile(file);
      setUploadFeedback({
        show: false,
        type: "",
        message: "",
      });
    } else {
      setUploadFile(null);
      setUploadFeedback({
        show: true,
        type: "error",
        message: "Por favor, selecione apenas arquivos .txt",
      });
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadFile) {
      setUploadFeedback({
        show: true,
        type: "error",
        message: "Por favor, selecione um arquivo",
      });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      const { success, alunos } = await FileService.sendFileToSaveStudents(
        formData
      );
      setShouldFetchStudents(true);
      setUploadFeedback({
        show: true,
        type: "success",
        message: `Arquivo carregado com sucesso! ${alunos.count} alunos importados.`,
      });

      setTimeout(() => {
        setOpenUpload(false);
        setUploadFile(null);
        setUploadFeedback({ show: false, type: "success", message: "" });
      }, 1000);
    } catch (error) {
      console.log(error);
      setUploadFeedback({
        show: true,
        type: "error",
        message: "Erro ao carregar arquivo",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseUpload = () => {
    setOpenUpload(false);
    setUploadFeedback({ show: false, type: "success", message: "" });
    setUploadFile(null);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await TeacherService.getAllStudents();
        setStudents(response.alunos);
        setShouldFetchStudents(false);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    if (shouldFetchStudents) {
      fetchStudents();
    }
  }, [shouldFetchStudents]);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setOpenEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingStudent((prev) => ({
      ...prev,
      [name]:
        name === "turma" && value === ""
          ? ""
          : name === "turma"
          ? Number(value)
          : value,
    }));
  };

  const handleEditSubmit = async () => {
    setIsEditing(true);
    try {
      const formattedStudent = {
        ...editingStudent,
        turma: parseInt(editingStudent.turma, 10),
        turmap: parseInt(editingStudent.turmap, 10),
      };
      const result = await TeacherService.editStudent(formattedStudent);

      setEditFeedback({
        show: true,
        type: "success",
        message: "Aluno atualizado com sucesso!",
      });

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingStudent.id ? editingStudent : student
        )
      );

      setTimeout(() => {
        setOpenEdit(false);
        setEditFeedback({ show: false, type: "success", message: "" });
      }, 1000);
    } catch (error) {
      setEditFeedback({
        show: true,
        type: "error",
        message: "Erro ao atualizar aluno. Tente novamente.",
      });
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = (student) => {
    setDeletingStudent(student);
    setOpenDelete(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const result = await TeacherService.removeStudent(deletingStudent);

      setDeleteFeedback({
        show: true,
        type: "success",
        message: "Aluno removido com sucesso!",
      });

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== deletingStudent.id)
      );

      setTimeout(() => {
        setOpenDelete(false);
        setDeleteFeedback({ show: false, type: "success", message: "" });
      }, 1000);
    } catch (error) {
      setDeleteFeedback({
        show: true,
        type: "error",
        message: "Erro ao remover aluno. Tente novamente.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

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
    setIsAdding(true);
    try {
      const formattedNewStudent = {
        ...newStudent,
        turma: parseInt(newStudent.turma, 10),
      };
      const result = await TeacherService.addStudent(formattedNewStudent);

      setAddFeedback({
        show: true,
        type: "success",
        message: "Aluno adicionado com sucesso!",
      });

      setShouldFetchStudents(true);
      const newId = Math.max(...students.map((s) => s.id)) + 1;
      setStudents((prevStudents) => [
        ...prevStudents,
        { ...newStudent, id: newId },
      ]);

      setTimeout(() => {
        setOpenAdd(false);
        setNewStudent({ nome: "", turma: "", matricula: "" });
        setAddFeedback({ show: false, type: "success", message: "" });
      }, 1000);
    } catch (error) {
      setAddFeedback({
        show: true,
        type: "error",
        message: "Erro ao adicionar aluno. Tente novamente.",
      });
    } finally {
      setIsAdding(false);
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
              <TableCell sx={{ fontWeight: 600 }}>Turma Prática</TableCell>
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
                <TableCell>{student.nome}</TableCell>
                <TableCell>{student.turma}</TableCell>
                <TableCell>{student.turmap}</TableCell>
                <TableCell>{student.matricula}</TableCell>
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
        onClose={handleCloseUpload}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Grow}
        TransitionProps={{
          timeout: 500,
        }}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)",
          },
        }}
      >
        <Fade in={openUpload} timeout={800}>
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
        </Fade>
        <DialogContent sx={{ padding: "32px !important" }}>
          <Collapse in={uploadFeedback.show}>
            <Alert
              severity={uploadFeedback.type}
              icon={
                uploadFeedback.type === "success" ? (
                  <CheckCircleIcon fontSize="inherit" />
                ) : undefined
              }
              sx={{
                mb: 3,
                alignItems: "center",
                "& .MuiAlert-icon": {
                  fontSize: "1.5rem",
                },
              }}
            >
              <AlertTitle sx={{ fontWeight: 600 }}>
                {uploadFeedback.type === "success" ? "Sucesso!" : "Atenção!"}
              </AlertTitle>
              {uploadFeedback.message}
            </Alert>
          </Collapse>

          <Fade in={openUpload} timeout={1000}>
            <Box>
              <Typography variant="body1" sx={{ mb: 3, color: "#666" }}>
                Selecione um arquivo .txt com a lista de alunos. O arquivo deve
                estar preenchido com o seguinte formato: 'nome, turma teórica,
                turma prática matricula'.
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
            </Box>
          </Fade>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Fade in={openUpload} timeout={1200}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                onClick={handleCloseUpload}
                sx={{ fontWeight: 600 }}
                disabled={isUploading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUploadSubmit}
                variant="contained"
                disabled={isUploading}
                sx={{
                  fontWeight: 600,
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#115293",
                  },
                  minWidth: "100px",
                }}
              >
                {isUploading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Enviar"
                )}
              </Button>
            </Box>
          </Fade>
        </DialogActions>
      </Dialog>
      {/* Modal de Delete com animações */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        maxWidth="sm"
        TransitionComponent={Grow}
        TransitionProps={{
          timeout: 500,
        }}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        <Fade in={openDelete} timeout={800}>
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
        </Fade>
        <DialogContent sx={{ padding: "32px !important" }}>
          <Collapse in={deleteFeedback.show}>
            <Alert
              severity={deleteFeedback.type}
              icon={
                deleteFeedback.type === "success" ? (
                  <CheckCircleIcon fontSize="inherit" />
                ) : undefined
              }
              sx={{
                mb: 3,
                alignItems: "center",
                "& .MuiAlert-icon": {
                  fontSize: "1.5rem",
                },
              }}
            >
              <AlertTitle sx={{ fontWeight: 600 }}>
                {deleteFeedback.type === "success" ? "Sucesso!" : "Atenção!"}
              </AlertTitle>
              {deleteFeedback.message}
            </Alert>
          </Collapse>
          <Fade in={openDelete} timeout={1000}>
            <Typography variant="body1">
              Tem certeza que deseja remover o aluno{" "}
              <strong>{deletingStudent?.nome}</strong>?
            </Typography>
          </Fade>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Fade in={openDelete} timeout={1200}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                onClick={() => setOpenDelete(false)}
                sx={{ fontWeight: 600 }}
                disabled={isDeleting}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                variant="contained"
                color="error"
                disabled={isDeleting}
                sx={{ fontWeight: 600, minWidth: "100px" }}
              >
                {isDeleting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Confirmar"
                )}
              </Button>
            </Box>
          </Fade>
        </DialogActions>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Grow}
        TransitionProps={{
          timeout: 500,
        }}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)",
          },
        }}
      >
        <Fade in={openAdd} timeout={800}>
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
        </Fade>
        <DialogContent sx={{ padding: "32px !important" }}>
          <Collapse in={addFeedback.show}>
            <Alert
              severity={addFeedback.type}
              icon={
                addFeedback.type === "success" ? (
                  <CheckCircleIcon fontSize="inherit" />
                ) : undefined
              }
              sx={{
                mb: 3,
                alignItems: "center",
                "& .MuiAlert-icon": {
                  fontSize: "1.5rem",
                },
              }}
            >
              <AlertTitle sx={{ fontWeight: 600 }}>
                {addFeedback.type === "success" ? "Sucesso!" : "Atenção!"}
              </AlertTitle>
              {addFeedback.message}
            </Alert>
          </Collapse>
          <Fade in={openAdd} timeout={1000}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                required
                name="nome"
                label="Nome"
                value={newStudent.nome}
                onChange={handleAddChange}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
              <TextField
                required
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
                required
                name="matricula"
                label="Matrícula"
                value={newStudent.matricula}
                onChange={handleAddChange}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>
          </Fade>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Fade in={openAdd} timeout={1200}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                onClick={() => setOpenAdd(false)}
                sx={{ fontWeight: 600 }}
                disabled={isAdding}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddSubmit}
                variant="contained"
                color="success"
                disabled={
                  isAdding ||
                  !newStudent.nome ||
                  !newStudent.turma ||
                  !newStudent.matricula
                }
                sx={{ fontWeight: 600, minWidth: "100px" }}
              >
                {isAdding ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Adicionar"
                )}
              </Button>
            </Box>
          </Fade>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Grow}
        TransitionProps={{
          timeout: 500,
        }}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)",
          },
        }}
      >
        <Fade in={openEdit} timeout={800}>
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
        </Fade>
        <DialogContent sx={{ padding: "32px !important" }}>
          <Collapse in={editFeedback.show}>
            <Alert
              severity={editFeedback.type}
              icon={
                editFeedback.type === "success" ? (
                  <CheckCircleIcon fontSize="inherit" />
                ) : undefined
              }
              sx={{
                mb: 3,
                alignItems: "center",
                "& .MuiAlert-icon": {
                  fontSize: "1.5rem",
                },
              }}
            >
              <AlertTitle sx={{ fontWeight: 600 }}>
                {editFeedback.type === "success" ? "Sucesso!" : "Atenção!"}
              </AlertTitle>
              {editFeedback.message}
            </Alert>
          </Collapse>
          {editingStudent && (
            <Fade in={openEdit} timeout={1000}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  required
                  name="nome"
                  label="Nome"
                  value={editingStudent.nome}
                  onChange={handleEditChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
                <TextField
                  required
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
                  required
                  name="turmap"
                  label="Turma Prática"
                  value={editingStudent.turmap}
                  onChange={handleEditChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
                <TextField
                  required
                  name="matricula"
                  label="Matrícula"
                  value={editingStudent.matricula}
                  onChange={handleEditChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Box>
            </Fade>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Fade in={openEdit} timeout={1200}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                onClick={() => setOpenEdit(false)}
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  "&.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.26)",
                  },
                }}
                disabled={isEditing}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleEditSubmit}
                variant="contained"
                disabled={
                  isEditing ||
                  !editingStudent?.nome ||
                  !editingStudent?.turma ||
                  !editingStudent?.matricula
                }
                sx={{
                  fontWeight: 600,
                  minWidth: "100px",
                  background:
                    "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                  },
                  "&.Mui-disabled": {
                    background: "rgba(0, 0, 0, 0.12)",
                    color: "rgba(0, 0, 0, 0.26)",
                    boxShadow: "none",
                  },
                }}
              >
                {isEditing ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Salvar"
                )}
              </Button>
            </Box>
          </Fade>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherStudents;
