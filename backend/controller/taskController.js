import Task from "../model/Task.js";


export const createTask =async (req,res)=>{
 try{
  const{title,description}=req.body;
  if(!title){
          return res.status(400).json({ message: "Title required" });

  };
  const task=await Task.create({
     title,
     description,
     user:req.user._id,
  });

  res.status(201).json(task);

 }catch(error){
    res.status(500).json({ message: error.message });
 }
};

export const getTasks=async(req,res)=>{
try{
  
  const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const status = req.query.status;
    const search = req.query.search;

     let query = { user: req.user._id };
     
    if (status) query.status = status;

      if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });


    res.json(tasks);

}catch(error){
    res.status(500).json({message:error.message});
};
};


export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Task.countDocuments({ user: userId });

    const completed = await Task.countDocuments({
      user: userId,
      status: "completed",
    });

    const pending = await Task.countDocuments({
      user: userId,
      status: "pending",
    });

  
    const recent = await Task.find({ user: userId })
      .sort({ updatedAt: -1 })
      .limit(5);

    res.json({
      total,
      completed,
      pending,
      recent, 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

