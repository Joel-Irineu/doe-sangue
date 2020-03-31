// importação das dependencias
const express = require('express')
const nunjucks = require('nunjucks')
// configuração do express
const server = express()
// configuração pra leitura de arquivos estaticos
server.use(express.static('public'))
// habilitar body do formulario
server.use(express.urlencoded({extended: true}))
// configuração da template engine
nunjucks.configure('./', {
    express: server,
    noCache: true,
})

// lista de doadores
const donors = [
    {
        name: 'joel Irineu',
        blood: 'AB+'
    },
    {
        name: 'Diego fernandes',
        blood: 'B+'
    },
    {
        name: 'Robson Marques',
        blood: 'A-'
    },
    {
        name: 'Mayk Brito',
        blood: 'O+'
    }
]

// configuração para renderizar o frontend
server.get('/', (req, res) =>{
    return res.render('index.html', {donors})
})

server.post('/', (req, res) =>{
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //colocar valores no array
    donors.push({
        name,
        blood
    })
    
    return res.redirect('/')
})


// configuração da porta do servidor http
server.listen(3333, () => {
    console.log('Server Running...')
})