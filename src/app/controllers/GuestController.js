import Guest from '../schemas/Guest';

export const index = async (req, res) => {
  const guests = await Guest.find().sort('name');

  res.json(guests);
};

export const show = async (req, res) => {
  const { name } = req.body;
  const newName = name.toLowerCase();

  if (!name) {
    return res.status(400).json({ error: 'Voce precisa digitar o nome' });
  }

  const guest = await Guest.findOne({
    name: newName
  });

  if (guest === null) {
    return res
      .status(400)
      .json({ error: 'Voce precisa digitar o nome como esta no convite' });
  }

  return res.json({
    guest
  });
};

export const store = async (req, res) => {
  const { name, expected_adults = 0, expected_kids = 0 } = req.body;

  const verify = await Guest.findOne({ name: name.toLowerCase() });

  if (verify) {
    return res.status(400).json({ Erro: 'Convidado ja cadastrado' });
  }

  const guest = await Guest.create({
    name: name.toLowerCase(),
    expected_adults,
    expected_kids
  });

  return res.json(guest);
};

export const update = async (req, res) => {
  const guest = await Guest.findOne({
    name: req.params.name
  });
  const {
    expected_adults = guest.expected_adults,
    expected_kids = guest.expected_kids
  } = req.body;

  const guestUpdated = await Guest.findByIdAndUpdate(
    guest.id,
    {
      expected_adults,
      expected_kids
    },
    { new: true }
  );

  return res.json(guestUpdated);
};
