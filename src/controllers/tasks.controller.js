import task from '../models/task.model.js';

//Funciones del crud para tareas 

export const getTasks = async (req,res) => {
    //encuentra todas las tareas del propio usuario
    const tasks = await task.find({
        user: req.user.id
    }).populate('user') //relaciona la coleecion user y task en base al id del usuario en mongo y permite obtener como
    // respuesta tanto la tarea como toda la informacion del usario que realizo la tarea. 
    res.json(tasks);
};

export const creatTask = async (req,res) => {
    const {title, desc, date} = req.body; //crea una nueva tarea con los datos del front y la guarda en la base de datos
    
    console.log(req.user);
    
    const newTask = new task({
        title,
        desc,
        date,
        user: req.user.id
    });
    const savedtask = await newTask.save();
    res.json(savedtask);
};

export const getTask = async (req,res) => {
    const Task = await task.findById(req.params.id)
    if(!Task) return res.status(404).json({message: 'Tasks no found'}); 
    res.json(Task); //Busca una tarea en base al id enviado a traves de la url.
};

export const deleteTask = async (req,res) => {
    const Task = await task.findByIdAndDelete(req.params.id); //Busca y elimina una tarea en base al id enviado a través de la url.
    if(!Task) return res.status(404).json({message: 'Tasks no found'});
    return res.sendStatus(204);  //204 significa que todo estuvo bien pero no tengo de devolver algo.
};

export const updateTask = async (req,res) => {
    const Task = await task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!Task) return res.status(404).json({message: 'Tasks no found'}); //busca y actualiza una traea en base al id obtenido de la url.
    res.json(Task);
}; 