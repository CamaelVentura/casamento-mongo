import { resolve, dirname } from 'path';
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

  const relativePath = resolve(dirname(module.parent.filename));
  const viewPath = resolve(relativePath, '..', 'src', 'app', 'views', 'emails');
  if (!confirmed) {
    await Mail.sendMail({
      from: {
        name: `${name}`,
        address: 'noreply@claraeluizeduardo.com'
      },
      subject: 'Confirmacao de convidados',
      template: {
        name: `${viewPath}/confirmation.hbs`,
        engine: 'handlebars',
        context: {
          name,
          confirmed_adults,
          confirmed_kids
        }
      }
    });
  } else {
    await Mail.sendMail({
      from: {
        name: `${name}`,
        address: 'noreply@claraeluizeduardo.com'
      },
      subject: 'Reconfirmacao de convidados',
      template: {
        name: `${viewPath}/reconfirmation.hbs`,
        engine: 'handlebars',
        context: {
          name,
          confirmed_adults,
          confirmed_kids
        }
      }
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
