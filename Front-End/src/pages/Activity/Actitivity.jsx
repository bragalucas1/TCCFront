import React, { useState } from 'react';
import { Container, Grid, Typography, Button, Box, Modal, TextField, IconButton } from '@mui/material';
import { MdCheckCircle, MdUpload } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importando os estilos do react-toastify
import { MdClose } from 'react-icons/md'; // Importando ícone de fechar

const ActivityPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isTextInput, setIsTextInput] = useState(false);
  const [showCorrectButton, setShowCorrectButton] = useState(false);
  const [disableInsertTextButton, setDisableInsertTextButton] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsTextInput(true);
  };

  const handleTextChange = (event) => {
    setInputText(event.target.value);
    setShowCorrectButton(true);
  };

  const handleCorrectClick = () => {
    if (isTextInput) {
      toast.success('Texto enviado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontFamily: 'Verdana, sans-serif',
          backgroundColor: '#d4edda',
          color: '#155724',
        },
      });
      
    } else {
      toast.success('Arquivo enviado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontFamily: 'Verdana, sans-serif',
          backgroundColor: '#d4edda',
          color: '#155724',
        },
      });
      
    }
    setFileName('');
    setInputText('');
    setShowCorrectButton(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".py")) {
      setFileName(file.name);
      setShowCorrectButton(true);
      setDisableInsertTextButton(true); // Desativa o botão de Inserir Texto
    } else {
      toast.error('Apenas arquivos .py são permitidos!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontFamily: 'Verdana, sans-serif',
          backgroundColor: '#f8d7da',
          color: '#721c24',
        },
      });
      setFileName('');
      setShowCorrectButton(false);
      setDisableInsertTextButton(false); // Habilita o botão de Inserir Texto
      event.target.value = ''; // Limpa o campo de arquivo
    }
  };

  const handleFileClear = () => {
    setFileName('');
    setShowCorrectButton(false);
    setDisableInsertTextButton(false); // Habilita o botão de Inserir Texto
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px', padding: '20px' }}>
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', paddingRight: '20px', borderRight: '1px solid #e0e0e0' }}>
          <Typography variant="h6" component="div" sx={{ marginBottom: '20px' }}>
            Texto da Atividade
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Aqui está o texto da atividade que precisa ser desenvolvido. Este é um exemplo de como você pode formatar o texto.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ position: 'relative', paddingLeft: '20px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#9e9e9e', marginBottom: '10px' }}>
              {fileName ? 'Para realizar outra submissão, apenas clique no botão.' : ''}
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<MdUpload />}
              sx={{
                marginBottom: '10px',
                padding: '8px 20px',
                borderRadius: '25px',
                fontSize: '14px',
                maxWidth: '250px',
                backgroundColor: fileName ? '#28a745' : '#007bff',
                color: '#fff',
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': {
                  backgroundColor: fileName ? '#218838' : '#0056b3',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  backgroundColor: fileName ? '#1e7e34' : '#004085',
                },
              }}
              //disabled={fileName} // Desativa o botão se houver um arquivo selecionado
            >
              {fileName ? fileName : 'Selecionar Arquivo'}
              <input
                type="file"
                hidden
                accept=".py"
                onChange={handleFileChange}
              />
            </Button>
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#9e9e9e', margin: '10px 0' }}>
              OU
            </Typography>
            <Button
              variant="outlined"
              onClick={handleOpenModal}
              sx={{
                padding: '8px 20px',
                borderRadius: '25px',
                fontSize: '14px',
                borderColor: '#3f51b5',
                color: '#3f51b5',
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': {
                  borderColor: '#2c387e',
                  color: '#2c387e',
                  backgroundColor: '#e8eaf6',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  backgroundColor: '#d1c4e9',
                },
              }}
              disabled={disableInsertTextButton} // Desativa o botão se estiver habilitado
            >
              Inserir Texto
            </Button>
            {showCorrectButton && (
              <Button
                variant="outlined"
                startIcon={<MdCheckCircle />} // Adiciona o ícone de verificação
                onClick={handleCorrectClick} // Adiciona a função de correção
                sx={{
                  marginTop: '20px', // Ajusta a margem superior
                  padding: '10px 20px', // Ajusta o padding
                  borderRadius: '25px', // Cantos arredondados
                  fontSize: '16px', // Tamanho da fonte
                  borderColor: '#4caf50', // Cor da borda
                  color: '#4caf50', // Cor do texto
                  transition: 'background-color 0.3s, color 0.3s, transform 0.3s', // Efeitos de transição
                  '&:hover': {
                    backgroundColor: '#4caf50', // Cor de fundo ao passar o mouse
                    color: '#fff', // Cor do texto ao passar o mouse
                    borderColor: '#388e3c', // Cor da borda ao passar o mouse
                    transform: 'scale(1.05)', // Efeito de aumento ao passar o mouse
                  },
                  '&:active': {
                    backgroundColor: '#388e3c', // Cor de fundo ao clicar
                    color: '#fff', // Cor do texto ao clicar
                  },
                }}
              >
                Corrigir
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Modal para inserir texto */}
      <Modal open={openModal} onClose={handleCloseModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '600px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', position: 'relative' }}>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: '#757575',
              '&:hover': {
                color: '#000',
              },
            }}
          >
            <MdClose />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ marginBottom: '10px' }}>
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
              marginBottom: '20px',
              width: '100vh', // Ajuste a largura como desejar
              fontFamily: 'Courier New, monospace', // Fonte monoespaçada
              fontSize: '16px', // Ajuste o tamanho da fonte conforme necessário
              '& .MuiInputBase-input': {
                fontFamily: 'Courier New, monospace', // Certifique-se de que a fonte é aplicada ao texto
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
        style={{ zIndex: 1300 }} // Garantir que o toastr fique acima de outros elementos
      />
    </Container>
  );
};

export default ActivityPage;
