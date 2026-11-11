const express = require('express');
const router = express.Router();
const Task = require('../model/Task');

router.get('/',async (req,res) => {
    try {
        const filter = req.query.status ? {status:req.query.status} : {};
        const tasks = await Task.find(filter).sort({createdAt: -1});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});

router.post('/',async (req,res) => {
    try {
        const {description} = req.body;
        if(!description) return res.status(400).json({ error: 'Description required' });
        const newTask = await Task.create({description});
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});

router.put('/:id',async (req,res) => {
    try {
        const {description,status} = req.body;
        const updateData = {};
        if(description !== undefined) updateData.description = description;
        if(status !== status) updateData.status = status;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateData, {new:true});
        if(!updatedTask) return res.status(400).json({error: "Task not found"});
        res.json(updatedTask); 
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id',async (req,res) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;