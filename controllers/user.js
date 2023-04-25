import Video from "../models/Video.js";

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  try {
    await Video.findByIdAndUpdate(videoId, [
      {
        $set: {
          likes: {
            $cond: [
              {
                $in: [id, "$likes"],
              },
              {
                $setDifference: ["$likes", [id]],
              },
              {
                $concatArrays: ["$likes", [id]],
              },
            ],
          },
          dislikes: {
            $setDifference: ["$dislikes", [id]],
          },
        },
      },
    ]);
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, [
      {
        $set: {
          dislikes: {
            $cond: [
              {
                $in: [id, "$dislikes"],
              },
              {
                $setDifference: ["$dislikes", [id]],
              },
              {
                $concatArrays: ["$dislikes", [id]],
              },
            ],
          },
          likes: {
            $setDifference: ["$likes", [id]],
          },
        },
      },
    ]);
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    next(err);
  }
};
