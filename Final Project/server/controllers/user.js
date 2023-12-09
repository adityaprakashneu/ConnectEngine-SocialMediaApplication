import User from "../models/user";

// READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    console.log(req)
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = user.friends.filter((id) => id !== id);
        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    
    const { id } = req.params;
    const user = await User.findOne({ email: id });
    console.log(user);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }

    if (user) {
      const {
        firstName,
        lastName,
        email,
        location,
        occupation,
      } = req.body;

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.location = location;
      user.occupation = occupation;

      await user.save();

      res.status(200).json({ user });

    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};