
const jwt = require('jsonwebtoken');

const secretKey = 'seuSegredoSuperSecreto'; // Troque por uma chave segura em produção

const auth = {}


auth.generateToken = (user) => {
    
    let token = jwt.sign({ username: user.usuario, id: user.id }, secretKey, { expiresIn: '1h' });

    return token//jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' }); // Expira em 1 hora
}




auth.authenticateToken = (req, res, next) => {
    //const token = req.headers['authorization'];
    const token = req.cookies?.token;
    if (!token) {
        
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user;
        next();
    });
}
module.exports = auth;
