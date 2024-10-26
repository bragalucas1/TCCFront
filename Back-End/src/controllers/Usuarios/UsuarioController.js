const UsuarioService = require('../../services/Usuario/UsuarioService');

const UsuarioController = {
    getUsers: async (req, res) => {
        try {
            const users = await UsuarioService.getAllUsers(); // Chama o serviço
            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    },
};

module.exports = UsuarioController;
