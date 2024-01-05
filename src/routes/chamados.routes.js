var express = require('express');
var db = require('../db/index.js')
const bodyParser = require('body-parser');
var auth = require('../utills/auth.js')
var router = express.Router();
const cookieParser = require('cookie-parser');

router.use(express.json());
router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', auth.authenticateToken, async (req, res) => {

  let obj = await db.buscaChamados();

  res.send({ chamados: obj })
})

router.delete('/:id', async (req, res) => {

  let id = parseInt(req.params.id, 10);

  var sucess = db.DeletaChamado(id)

  if (sucess) {
    res.status(204).send(); // Resposta sem conteúdo
  } else {
    res.status(404).json({ error: 'Chamado não encontrado' });
  }

})
router.get('/:id',async (req, res) => {
  let chamadoId = req.params.id;


  let obj = await db.buscaUmChamado(chamadoId);

  res.send({ chamados: obj })

});
router.post('/', auth.authenticateToken, async function (req, res) {
  let params = req.body;
  let user = req.user.id
  var sucess = await db.adicionaChamado(params, user);

  if (sucess) {
    res.status(204).send(); // Resposta sem conteúdo
  } else {
    res.status(404).json({ error: 'Chamado não encontrado' });
  }
});

router.post('/alteraResponsavel', async function (req, res) {
  let params = req.body;
  try{
    await db.mudaResponsavelChamado(params);

    res.status(204).send();
  } catch(ex) {
    
    res.status(403).json({ error: 'Usuario não tem permissão para editar' });
  }
})

router.post('/aprovar', auth.authenticateToken, async function (req, res) {
  let params = req.body;
  let user = req.user.id

  // if ((await db.verificaResponsavel(params.id, user)).length > 0) {
   
    await db.aprovaChamado(params.id, user);

    res.status(204).send();
  // } else {
  //   res.status(403).json({ error: 'Usuario não tem permissão para editar' });
  // }
})

router.post('/reprova', auth.authenticateToken, async function (req, res) {
  let params = req.body;
  let user = req.user.id

  // if ((await db.verificaResponsavel(params.id, user)).length > 0) {
   
    await db.reprovaChamado(params.id, user);

    res.status(204).send();
  // } else {
  //   res.status(403).json({ error: 'Usuario não tem permissão para editar' });
  // }
})

module.exports = router;