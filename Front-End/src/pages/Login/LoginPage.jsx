// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import './LoginPage.css'; // Certifique-se de que o caminho está correto
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService/AuthService';

const LoginPage = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [errorLoginmessage, setErrorLoginmessage] = useState('');
  const [loading, setLoading] = useState(false); // Adicionado para controle de carregamento
  const [success, setSuccess] = useState(false); // Adicionado para controle de sucesso
  const navigate = useNavigate();

  const handleMatriculaChange = (event) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setMatricula(value);
      setError('');
    } else {
      setError('Por favor, insira apenas caracteres numéricos.');
    }
  };

  const handleLogin = async () => {
    if (!matricula || !senha) {
      setErrorLoginmessage('Por favor, preencha todos os campos.');
      return; // Impede o login se os campos não estiverem preenchidos
    }

    try {
      setLoading(true);

      const result = {
        success: true, // Simula sucesso
        message: 'Credenciais válidas'
      };

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/home');
        }, 2000); // Redireciona após 2 segundos
      } else {
        setErrorLoginmessage('Credenciais inválidas. Por favor, verifique e insira novamente.');
      }
    } catch {
      setErrorLoginmessage('Falha ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        {!success ? (
          <>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <TextField
              label="Matrícula"
              variant="outlined"
              fullWidth
              className="input"
              value={matricula}
              onChange={handleMatriculaChange}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
              error={!!error}
              helperText={error}
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              className="input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              sx={{ mt: 2 }} // Espaçamento entre os campos
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              sx={{ 
                fontFamily: 'Verdana', // Define a fonte
                fontSize: '16px', // Define o tamanho da fonte
              }}
              onClick={handleLogin}
              disabled={loading} // Desativa o botão enquanto está carregando
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
            </Button>
            <Box mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{
                  fontFamily: 'Verdana', // Define a fonte
                  fontSize: '16px', // Define o tamanho da fonte
                }}
                disabled={loading} // Desativa o botão enquanto está carregando
              >
                Registrar
              </Button>
            </Box>
            {errorLoginmessage && (
              <Typography color="error" mt={2}>
                {errorLoginmessage}
              </Typography>
            )}
          </>
        ) : (
          <div className="success-container">
            <CheckCircleIcon color="success" style={{ fontSize: 50 }} />
            <Typography variant="h6" color="success" mt={2}>
              Login bem-sucedido!
            </Typography>
            <CircularProgress size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
