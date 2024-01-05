var express = require('express');
var db = require('../db/index.js')
var user = require('../db/usuario/index.js')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var router = express.Router();
var auth = require('../utills/auth.js')

const cookieParser = require('cookie-parser');

router.use(express.json());
router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})

// const users = [
//     { username: 'usuario1', passwordHash: '$2b$10$gXu19YkmzjtIoL.zUZy1T.d8oANwCvJcPrpNGUKFso7jvc8Ei2mz2' }, // senha1
//     { username: 'usuario2', passwordHash: '$2b$10$72HvFK.sqJx2ixTO0QY8SuHdZpdOQ4amNFr2xV1zrVe/CRB7tW5Du' }, // senha2
//     // Adicione mais usuários conforme necessário
//   ];
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Simulação de lógica de autenticação
  let currentUser = await user.findUser(username)

  if (currentUser.length > 0) {
    // Comparar a senha fornecida com a senha armazenada usando Bcrypt
    const isPasswordValid = await bcrypt.compare(password, currentUser[0].senha);

    if (isPasswordValid) {
      // Autenticação bem-sucedida
      let token = auth.generateToken( currentUser[0]);


      res.cookie('token', token, { secure: true, sameSite: 'strict' });

      res.status(200).json({ message: 'Autenticação bem-sucedida', token });
    } else {
      // Autenticação falhou
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } else {
    // Usuário não encontrado
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário já está registrado
  if ((await user.findUser(username)).length) {
    return res.status(400).json({ message: 'Usuário já registrado' });
  }

  try {
    // Gerar um hash Bcrypt da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // Adicionar o novo usuário ao banco de dados
    let currentUser = await user.addUser(username, passwordHash)
    // users.push({ username, passwordHash });
    let token = auth.generateToken(currentUser[0]);

    res.cookie('token', token, { secure: true, sameSite: 'strict' });

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro durante o registro' });
  }
});
router.get('/list', auth.authenticateToken, async function (req, res) {

  try {

    let users = await user.listUSer()
    res.send({ usuarios: users })
  } catch (ex) {
    res.status(403).json({ error:ex.message });

  }

})


module.exports = router;