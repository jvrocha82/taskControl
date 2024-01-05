

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
exports.buscaChamados = buscaChamados;
exports.deletaChamado = deletaChamado;
exports.adicionaChamado = adicionaChamado;
exports.aprovaChamado = aprovaChamado;
exports.verificaResponsavel = verificaResponsavel;
exports.reprovaChamado = reprovaChamado;
exports.buscaUmChamado = buscaUmChamado;
exports.mudaResponsavelChamado = mudaResponsavelChamado
async function mudaResponsavelChamado(params){
    const pool = new Pool(acess);
    const res = await pool.query(`
    UPDATE chamados
    SET responsavel = ${params.idResponsavel},
    status = 'atribuido'
    WHERE id = ${params.idChamado};
 
    `)
    await pool.end()
    return res
}
async function buscaUmChamado(id){
    const pool = new Pool(acess);
    const res = await pool.query(`
       
    SELECT 
*,
    COALESCE(u.usuario, NULL) AS responsavel,
    COALESCE(u_criador.usuario, NULL) AS criadorNome

FROM 
    chamados c
LEFT JOIN 
    usuarios u ON c.responsavel = u.id
    LEFT JOIN 
    usuarios u_criador ON c.criador = u_criador.id
WHERE 
    c.id = ${id};
    
 
    `)
    await pool.end()
    return res
}
async function buscaChamados(){

    const pool = new Pool(acess);
    const res = await pool.query(`
    SELECT *
    FROM chamados
    ORDER BY id
    --LIMIT 10
    --OFFSET 0; `)
    await pool.end()
    return res
    
}
async function verificaResponsavel(id, usuario){
    const pool = new Pool(acess);
    const res = await pool.query(`   
     SELECT * FROM chamados
    where id = ${id}
    and responsavel = '${usuario}'
    ;`)
    await pool.end()
    return res.rows
}
async function aprovaChamado(id){
    const pool = new Pool(acess);
    const res = await pool.query(`
    UPDATE chamados
        SET dataConclusao = CURRENT_DATE, status = 'aprovado'
        where id = ${id}`)
    await pool.end()
    return res
}
async function reprovaChamado(id){
    const pool = new Pool(acess);
    const res = await pool.query(`
    UPDATE chamados
        SET dataConclusao = CURRENT_DATE, status = 'reprovado'
        where id = ${id}`)
    await pool.end()
    return res
}
async function adicionaChamado(params, user){
    const pool = new Pool(acess);
    const res = await pool.query(`
    INSERT INTO chamados (
        numeroChamado, 
        status, 
        linkVersao, 
        dtCriacao,
        --dataConclusao,
        projeto,
        criador,
        tribunal,
        consulta,
        segmento,
        numeroversao)
VALUES
    (
    '${params.nChamado}',
    'pendente',
    '${params.linkVersao}',
    CURRENT_TIMESTAMP,
    --'',
    '${params.projeto}', 
    ${user},
    '${params.tribunal}',
    '${params.consulta}',
    '${params.segmento}',
    '${params.nVersao}'
    );

    `)

    await pool.end()
    return res;
}
async function deletaChamado(id){

    const pool = new Pool(acess);
    const res = await pool.query(`DELETE FROM chamados WHERE id = ${id};`)
    await pool.end()
    return res
}
