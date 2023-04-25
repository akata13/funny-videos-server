import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const newVideo = new Video({ userId: user.email, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const getVideos = async (req, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const skipIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await Video.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (skipIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await Video.find(req.params.id)
      .limit(limit)
      .skip(skipIndex)
      .exec();
    res.paginatedResults = results;

    res.status(200).json(res.paginatedResults);
  } catch (err) {
    next(err);
  }
};
