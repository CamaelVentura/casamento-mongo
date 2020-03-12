import Place from '../schemas/Place';

export const store = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  const placeUpdated = await Place.findByIdAndUpdate(id, {
    img: filename
  });

  return res.json(placeUpdated);
};

export const index = async (req, res) => { };
