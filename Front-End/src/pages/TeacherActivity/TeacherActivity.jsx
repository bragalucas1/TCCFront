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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  CircularProgress,
  AlertTitle,
  Collapse,
  Grow,
  Alert,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import FileService from "../../services/File/FileService";
import { CheckCircleIcon } from "lucide-react";
import ActivitiesService from "../../services/Activities/ActivitiesService";
import UserService from "../../services/User/UserService";

import CodeIcon from "@mui/icons-material/Code";
const TeacherActivities = () => {
  const initialActivityState = {
    nome: "",
    tipo: "",
    conteudo: "",
    caminho_pdf: null,
    caminho_codigo_base: null,
  };
  const [editingActivity, setEditingActivity] = useState(null);
  const [shoudFetchActivities, setShouldFetchActivities] = useState(true);
  const [activities, setActivities] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deletingActivity, setDeletingActivity] = useState(null);
  const [newActivity, setNewActivity] = useState(initialActivityState);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);
  const [deleteFeedback, setDeleteFeedback] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [openSubmissions, setOpenSubmissions] = useState(false);
  const [selectedActivitySubmissions, setSelectedActivitySubmissions] =
    useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addFeedback, setAddFeedback] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    nome: false,
    tipo: false,
    conteudo: false,
    caminho_pdf: false,
    caminho_codigo_base: false,
  });
  const [openCodeModal, setOpenCodeModal] = useState(false);
  const [editFeedback, setEditFeedback] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [editValidationErrors, setEditValidationErrors] = useState({
    nome: false,
    tipo: false,
    conteudo: false,
  });

  const getFileName = (path) => {
    if (!path) return "";
    const partsBackslash = path.split("\\");
    if (partsBackslash.length > 1) {
      return partsBackslash.pop();
    }
    const partsSlash = path.split("/");
    return partsSlash.pop();
  };

  const displayFileName = (file, path) => {
    if (file) {
      return file.name;
    } else if (path) {
      return getFileName(path);
    }
    return "";
  };

  const handleCloseAdd = () => {
    if (!isSubmitting) {
      setNewActivity(initialActivityState);
      setValidationErrors({});
      setSelectedPdf(null);
      setSelectedCode(null);
      setOpenAdd(false);
    }
  };

  const handleCloseEdit = () => {
    if (!isSubmittingEdit) {
      setEditingActivity(null);
      setSelectedPdf(null);
      setSelectedCode(null);
      setEditValidationErrors({});
      setOpenEdit(false);
    }
  };

  const validateForm = () => {
    const errors = {
      nome: !newActivity.nome.trim(),
      tipo: !newActivity.tipo.trim(),
      conteudo: !newActivity.conteudo.trim(),
      caminho_pdf: !selectedPdf,
      caminho_codigo_base: !selectedCode,
    };

    setValidationErrors(errors);

    let errorMessage = "";
    if (errors.caminho_pdf && errors.caminho_codigo_base) {
      errorMessage = "É necessário fazer upload do PDF e do código fonte.";
    } else if (errors.caminho_pdf) {
      errorMessage = "É necessário fazer upload do arquivo PDF.";
    } else if (errors.caminho_codigo_base) {
      errorMessage = "É necessário fazer upload do código fonte.";
    }

    if (errorMessage) {
      setAddFeedback({
        show: true,
        type: "warning",
        message: errorMessage,
      });
      return false;
    }

    if (errors.nome || errors.tipo || errors.conteudo) {
      setAddFeedback({
        show: true,
        type: "error",
        message: "Por favor, preencha todos os campos obrigatórios.",
      });
      return false;
    }

    return true;
  };

  const activityTypes = [
    "Prova",
    "Exercício",
    "Trabalho",
    "Material de Estudo",
    "Lista de Exercícios",
  ];

  const getStatusIcon = (status) => {
    return status === "Correto" ? (
      <CheckCircleIcon sx={{ color: "success.main" }} />
    ) : (
      <CancelIcon sx={{ color: "error.main" }} />
    );
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await ActivitiesService.getAllActivities();
        setActivities(response.atividades);
        setShouldFetchActivities(false);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      }
    };

    if (shoudFetchActivities) {
      fetchActivities();
    }
  }, [shoudFetchActivities]);

  const handleAdd = () => {
    setSelectedCode(null);
    setSelectedPdf(null);
    setOpenAdd(true);
  };

  const handleEdit = (activity) => {
    setEditFeedback({ show: false, type: "success", message: "" });
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
    if (file) {
      setSelectedPdf(file);
      if (isEditing && editingActivity) {
        setEditingActivity({
          ...editingActivity,
          caminho_pdf: file.name,
        });
      }
    } else {
      setNewActivity((prev) => ({
        ...prev,
        caminho_pdf: file,
      }));
    }
  };

  const handleFileChangeSourceCode = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedCode(file);
      if (isEditing && editingActivity) {
        setEditingActivity({
          ...editingActivity,
          caminho_codigo_base: file.name,
        });
      }
    } else {
      setNewActivity((prev) => ({
        ...prev,
        caminho_codigo_base: file,
      }));
    }
  };

  const EmptyState = () => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        height: "calc(100vh - 200px)",
        position: "absolute",
        top: "100px",
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <SearchIcon
        sx={{
          fontSize: 60,
          color: "grey.400",
          mb: 2,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: "grey.400",
          fontWeight: "normal",
        }}
      >
        Nenhuma atividade encontrada.
      </Typography>
    </Box>
  );

  const handleAddSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setAddFeedback({ show: false, type: "success", message: "" });

    try {
      const formData = new FormData();
      formData.append("nome", newActivity.nome);
      formData.append("tipo", newActivity.tipo);
      formData.append("conteudo", newActivity.conteudo);

      if (selectedPdf) {
        formData.append("caminho_pdf", selectedPdf);
      }
      if (selectedCode) {
        formData.append("caminho_codigo_base", selectedCode);
      }

      const result = await FileService.uploadActivityFile(formData);

      if (result) {
        const newId = Math.max(...activities.map((a) => a.id)) + 1;
        setActivities((prev) => [...prev, { ...newActivity, id: newId }]);
        setShouldFetchActivities(true);
        setAddFeedback({
          show: true,
          type: "success",
          message: "Atividade cadastrada com sucesso!",
        });

        setTimeout(() => {
          setOpenAdd(false);
          setNewActivity({
            nome: "",
            tipo: "",
            conteudo: "",
            caminho_pdf: null,
            caminho_codigo_base: null,
          });
          setSelectedPdf(null);
          setSelectedCode(null);
          setAddFeedback({ show: false, type: "success", message: "" });
        }, 1500);
      }
    } catch (error) {
      setAddFeedback({
        show: true,
        type: "error",
        message: "Erro ao cadastrar atividade. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEditForm = () => {
    const errors = {
      nome: !editingActivity?.nome?.trim(),
      tipo: !editingActivity?.tipo?.trim(),
      conteudo: !editingActivity?.conteudo?.trim(),
    };

    setEditValidationErrors(errors);

    if (errors.nome || errors.tipo || errors.conteudo) {
      setEditFeedback({
        show: true,
        type: "error",
        message: "Por favor, preencha todos os campos obrigatórios.",
      });
      return false;
    }

    return true;
  };

  const handleEditSubmit = async () => {
    if (!validateEditForm()) return;

    setIsSubmittingEdit(true);
    setEditFeedback({ show: false, type: "success", message: "" });

    try {
      const formData = new FormData();
      formData.append("id", editingActivity.id);
      formData.append("nome", editingActivity.nome);
      formData.append("tipo", editingActivity.tipo);
      formData.append("conteudo", editingActivity.conteudo);

      if (selectedPdf) {
        formData.append("caminho_pdf", selectedPdf);
      }
      if (selectedCode) {
        formData.append("caminho_codigo_base", selectedCode);
      }

      await ActivitiesService.editActivity(formData);

      setActivities((prev) =>
        prev.map((activity) =>
          activity.id === editingActivity.id ? editingActivity : activity
        )
      );
      setShouldFetchActivities(true);
      setEditFeedback({
        show: true,
        type: "success",
        message: "Atividade atualizada com sucesso!",
      });

      setTimeout(() => {
        setOpenEdit(false);
        setEditFeedback({ show: false, type: "success", message: "" });
        setEditingActivity(null);
        setSelectedPdf(null);
        setEditingActivity(null);
      }, 1500);
    } catch (error) {
      setEditFeedback({
        show: true,
        type: "error",
        message: "Erro ao atualizar atividade. Tente novamente.",
      });
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await ActivitiesService.deleteActivity(
        deletingActivity.id,
        deletingActivity.nome
      );

      setDeleteFeedback({
        show: true,
        type: "success",
        message: "Atividade removida com sucesso!",
      });

      setActivities((prev) =>
        prev.filter((activity) => activity.id !== deletingActivity.id)
      );

      setTimeout(() => {
        setOpenDelete(false);
        setSelectedPdf(null);
        setSelectedCode(null);
        setDeleteFeedback({ show: false, type: "success", message: "" });
      }, 1000);
    } catch (error) {
      setDeleteFeedback({
        show: true,
        type: "error",
        message: "Erro ao remover atividade. Tente novamente.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewSubmissions = (activity) => {
    console.log(activity);
    setSelectedActivitySubmissions(activity);
    setOpenSubmissions(true);
  };

  const handleViewCode = (code) => {
    console.log(code);
    setSelectedCode(code);
    setOpenCodeModal(true);
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
      {activities.length > 0 ? (
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
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Submissões
                </TableCell>
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
                  <TableCell>{activity.nome}</TableCell>
                  <TableCell>{activity.tipo}</TableCell>
                  <TableCell>{activity.conteudo}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AssignmentIcon />}
                      onClick={() => handleViewSubmissions(activity)}
                      sx={{
                        textTransform: "none",
                        borderRadius: "8px",
                      }}
                    >
                      Ver Submissões
                    </Button>
                  </TableCell>
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
      ) : (
        <EmptyState />
      )}
      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
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
        </Fade>

        <DialogContent sx={{ padding: "32px !important" }}>
          <Collapse in={addFeedback.show}>
            <Alert
              severity={addFeedback.type}
              icon={
                addFeedback.type === "success" ? (
                  <CheckCircleIcon fontSize="inherit" />
                ) : addFeedback.type === "warning" ? (
                  <WarningIcon fontSize="inherit" />
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
                {addFeedback.type === "success"
                  ? "Sucesso!"
                  : addFeedback.type === "warning"
                  ? "Atenção!"
                  : "Erro!"}
              </AlertTitle>
              {addFeedback.message}
            </Alert>
          </Collapse>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="nome"
              label="Título"
              value={newActivity.nome}
              onChange={handleChange}
              fullWidth
              error={validationErrors.nome}
              helperText={validationErrors.nome && "Campo obrigatório"}
              required
            />
            <FormControl fullWidth error={validationErrors.type} required>
              <InputLabel>Tipo de Atividade</InputLabel>
              <Select
                name="tipo"
                value={newActivity.tipo}
                onChange={handleChange}
                label="Tipo de Atividade"
              >
                {activityTypes.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors.tipo && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 1.5 }}
                >
                  Campo obrigatório
                </Typography>
              )}
            </FormControl>
            <TextField
              name="conteudo"
              label="Conteúdo"
              value={newActivity.conteudo}
              onChange={handleChange}
              fullWidth
              error={validationErrors.conteudo}
              helperText={validationErrors.conteudo && "Campo obrigatório"}
              required
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <input
                accept="application/pdf"
                style={{ display: "none" }}
                id="pdf-upload-edit"
                type="file"
                onChange={(e) => handleFileChangePDF(e, true)}
              />
              <label htmlFor="pdf-upload-edit">
                <Button
                  variant="contained"
                  component="span"
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  <CloudUploadIcon sx={{ mr: 1 }} />
                  {displayFileName(selectedPdf, newActivity?.caminho_pdf) ||
                    "Upload PDF"}
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
                <Button
                  variant="contained"
                  component="span"
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  <CloudUploadIcon sx={{ mr: 1 }} />
                  {displayFileName(
                    selectedCode,
                    newActivity?.caminho_codigo_base
                  ) || "Upload Código"}
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
            backgroundColor: "#f5f5f5",
          }}
        >
          <Button
            onClick={handleCloseAdd}
            color="inherit"
            sx={{ textTransform: "none", color: "#1976d2" }}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddSubmit}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{
              textTransform: "none",
              backgroundColor: "#1976d2",
              minWidth: "120px",
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Adicionar"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
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
            Editar Atividade
          </DialogTitle>
        </Fade>

        <DialogContent sx={{ padding: "32px !important" }}>
          <Collapse in={editFeedback.show}>
            <Alert
              severity={editFeedback.type}
              icon={
                editFeedback.type === "success" ? (
                  <CheckCircleIcon fontSize="inherit" />
                ) : editFeedback.type === "warning" ? (
                  <WarningIcon fontSize="inherit" />
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
                {editFeedback.type === "success"
                  ? "Sucesso!"
                  : editFeedback.type === "warning"
                  ? "Atenção!"
                  : "Erro!"}
              </AlertTitle>
              {editFeedback.message}
            </Alert>
          </Collapse>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="nome"
              label="Título"
              value={editingActivity?.nome || ""}
              onChange={handleEditChange}
              fullWidth
              error={editValidationErrors.nome}
              helperText={editValidationErrors.nome && "Campo obrigatório"}
              required
            />
            <FormControl fullWidth error={editValidationErrors.type} required>
              <InputLabel>Tipo de Atividade</InputLabel>
              <Select
                name="tipo"
                value={editingActivity?.tipo || ""}
                onChange={handleEditChange}
                label="Tipo de Atividade"
              >
                {activityTypes.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
              {editValidationErrors.tipo && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 1.5 }}
                >
                  Campo obrigatório
                </Typography>
              )}
            </FormControl>
            <TextField
              name="conteudo"
              label="Conteúdo"
              value={editingActivity?.conteudo || ""}
              onChange={handleEditChange}
              fullWidth
              error={editValidationErrors.conteudo}
              helperText={editValidationErrors.conteudo && "Campo obrigatório"}
              required
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <input
                accept="application/pdf"
                style={{ display: "none" }}
                id="pdf-upload-edit"
                type="file"
                onChange={(e) => handleFileChangePDF(e, true)}
              />
              <label htmlFor="pdf-upload-edit">
                <Button
                  variant="contained"
                  component="span"
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  <CloudUploadIcon sx={{ mr: 1 }} />
                  {editingActivity?.caminho_pdf
                    ? editingActivity.caminho_pdf.split("\\").pop()
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
                <Button
                  variant="contained"
                  component="span"
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  <CloudUploadIcon sx={{ mr: 1 }} />
                  {editingActivity?.caminho_codigo_base
                    ? editingActivity.caminho_codigo_base.split("\\").pop()
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
            backgroundColor: "#f5f5f5",
          }}
        >
          <Button
            onClick={() => setOpenEdit(false)}
            color="inherit"
            sx={{ textTransform: "none", color: "#1976d2" }}
            disabled={isSubmittingEdit}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            color="primary"
            disabled={isSubmittingEdit}
            sx={{
              textTransform: "none",
              backgroundColor: "#1976d2",
              minWidth: "120px",
            }}
          >
            {isSubmittingEdit ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </DialogActions>
      </Dialog>
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
              Tem certeza que deseja remover a atividade{" "}
              <strong>{deletingActivity?.nome}</strong>?
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
      <Dialog
        open={openSubmissions}
        onClose={() => setOpenSubmissions(false)}
        maxWidth="md"
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
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            color: "white",
            fontSize: "1.5rem",
            padding: "24px 32px",
            fontWeight: 600,
          }}
        >
          Submissões - {selectedActivitySubmissions?.nome}
        </DialogTitle>
        <DialogContent sx={{ padding: "32px !important" }}>
          {selectedActivitySubmissions?.submissoes?.length > 0 ? (
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <PersonIcon />
                        Nome do aluno
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      Quantidade de Submissões
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      Data da Última Submissão
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Código</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedActivitySubmissions.submissoes.map((submission) => (
                    <TableRow
                      key={submission.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f8f9fa",
                        },
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {submission.nome_usuario}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {submission.quantidade_sub}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {getStatusIcon(submission.status)}
                          {submission.status}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {new Date(submission.data_submissao).toLocaleString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleViewCode(submission.codigo)}
                          sx={{
                            color: "#1976d2",
                            "&:hover": {
                              backgroundColor: "rgba(25, 118, 210, 0.04)",
                            },
                          }}
                        >
                          <CodeIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "#666" }}
            >
              Nenhuma submissão encontrada para esta atividade.
            </Typography>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            padding: "16px 32px",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Button
            onClick={() => setOpenSubmissions(false)}
            variant="contained"
            sx={{
              textTransform: "none",
              minWidth: "120px",
            }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openCodeModal}
        onClose={() => setOpenCodeModal(false)}
        maxWidth="md"
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
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            color: "white",
            fontSize: "1.5rem",
            padding: "24px 32px",
            fontWeight: 600,
          }}
        >
          Código Submetido
        </DialogTitle>
        <DialogContent sx={{ padding: "32px !important" }}>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "8px",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              overflowX: "auto",
            }}
          >
            {selectedCode}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "16px 32px",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Button
            onClick={() => setOpenCodeModal(false)}
            variant="contained"
            sx={{
              textTransform: "none",
              minWidth: "120px",
            }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherActivities;
