const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// middleware é uma funcao que é executada quado uma 
// determinada requisicao chega
// funcoes middlewares sao chamadas através de uma requisicao

// provem os arquivos staticos na mesma pasta que o arquivo
app.use(express.static('.')) 
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const multer = require('multer')

// define destino do salvamento
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './upload')
    },
    // define nome do arquivo
    filename: function (req, file, callback){
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage }).single('arquivo')

app.post('/upload', (req, res) => {
    upload(req, res, ree => {
        if(err){
            return res.end('Ocorreu um erro')
        }

        res.end('Concluido com sucesso.')
    })
})

app.post('/formulario', (req, res) =>{
    res.send({
        ...req.body,
        id:7
    })
})

app.get('/parOuImpar', (req, res) =>{
    // Formas de receber dados do front
    // req.body    
    // req.query
    // req.params
    const par = parseInt(req.query.numero) % 2 === 0 
    res.send({
        resultado: par ? 'par' : 'impar'
    })
})

//startando servidor 
app.listen(8080, () => console.log('Executando....'))
