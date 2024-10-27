const fs = require('fs'); 
const { spawn } = require('child_process');
const path = require('path');

const CorrecaoService = {
    fluxoDeCorrecao: async (file) => {
        try {
            console.log("Iniciando correção do arquivo:", file.originalname);
            const arquivoAluno = file.path;
            const arquivoBase = path.join(__dirname, '..', '..', '..',  'uploads', 'teste_Base.py');

            console.log("Arquivo base:", arquivoBase);
    
            const saidaAluno = await CorrecaoService.executaPython(arquivoAluno);
            const saidaBase = await CorrecaoService.executaPython(arquivoBase);
    
            const resultado = {
                correto: saidaAluno === saidaBase,
                saidaAluno: saidaAluno,
                saidaEsperada: saidaBase
            };
            console.log(resultado);
            return resultado;
        } catch (error) {
            console.error("Erro no fluxo de correção:", error);
            throw error;
        }
    },  
    executaPython: (arquivoPath) => {
        return new Promise((resolve, reject) => {
            let saida = '';
            let erro = '';

            const processo = spawn('python', [arquivoPath]);

            processo.stdout.on('data', (data) => {
                saida += data.toString();
            });

            processo.stderr.on('data', (data) => {
                erro += data.toString();
            });

            processo.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(`Erro ao executar Python: ${erro}`));
                } else {
                    resolve(saida.trim());
                }
            });
        });
    }

    // obtemConteudoArquivo: function() {
    //     console.log("Lendo arquivo do caminho:", filePath);
    //     try {
    //         const conteudo = fs.readFileSync(filePath, 'utf8');
    //         return conteudo;
    //     } catch (error) {
    //         console.error("Erro ao ler arquivo:", error);
    //         throw new Error("Erro ao ler arquivo");
    //     }
    // }
};

module.exports = CorrecaoService;
