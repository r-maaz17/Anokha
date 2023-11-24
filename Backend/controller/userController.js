const User = require('../models/user');
const TempUser = require('../models/TempUser');
const nodemailer = require('nodemailer');
const {createNewCart} = require('./cartController');



// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    if (user.RoleId === "user")
    {
      const payload = {
        userId: user._id,
        cartItems: []
      }
      await createNewCart(payload)
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get verification code of the user from the database
const getUserVerificationCode = async (Email) => {
    const user = await TempUser.findOne({ Email: Email })
    return user.verificationCode;
}

// Generates a random number
const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  return randomNumber;
};

//Generate Verification Code
const generateVerificationCode = async (user) => {
    const number = generateRandomNumber();
    const tempUser = await TempUser.findOneAndUpdate(
      { _id: user._id },
      { $set: { verificationCode: number } },
      { new: true } // This ensures that the updated document is returned
    );
    return number;
}


//Sign up a user and stores data into temperary table until user is verified.
exports.signUp = async (req, res) => {
  const user = await User.findOne({ Email: req.body.Email });
  if (!user) {
    var tempUser = await TempUser.findOne({ Email: req.body.Email })
    if (!tempUser) {
      tempUser = new TempUser(req.body)
      await tempUser.save()
    }
    console.log
    const code = await generateVerificationCode(tempUser);
    console.log("Code===",code)
    await SendEmail(req.body.Email,'Your Verification Code',`Your verification code is ${code}`,'')
    res.status(200).json({ message: 'Code Sent' });
  }
  else {
    res.status(200).json({ error: 'User Already exists' })
  }
};


// Return the number of tries user tried to enter verification code
const getTries = async (Email) => {
  const user = await TempUser.findOne({ Email: Email });
  console.log(user)
  return user.tries;
}


//Check the verification code entered by user on the time of signup
exports.checkCode = async (req, res) => {
  // try {
    const code = req.body.code;
    const result = await getUserVerificationCode(req.body.Email)
    const tries = await getTries(req.body.Email)
    //res.status(200).json(tries);
    if (parseInt(tries) < 10) {
      if (result === code) {
        const tempUserData = await TempUser.findOne({ Email: req.body.Email });
        const payload = {
          Username: tempUserData.Username,
          Email: tempUserData.Email,
          Password: tempUserData.Password,
          RoleId: "user"
        }
        const user = new User(payload)
        await user.save();
        const newCart = {
          userId: user._id,
          cartItems: []
        }
        await createNewCart(newCart);
        const removeUser = await TempUser.findOneAndRemove({Email:req.body.Email})
        res.status(200).json({ status: 'Successfull' })
      }
      else {
        const tempUser = await TempUser.findOneAndUpdate(
          { Email: req.body.Email },
          { $set: { tries: parseInt(tries) + 1 } },
          { new: true } // This ensures that the updated document is returned
        );
        res.status(403).json({error:"Wrong code"})
      }
    }
    else {

      res.status(429).json({ status: 'too many requests' })

    }

}
// Get a user by UserId
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by UserId
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by UserId
exports.deleteUser = async (req, res) => {
  // try {
  console.log(req.params.userId)
  const user = await User.findOneAndRemove({ _id: req.params.userId });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(204).send();
  // }
  //   catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
};



// Sends mail to a user based on email
const SendEmail = async (email,subject,message,htmlCode) => {
  // try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ammarfarooq207@gmail.com",
        pass: "wtkyhcsfepzlvwgs",
      },
    });
    // console.log(transporter.auth)
    var mailOptions = {
      from: "ammarfarooq207@gmail.com",
      to: email,
      subject: subject,
      text: message,
      html: `${htmlCode}`

    };
    // console.log(mailOptions)
    transporter.sendMail(mailOptions, function(error, info){
    });



  //   // res.send("I am ready")
  // } catch (error) {
  //   console.log(error.message);
  //}
};
