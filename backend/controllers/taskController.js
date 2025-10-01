import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, user: req.user._id });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;

  const updated = await task.save();
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await task.deleteOne();
  res.json({ message: "Task removed" });
};
