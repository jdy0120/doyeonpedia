import User from "../models/User";
import { Request, Response } from "express";

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  location: string;
  picturePath: string;
};

/** READ */
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => {
        User.findById(id);
      })
    );
    const formattedFriends = friends.map((data) => {
      return data;
    });
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/** UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => {
        User.findById(id);
      })
    );
    const formattedFriends = friends.map((data) => {
      return data;
    });
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
