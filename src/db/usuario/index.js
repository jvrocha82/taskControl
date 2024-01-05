var {Pool, Client} = require('pg')
let acess = {
    user: 'citizix_user',
    host: 'localhost',
    database: 'citizix_db',
    password: 'S3cret',
    port: 5432,
    max: 20, // Número máximo de conexões no pool
    idleTimeoutMillis: 30000, // Tempo máximo (em milissegundos) que uma conexão pode ficar inativa antes de ser encerrada
  }

async function addUser(user, password){

    const pool = new Pool(acess);
    const res = await pool.query(`
    INSERT INTO usuarios (
        usuario,
        senha)
    VALUES (
        '${user}',
        '${password}')
        RETURNING *;;
`)
    await pool.end()
    return res.rows
}
async function listUSer(){

    const pool = new Pool(acess);
    const res = await pool.query(`
    SELECT id,usuario
    FROM usuarios

`)
    await pool.end()
    return res.rows

}
async function findUser(user){

    const pool = new Pool(acess);
    const res = await pool.query(`
    SELECT *
    FROM usuarios
    WHERE usuario = '${user}';
`)
    await pool.end()
    return res.rows

}
exports.listUSer = listUSer;
exports.findUser = findUser;
exports.addUser = addUser;
