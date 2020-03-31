// importação das dependencias
const express = require('express')
const nunjucks = require('nunjucks')

// configuração do express
const server = express()

// configuração pra leitura de arquivos estaticos
server.use(express.static('public'))

// habilitar body do formulario

server.use(express.urlencoded({extended: true}))
// conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'oia123',
    host: 'localhost',
    port: '5432',
    database: 'doe'
})

// configuração da template engine
nunjucks.configure('./view', {
    express: server,
    noCache: true,
})


// configuração para renderizar o frontend
server.get('/', (req, res) =>{
    
    db.query('SELECT * FROM donors', (err, result) => {
        if(err) return res.send('Erro no banco de dados')

        const donors = result.rows
        return res.render('index.html', {donors})
    })

    
})

server.post('/', (req, res) =>{
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //colocar valores no Banco de dados.
    if(name == '' || email == '' || blood == ''){
        return res.send('todos os campos são obrigatorios.')
    }

    const query = `INSERT INTO donors ("name", "email", "blood")VALUES($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, (err) => {
        if(err) return res.send("erro nos dados")

        return res.redirect('/')
    } )
})


// configuração da porta do servidor http
server.listen(3333, () => {
    console.log('Server Running...')
})