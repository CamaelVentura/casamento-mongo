import Place from '../schemas/Place';

export const store = async (req, res) => {
  const {
    name,
    address = '',
    description = '',
    phone = '(62) 0000-0000',
    type
  } = req.body;

  const verify = await Place.findOne({ name });

  if (verify) {
    return res.status(400).json({ Erro: 'Convidado ja cadastrado' });
  }

  const place = await Place.create({
    name,
    address,
    description,
    phone,
    type
  });

  return res.json(place);
};

export const index = async (req, res) => {
  const places = await Place.find().sort('name');

  res.json(places);
};
