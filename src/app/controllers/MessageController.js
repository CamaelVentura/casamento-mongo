import pt from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import Message from '../schemas/Message';

export const store = async (req, res) => {
  const { name, body = '' } = req.body;

  const date = new Date();
  const formated_date = format(date, "dd 'de' MMMM,  H:mm'h'", {
    locale: pt
  });

  const message = await Message.create({
    name,
    body,
    formated_date
  });

  return res.json(message);
};

export const index = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: 'desc' });

  res.json(messages);
};
