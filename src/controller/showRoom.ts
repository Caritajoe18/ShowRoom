import { Request, Response } from "express";
import { createMoviesSchema, option, updateMoviesSchema } from "../utils/utils";
import { Movies } from "../model/showRoom";

export const createMovies = async (req: Request | any, res: Response) => {
  try {
    const verified = req.user;
    const validateUser = createMoviesSchema.validate(req.body, option);

    if (validateUser.error) {
      return res
        .status(400)
        .json({ error: validateUser.error.details[0].message });
    }

    const movieRecords = await Movies.create({
      ...req.body,
      user: verified._id,
    });

    return res.status(201).json({
      msg: "Movies created successfully",
      movieRecords,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getMovies = async (req: Request, res: Response) => {
  const getAllMovies = await Movies.find();
  return res.status(200).json({
    msg: "You have all your movie",
    getAllMovies,
  });
};

export const updateMovies = async (req: Request, res: Response) => {
  try {
    //const {_id} = req.params;
    const { title, description, image, price } = req.body;

    const validateUser = updateMoviesSchema.validate(req.body, option);
    if (validateUser.error) {
      return res.status(400).json({
        error: validateUser.error.details[0].message,
      });
    }

    const updateMovie = await Movies.findByIdAndUpdate(
      { _id: req.params.id },
      { new: true }
    );

    if (!updateMovie) {
      return res.status(404).json({
        error: "Movie does not exist",
      });
    }

    return res.status(200).json({
      msg: "You have updated your movie",
      updatedMovie: updateMovie,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const deleteMovies = async (req: Request, res: Response) => {
  try {
    const deletedMovie = await Movies.findByIdAndDelete(
      { _id: req.params.id },
      { new: true }
    );
    if (!deletedMovie) {
      return res.status(400).json({
        error: "Movie does not exist",
      });
    }

    return res.status(200).json({
      msg: "You have deleted your movie",
      deletedMovie,
    });
  } catch (err) {
    console.log(err);
  }
};
