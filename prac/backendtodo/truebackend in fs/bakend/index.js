const express = require("express")
const cors = require('cors')
const fs = require("fs")

const app = express()

app.use(cors())



app.use(express.json())

let filepath = 'todos.json'

const readtodos = ()=>{
    let data = fs.readFileSync(filepath,"utf-8")
    return JSON.parse(data)
}
const writetodo = (data)=>{
    fs.writeFileSync(filepath,JSON.stringify(data),"utf-8")
}

app.get('/',(req,res)=>{
    let todos = readtodos()
    res.send(todos)
})

app.get('/:id',(req,res)=>{

    let todoid=parseInt(req.params.id)
    let todos = readtodos()
    let idd=todos.find((e)=>e.id===todoid)
    if(!idd){
        res.status(404).json({error: 'id not present in todos'})
    }

    res.status(200).json(idd)
})

app.post('/',(req,res)=>{
    let todos = readtodos()
    let {title,description} = req.body
 
    let newobj = {
        id:Math.floor(Math.random() * 10000) + 1,
        title,
        description,
        complete: false
    }
    todos.push(newobj)
    writetodo(todos)
    res.status(201).json(newobj);
})


app.put('/:id',(req,res)=>{
    let todos = readtodos()
    let tid=parseInt(req.params.id)
    let {title,description} = req.body
    let todo=todos.find(e=>e.id===tid)
    if(!todo){
        res.status(404).json({error: 'id not present in todos'})
    }
    todo.title = title
    todo.description = description
    writetodo(todos)
    res.status(201).json(todo)
})


app.delete('/:id',(req,res)=>{
    let todos = readtodos()
   let idd = parseInt(req.params.id)
    let findid = todos.find(e=>e.id===idd)
    if(!findid){
       return res.status(404).json({error:'id not found'})
    }
    let uidtodo = todos.filter((e)=>e.id!==idd)

    todos = uidtodo
    writetodo(todos)
    res.status(200).json({message:'delete sucsess'})
})

app.patch('/:id/complete',(req,res)=>{
    let todos = readtodos()
    let idd=parseInt(req.params.id)
    let {complete} = req.body
    let findid = todos.find(e=>e.id===idd)
    if(!findid){
        res.sendStatus(404).json({error:'id not found'})
    }
    findid.complete = complete
    writetodo(todos)
    res.status(201).json({message:'success patch'})
})

app.listen(3000,()=>console.log('listen on http://localhost:3000'))
