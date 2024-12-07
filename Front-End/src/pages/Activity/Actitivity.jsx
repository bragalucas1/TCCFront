import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { MdCheckCircle, MdError, MdUpload } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdClose } from "react-icons/md";
import FileService from "../../services/File/FileService";
import { useLocation } from "react-router-dom";
import ActivitiesService from "../../services/Activities/ActivitiesService";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ActivityPage = () => {
  const { state } = useLocation();
  const activity = state?.activity;
  const [ultimaSubmissao, setUltimaSubmissao] = useState(null);
  const [resultadoCorrecao, setResultadoCorrecao] = useState(null);
  const [mensagemResultado, setMensagemResultado] = useState("");
  const [fileName, setFileName] = useState("");
  const [showCorrectButton, setShowCorrectButton] = useState(false);
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [currenctActivity, setCurrentActivity] = useState(activity);
  const [forceUpdate, setForceUpdate] = useState(false);

  const fetchUpdatedActivity = async () => {
    try {
      const updatedActivity = await ActivitiesService.findActivityById(
        activity.id
      );

      setCurrentActivity(updatedActivity.atividade);
      if (currenctActivity?.submissoes) {
        const ultimaSubmissao = currenctActivity.submissoes[0];
        setUltimaSubmissao({
          status: ultimaSubmissao.status,
          tipo: ultimaSubmissao.status === "Correto" ? "correto" : "incorreto",
          mensagem:
            ultimaSubmissao.status === "Correto"
              ? "Sua ultima submissão estava correta!"
              : "Sua ultima submissão estava incorreta.",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar atividade:", error);
    }
  };

  useEffect(() => {
    const fetchPdf = async () => {
      if (activity?.nome) {
        try {
          const blob = await ActivitiesService.getPdfActivity(activity.nome);
          console.log(blob);
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        } catch (error) {
          console.error("Erro ao carregar o PDF:", error);
          toast.error("Erro ao carregar o PDF");
        }
      }
    };

    fetchPdf();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [activity]);

  useEffect(() => {
    if (activity?.id) {
      fetchUpdatedActivity();
    }
  }, [activity?.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Force re-render to update the countdown
      setForceUpdate((prev) => !prev);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

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

      return result.success;
    } catch (error) {
      throw new Error("Falha ao enviar arquivo");
    }
  };

  const handleCorrectClick = async () => {
    setUltimaSubmissao(null);
    toast.info("Arquivo enviado com sucesso!", {
      position: "top-right",
      autoClose: 2000,
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

    const result = await handleFileSend(file);

    if (result.erro) {
      setResultadoCorrecao("erro");
      setMensagemResultado(result.detalhesErro.descricao);
    } else if (result.correto) {
      setResultadoCorrecao("correto");
      setMensagemResultado("Parabéns! Sua resposta está correta!");
    } else {
      setResultadoCorrecao("incorreto");
      setMensagemResultado("Resposta incorreta. Tente novamente!");
    }
    setFileName("");
    setShowCorrectButton(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".py")) {
      setFileName(file.name);
      setShowCorrectButton(true);
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
      setFile(null);
      event.target.value = "";
    }
  };

  const isPastDeadline = () => {
    const deadline = new Date(activity.data_limite);
    const now = new Date();
    return now > deadline;
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        marginTop: "50px",
        padding: "20px",
        "& .MuiContainer-root": {
          maxWidth: "none",
        },
      }}
    >
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid
          item
          xs={12}
          md={7}
          lg={8}
          sx={{ paddingRight: "20px", borderRight: "1px solid #e0e0e0" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h6" component="div">
              Visualização da Atividade
            </Typography>
            {(() => {
              const deadline = new Date(activity.data_limite);
              const now = new Date();
              const diff = deadline - now;

              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              const minutes = Math.floor(
                (diff % (1000 * 60 * 60)) / (1000 * 60)
              );

              const isLessThanOneHour = diff < 1000 * 60 * 60 && diff > 0;

              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    padding: "8px 16px",
                    borderRadius: "4px",
                    backgroundColor: isLessThanOneHour ? "#fef2f2" : "#f8f9fa",
                    border: `1px solid ${
                      isLessThanOneHour ? "#fee2e2" : "#e5e7eb"
                    }`,
                  }}
                >
                  <AccessTimeIcon
                    sx={{
                      fontSize: 20,
                      color: isLessThanOneHour ? "#ef4444" : "#1976d2",
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 500,
                      color: isLessThanOneHour ? "#ef4444" : "#1976d2",
                    }}
                  >
                    {diff < 0
                      ? "Prazo encerrado"
                      : diff < 1000 * 60 * 60
                      ? minutes == 1
                        ? `Fecha em ${minutes} minuto`
                        : `Fecha em ${minutes} minutos`
                      : diff < 1000 * 60 * 60 * 24
                      ? `Fecha em ${hours}h ${minutes}min`
                      : `Fecha em ${days} dias e ${hours}h`}
                  </Typography>
                </Box>
              );
            })()}
          </Box>
          {pdfUrl ? (
            <object
              data={pdfUrl}
              type="application/pdf"
              width="100%"
              height="700px"
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                minHeight: "80vh",
                maxHeight: "85vh",
                marginTop: "20px",
                marginBottom: "20px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                resize: "both",
                overflow: "auto",
              }}
            >
              <embed
                src={pdfUrl}
                type="application/pdf"
                width="100%"
                height="800px"
                style={{ minHeight: "80vh" }}
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
          md={5}
          lg={4}
          sx={{ position: "relative", paddingLeft: "20px" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
              marginTop: "100px",
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
              disabled={isPastDeadline()} // Adicione esta condição
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
                "&.Mui-disabled": {
                  backgroundColor: "#ccc",
                  color: "#666",
                },
              }}
            >
              {isPastDeadline()
                ? "Prazo encerrado"
                : fileName
                ? fileName
                : "Selecionar Arquivo"}
              <input
                type="file"
                hidden
                accept=".py"
                onChange={handleFileChange}
                disabled={isPastDeadline()}
              />
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
          {(resultadoCorrecao || ultimaSubmissao) && (
            <Box
              sx={{
                marginTop: "80px",
                marginLeft: "60px",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: resultadoCorrecao
                  ? resultadoCorrecao === "correto"
                    ? "#d4edda"
                    : resultadoCorrecao === "incorreto"
                    ? "#fff3cd"
                    : "#f8d7da"
                  : ultimaSubmissao.tipo === "correto"
                  ? "#d4edda"
                  : "#fff3cd",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                maxWidth: "400px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {resultadoCorrecao ? (
                <>
                  {resultadoCorrecao === "correto" && (
                    <MdCheckCircle size={40} color="#28a745" />
                  )}
                  {resultadoCorrecao === "incorreto" && (
                    <MdClose size={40} color="#856404" />
                  )}
                  {resultadoCorrecao === "erro" && (
                    <MdError size={40} color="#721c24" />
                  )}
                  <Typography
                    sx={{
                      color:
                        resultadoCorrecao === "correto"
                          ? "#155724"
                          : resultadoCorrecao === "incorreto"
                          ? "#856404"
                          : "#721c24",
                      textAlign: "center",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {mensagemResultado}
                  </Typography>
                </>
              ) : (
                <>
                  {ultimaSubmissao.tipo === "correto" ? (
                    <MdCheckCircle size={40} color="#28a745" />
                  ) : (
                    <MdClose size={40} color="#856404" />
                  )}
                  <Typography
                    sx={{
                      color:
                        ultimaSubmissao.tipo === "correto"
                          ? "#155724"
                          : "#856404",
                      textAlign: "center",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {ultimaSubmissao.mensagem}
                  </Typography>
                </>
              )}
            </Box>
          )}
        </Grid>
      </Grid>

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
