const express = require('express');
const path = require('path');

const app = express();

app.use('/api/chamados', require('./src/routes/chamados.routes'));
app.use('/api',require('./src/routes/usuario.routes'))


app.get('/login',(req,res) => {
   res.sendFile(path.join(__dirname,'./src/view/usuario/login/index.html'));
});
app.get('/',(req,res) => {
   res.sendFile(path.join(__dirname,'./src/view/usuario/login/index.html'));
});
app.get('/register',(req,res) => {
   res.sendFile(path.join(__dirname,'./src/view/usuario/register/index.html'));
});


app.get('/chamados',(req,res) => {
   res.sendFile(path.join(__dirname,'./src/view/chamados/chamados.form.html'));
});




module.exports = app;