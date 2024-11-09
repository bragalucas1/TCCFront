import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { MdCheckCircle, MdUpload } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdClose } from "react-icons/md";
import FileService from "../../services/File/FileService";
import { useLocation } from "react-router-dom";

const ActivityPage = () => {
  const { state } = useLocation();
  const activity = state?.activity;
  const [openModal, setOpenModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isTextInput, setIsTextInput] = useState(false);
  const [showCorrectButton, setShowCorrectButton] = useState(false);
  const [disableInsertTextButton, setDisableInsertTextButton] = useState(false);
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (activity?.caminho_pdf) {
      if (activity.caminho_pdf.startsWith("http")) {
        setPdfUrl(activity.caminho_pdf);
      } else {
        try {
          const filePath = activity.caminho_pdf;
          fetch(filePath)
            .then((response) => response.blob())
            .then((blob) => {
              const url = URL.createObjectURL(blob);
              setPdfUrl(url);
            })
            .catch((error) => {
              console.error("Erro ao carregar o PDF:", error);
              toast.error("Erro ao carregar o PDF local");
            });
        } catch (error) {
          console.error("Erro ao processar o caminho do PDF:", error);
          toast.error("Erro ao processar o caminho do PDF");
        }
      }
    }

    return () => {
      if (pdfUrl && !pdfUrl.startsWith("http")) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [activity]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsTextInput(true);
  };

  const handleTextChange = (event) => {
    setInputText(event.target.value);
    setShowCorrectButton(true);
  };

  const handleFileSend = async (file) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const activityId = activity.id;

    const formData = new FormData();
    formData.append("nome", activity.nome);
    formData.append("perfilSubmissao", "aluno");
    formData.append("nomeUsuario", user.nome);
    formData.append("file", file);
    formData.append("userId", user.id);
    formData.append("userName", user.nome);
    formData.append("activityId", activityId);

    try {
      const result = await FileService.sendFile(formData);
    } catch (error) {
      throw new Error("Falha ao enviar arquivo");
    }
  };

  const handleCorrectClick = () => {
    if (isTextInput) {
      toast.success("Texto enviado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontFamily: "Verdana, sans-serif",
          backgroundColor: "#d4edda",
          color: "#155724",
        },
      });
    } else {
      handleFileSend(file);
      toast.success("Arquivo enviado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontFamily: "Verdana, sans-serif",
          backgroundColor: "#d4edda",
          color: "#155724",
        },
      });
    }
    setFileName("");
    setInputText("");
    setDisableInsertTextButton(false);
    setShowCorrectButton(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".py")) {
      setFileName(file.name);
      setShowCorrectButton(true);
      setDisableInsertTextButton(true);
      setFile(file);
    } else {
      toast.error("Apenas arquivos .py são permitidos!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontFamily: "Verdana, sans-serif",
          backgroundColor: "#f8d7da",
          color: "#721c24",
        },
      });
      setFileName("");
      setShowCorrectButton(false);
      setDisableInsertTextButton(false);
      setFile(null);
      event.target.value = "";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "50px", padding: "20px" }}>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ paddingRight: "20px", borderRight: "1px solid #e0e0e0" }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ marginBottom: "20px" }}
          >
            Visualização da Atividade
          </Typography>
          {pdfUrl ? (
            <object
              data={pdfUrl}
              type="application/pdf"
              width="100%"
              height="600px"
              style={{ border: "1px solid #e0e0e0", borderRadius: "8px" }}
            >
              <embed
                src={pdfUrl}
                type="application/pdf"
                width="100%"
                height="600px"
              />
              <p>
                Seu navegador não possui um plugin para PDF. Você pode{" "}
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  baixar o arquivo aqui
                </a>
                .
              </p>
            </object>
          ) : (
            <Typography variant="body1" color="text.secondary">
              PDF não disponível.
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ position: "relative", paddingLeft: "20px" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                color: "#9e9e9e",
                marginBottom: "10px",
              }}
            >
              {fileName
                ? "Para realizar outra submissão, apenas clique no botão."
                : ""}
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<MdUpload />}
              sx={{
                marginBottom: "10px",
                padding: "8px 20px",
                borderRadius: "25px",
                fontSize: "14px",
                maxWidth: "250px",
                backgroundColor: fileName ? "#28a745" : "#007bff",
                color: "#fff",
                transition: "background-color 0.3s, transform 0.3s",
                "&:hover": {
                  backgroundColor: fileName ? "#218838" : "#0056b3",
                  transform: "scale(1.05)",
                },
                "&:active": {
                  backgroundColor: fileName ? "#1e7e34" : "#004085",
                },
              }}
            >
              {fileName ? fileName : "Selecionar Arquivo"}
              <input
                type="file"
                hidden
                accept=".py"
                onChange={handleFileChange}
              />
            </Button>
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "#9e9e9e", margin: "10px 0" }}
            >
              OU
            </Typography>
            <Button
              variant="outlined"
              onClick={handleOpenModal}
              sx={{
                padding: "8px 20px",
                borderRadius: "25px",
                fontSize: "14px",
                borderColor: "#3f51b5",
                color: "#3f51b5",
                transition: "background-color 0.3s, transform 0.3s",
                "&:hover": {
                  borderColor: "#2c387e",
                  color: "#2c387e",
                  backgroundColor: "#e8eaf6",
                  transform: "scale(1.05)",
                },
                "&:active": {
                  backgroundColor: "#d1c4e9",
                },
              }}
              disabled={disableInsertTextButton}
            >
              Inserir Texto
            </Button>
            {showCorrectButton && (
              <Button
                variant="outlined"
                startIcon={<MdCheckCircle />}
                onClick={handleCorrectClick}
                sx={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  borderRadius: "25px",
                  fontSize: "16px",
                  borderColor: "#4caf50",
                  color: "#4caf50",
                  transition:
                    "background-color 0.3s, color 0.3s, transform 0.3s",
                  "&:hover": {
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    borderColor: "#388e3c",
                    transform: "scale(1.05)",
                  },
                  "&:active": {
                    backgroundColor: "#388e3c",
                    color: "#fff",
                  },
                }}
              >
                Corrigir
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: "600px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#757575",
              "&:hover": {
                color: "#000",
              },
            }}
          >
            <MdClose />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ marginBottom: "10px" }}
          >
            Inserir Texto
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={16}
            variant="outlined"
            value={inputText}
            onChange={handleTextChange}
            sx={{
              marginBottom: "20px",
              width: "100vh",
              fontFamily: "Courier New, monospace",
              fontSize: "16px",
              "& .MuiInputBase-input": {
                fontFamily: "Courier New, monospace",
              },
            }}
          />
          <Button variant="contained" onClick={handleCloseModal}>
            Salvar
          </Button>
        </Box>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 1300 }}
      />
    </Container>
  );
};

export default ActivityPage;
