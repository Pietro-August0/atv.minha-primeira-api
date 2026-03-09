const express = require('express')
const app = express()
 
app.use(express.json())
 
const alunos = [
    {
        id: 1,
        nome: "Pietro Augusto",
        email: "pietro@gmail.com"
    },
    {
        id: 2,
        nome: "Livia Abreu",
        email: "livia@gmail.com"
    },
    {
        id: 3,
        nome: "Miguel Taioqui",
        email: "miguel@gmail.com"
    }
]
 
// rota padrão
app.get("/", function(req, res){
    res.send("Hello World, você conseguiu!")
 
})
 
// rota específica
app.get("/alunos", function(req, res){
    const nome = req.query.nome 

    //Se não passar query param, retorna todos
    //O ponto de exclamação inverte o valor
    //Se o nome não tiver valor ele é falso, mas por conta
    //do sinal de exclamação ele vira verdadeiro e execulta 
    //o que está no if
    if(!nome){
        return res.json(alunos)
    }

    const alunosFiltrados = alunos.filter(a => 
        a.nome.toLowerCase().includes(nome.toLowerCase())
    )

    res.json(alunosFiltrados)
 
})
 
app.post("/alunos", function(req, res){
    const nomeQueVeioDoCliente = req.body.nome
    const emailQueVeioDoCliente = req.body.email
 
    // validação
    if(!nomeQueVeioDoCliente || !emailQueVeioDoCliente){
        return res.status(400).json({erro: "Nome e e-mail são obrigatórios!"})
    }
 
    // criando um objeto novo, com as informações que veio do cliente
    const novoAluno = {
        id: 4,
        nome: nomeQueVeioDoCliente,
        email: emailQueVeioDoCliente
    }
 
    // add o novo aluno no final da lista
    alunos.push(novoAluno)
    res.status(201).send()
})
 
// buscar aluno por id
app.get("/alunos/:id", function(req, res){
    const id = parseInt(req.params.id) // O query parameter volta como um texto
 
    const aluno = alunos.find(a => a.id == id)
 
    // se a variavel for nula é igual a falso, se tiver alguma coisa é verdade
    if(aluno){
        return res.json(aluno)
    } else {
        res.status(404).json("Aluno não encontrado")
    }
})
 
app.put("/alunos/:id", function(req, res){
    const id = parseInt(req.params.id)
   // const nome = req.body.nome
   // const email = req.body.email
   // desestruturação do objeto
    const {nome, email} = req.body
 
    // validação
    if(!nome || !email){
        return res.status(400).json("Nome e email são obrigatórios")
    }
 
    // precisa descobrir em qual posição do array/lista o aluno esta pelo id
    const indexDoAluno = alunos.findIndex(a => a.id = id)
 
    if(indexDoAluno === -1){
        return res.status(404).json("Aluno não encontrado")
    }
 
    // substitui os dados do aluno pelos novos dados da requisição
    alunos[indexDoAluno].email = email
    alunos[indexDoAluno].nome = nome
 
    return res.json(alunos[indexDoAluno])
 
})

app.delete("/alunos/:id", function(req, res){
    const id = parseInt(req.params.id)
    const index = alunos.findIndex(a => a.id === id)

    if(index --- 1){
        return res.status(404).json("Aluno não encontrado")
    }

    //Remove elementos a partir de um index
    //Nesse caso ele remove um elemento a partir do index que ele informa
    //Exemplo: frutas = ["maçã", "banana", "uva", "abacaxi"]
    //frutas.splice(1, 2) essa função vai retornar o que foi removido
    //no casoa banan e uva, ele removeu 2 elementos depois do index 1
    //e a lista de frutas vai ficar apenas ["maçã", "banana"]
    const alunoRemovido = alunos.splice(index, 1)
    return res.status(204).json("Aluno deletado com sucesso!!")
})


//Lição 1 - Professores

const professores = [
    {
        id: 1,
        nome: "Betania",
        disciplina: "Filosofia",
        anoContratacao: 2022
    },
    {
        id: 2,
        nome: "Gabriel",
        disciplina: "Ed. Fisica",
        anoContratacao: 2023
    },
    {
        id: 3,
        nome: "Raul",
        disciplina: "Geografia",
        anoContratacao: 2026
    },

]
 

// Professores
 
app.get("/professores", function (req, res) {
    const ano = req.query.anoContratacao
 
    if(!ano){
        return res.json(professores)
    }
 
    const professoresFiltrados = professores.filter(a =>
        a.anoContratacao == parseInt(ano))
 
    res.json(professoresFiltrados)
})
 
app.post("/professores", function (req, res) {
    const nomeQueVeioDoCliente = req.body.nome
    const disciplinaQueVeioDoCliente = req.body.disciplina
    const anoQueVeioDoCliente = req.body.anoContratacao
 
    // Validação
    if (!nomeQueVeioDoCliente || !disciplinaQueVeioDoCliente || !anoQueVeioDoCliente) {
        return res.status(400).json({ erro: "Nome, disciplina e ano da contratação são obrigatórios!" })
    }
 
    const novoProfessor = {
        id: 3,
        nome: nomeQueVeioDoCliente,
        disciplina: disciplinaQueVeioDoCliente,
        anoContratacao: anoQueVeioDoCliente
    }
 
    professores.push(novoProfessor)
    res.status(201).send()
})
 
 
// Buscar professor por id
app.get("/professores/:id", function (req, res) {
    const id = parseInt(req.params.id)
 
    const professor = professores.find(a => a.id == id)
 
    if (professor) {
        return res.json(professor)
    } else {
        res.status(404).json("Professor não encontrado")
    }
})
 
app.put("/professores/:id", function (req, res) {
    const id = parseInt(req.params.id)
    const { nome, disciplina, anoContratacao } = req.body
 
    if (!nome || !disciplina || !anoContratacao) {
        return res.status(400).json("Nome, disciplina e ano da contratação são obrigatórios")
    }
 
    const indexDoProfessor = professores.findIndex(a => a.id == id)
 
    if (indexDoProfessor === -1) {
        return res.status(404).json("Professor não encontrado")
    }
 
    professores[indexDoProfessor].disciplina = disciplina
    professores[indexDoProfessor].nome = nome
    professores[indexDoProfessor].anoContratacao = anoContratacao
 
    return res.json(professores[indexDoProfessor])
})
 
app.delete("/professores/:id", function(req, res) {
    const id = parseInt(req.params.id)
    const index = professores.findIndex(a => a.id === id)
 
 
    if(index == -1){
        return res.status(404).json("Professor não encontrado")
    }
 
    const professorRemovido = professores.splice(index, 1)
    return res.status(204).json("Professor deletado com sucesso!")
 
})
 
// Monitora/ escuta a porta 3000
app.listen(3000, function(){
    console.log("Servidor rodando na porta 3000!")
}) 