import Agent from "../models/agent.js";
import { sendToken } from "../utils/features.js";

export const createAgent = async (req, res) => {
    const { name, email,password, role } = req.body;
    
    if (!name || !email || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const newAgent = new Agent({ name, email, password, role });
      await newAgent.save();
      sendToken(res, newAgent, 201, 'Agent Created!');
    //   res.status(201).json(newAgent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };