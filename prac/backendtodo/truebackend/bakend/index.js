const express = require("express")
const cors = require('cors')

const app = express()

app.use(cors())

let todos= [
    {
      id: 1,
      title: 'Learn Node.js',
      description: 'Complete the Node.js tutorial and build a simple app.',
      complete: false
    },
    {
      id: 2,
      title: 'Write API Endpoints',
      description: 'Write RESTful API endpoints for the backend.',
      complete: false
    },
    {
      id: 3,
      title: 'Test API',
      description: 'Test the API endpoints with various use cases.',
      complete: true
    },
    {
      id: 4,
      title: 'Create Frontend',
      description: 'Build the user interface for the application.',
      complete: false
    },
    {
      id: 5,
      title: 'Deploy Application',
      description: 'Deploy the app to a live server.',
      complete: false
    }
  ]

app.use(express.json())

app.get('/',(req,res)=>{
    res.send(todos)
})

app.get('/:id',(req,res)=>{
    let todoid=parseInt(req.params.id)
    let idd=todos.find((e)=>e.id===todoid)
    if(!idd){
        res.status(404).json({error: 'id not present in todos'})
    }

    res.status(200).json(idd)
})

app.post('/',(req,res)=>{
    let {title,description} = req.body
 
    let newobj = {
        id:Math.floor(Math.random() * 10000) + 1,
        title,
        description,
        complete: false
    }
    todos.push(newobj)
    res.status(201).json(newobj);
})


app.put('/:id',(req,res)=>{
    let tid=parseInt(req.params.id)
    let {title,description} = req.body
    console.log(tid,title,description)
    let todo=todos.find(e=>e.id===tid)
    if(!todo){
        res.status(404).json({error: 'id not present in todos'})
    }
    todo.title = title
    todo.description = description
    res.status(201).json(todo)
})


app.delete('/:id',(req,res)=>{
   let idd = parseInt(req.params.id)
    let findid = todos.find(e=>e.id===idd)
    if(!findid){
       return res.status(404).json({error:'id not found'})
    }
    let uidtodo = todos.filter((e)=>e.id!==idd)

    todos = uidtodo
    res.status(200).json({message:'delete sucsess'})
})

app.patch('/:id/complete',(req,res)=>{
    let idd=parseInt(req.params.id)
    let {complete} = req.body
    let findid = todos.find(e=>e.id===idd)
    if(!findid){
        res.sendStatus(404).json({error:'id not found'})
    }
    findid.complete = complete
    res.status(201).json({message:'success patch'})
})

app.listen(3000,()=>console.log('listen on http://localhost:3000'))
