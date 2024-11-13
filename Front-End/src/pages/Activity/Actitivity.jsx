import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { MdCheckCircle, MdError, MdUpload } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdClose } from "react-icons/md";
import FileService from "../../services/File/FileService";
import { useLocation } from "react-router-dom";
import ActivitiesService from "../../services/Activities/ActivitiesService";

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

  const fetchUpdatedActivity = async () => {
    try {
      const updatedActivity = await ActivitiesService.findActivityById(
        activity.id
      );

      console.log(updatedActivity);
      setCurrentActivity(updatedActivity);
      if (updatedActivity?.submissoes?.length > 0) {
        const ultimaSubmissao = updatedActivity.submissoes[0];
        setUltimaSubmissao({
          status: ultimaSubmissao.status,
          tipo: ultimaSubmissao.status === "Correto" ? "correto" : "incorreto",
          mensagem:
            ultimaSubmissao.status === "Correto"
              ? "Sua resposta está correta!"
              : "Sua resposta está incorreta.",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar atividade:", error);
    }
  };

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

  useEffect(() => {
    if (activity?.id) {
      fetchUpdatedActivity();
    }
  }, [activity?.id]);

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
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto", // Centraliza horizontalmente
              marginTop: "100px", // Ajusta espaço do topo
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
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Adicionado sombra sutil
              }}
            >
              {resultadoCorrecao ? (
                // Ícones para resultado atual
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
                // Ícones para última submissão
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
          {/* Novo componente de resultado */}
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
