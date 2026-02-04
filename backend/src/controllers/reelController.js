import ReelContent from '../models/ReelContent.js';

export const getAllReels = async (req, res) => {
  try {
    const reels = await ReelContent.find({ isVisible: true }).sort({ displayOrder: 1 });
    res.json(reels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReel = async (req, res) => {
  const reel = new ReelContent({
    titleTA: req.body.titleTA,
    titleEN: req.body.titleEN,
    descriptionTA: req.body.descriptionTA,
    descriptionEN: req.body.descriptionEN,
    type: req.body.type,
    instagramLink: req.body.instagramLink,
    displayOrder: req.body.displayOrder || 0,
    videoFile: req.file ? `/uploads/videos/${req.file.filename}` : null
  });

  try {
    const newReel = await reel.save();
    res.status(201).json(newReel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReel = async (req, res) => {
  try {
    const reel = await ReelContent.findById(req.params.id);
    if (!reel) return res.status(404).json({ message: 'Reel not found' });

    if (req.body.titleTA) reel.titleTA = req.body.titleTA;
    if (req.body.titleEN) reel.titleEN = req.body.titleEN;
    if (req.body.descriptionTA) reel.descriptionTA = req.body.descriptionTA;
    if (req.body.descriptionEN) reel.descriptionEN = req.body.descriptionEN;
    if (req.body.type) reel.type = req.body.type;
    if (req.body.instagramLink) reel.instagramLink = req.body.instagramLink;
    if (req.body.displayOrder !== undefined) reel.displayOrder = req.body.displayOrder;
    if (req.body.isVisible !== undefined) reel.isVisible = req.body.isVisible;
    if (req.file) reel.videoFile = `/uploads/videos/${req.file.filename}`;

    const updatedReel = await reel.save();
    res.json(updatedReel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReel = async (req, res) => {
  try {
    await ReelContent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reel deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
