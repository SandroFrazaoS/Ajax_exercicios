const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('.'))  // serve todos os arquivos staticos da pasta ajax 
// so pega dados bo body do formulario se tiver essas linhas abaixo
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const multer = require('multer')

// quando tem upload de arquivo 
// 
const storage = multer.diskStorage({ // parte de armazenamento diskStorage
    destination: function (req, file, callback) {
        callback(null, './upload') // qual a pasta de destino que salva o arquivo
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`) // nome do arquivo padrao coloca uma data para nao sobre escrever
    }
})

const upload = multer({ storage }).single('arquivo')

//http://localhost:8080/index.html  // testando o servidor
//app.get('/teste', (req, res) => res.send('OK'))
app.post('/upload', (req, res) => {   //requisicao via post para fazer o upload
    upload(req, res, err => {
        if (err) {
            return res.end('Ocorreu um erro.')
        }

        res.end('Concluído com sucesso.')
    })
})

// recebimento do formulario no fetch
app.post('/formulario', (req, res) => {
    res.send({
        ...req.body,  // pego tudo do body que venho o formulario + o id
        id: 7
    })
})

//funcao para calcular se é par ou impar
app.get('/parOuImpar', (req, res) => {
    // req.body   // maneira de receber dados no front end
    // req.query
    // req.params
    const par = parseInt(req.query.numero) % 2 === 0
    res.send({
        resultado: par ? 'par' : 'impar'
    })
})

app.listen(8080, () => console.log('Executando...')) // startando servidor