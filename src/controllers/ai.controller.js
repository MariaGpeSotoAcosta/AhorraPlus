import { takeRequest } from '../ai.js';

export const chatbotResponse = async (req, res) => {
  try {
    const { question } = req.body;
    const aiResponse = await takeRequest(question);

    const resMessage = { response: aiResponse };
    res.status(200).json(resMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong with the chatbot' })
  } 
};
