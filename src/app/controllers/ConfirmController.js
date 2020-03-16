import Guest from '../schemas/Guest';
import Mail from '../../lib/Mail';

export const update = async (req, res) => {
  const guest = await Guest.findOne({
    name: req.params.name
  });

  const { confirmed } = guest;
  const { confirmed_adults = 0, confirmed_kids = 0 } = req.body;

  const { name } = await Guest.findByIdAndUpdate(
    guest.id,
    {
      confirmed_adults,
      confirmed_kids,
      confirmed: true
    },
    { new: true }
  );
  if (!confirmed) {
    await Mail.sendMail({
      subject: 'Confirmacao de convidados',
      template: 'confirmation',
      context: {
        name,
        confirmed_adults,
        confirmed_kids
      }
    });
  } else {
    console.log(`aquiiiiii`);
    await Mail.sendMail({
      subject: 'Reconfirmacao de convidados',
      html: '<b>Wow Big powerful letters</b>'
    });
  }

  return res.json(name);
};

export const index = async (req, res) => {
  const guests = await Guest.find({
    confirmed: true
  }).sort('name');

  return res.json(guests);
};
