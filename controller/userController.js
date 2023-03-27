const db = require('../models')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRounds = 10;

const User = db.user
const Company = db.company

const createAdminUser = async (req, res) => {
  const { name, surname, email, password } = req.body;

  // Check if an admin user already exists
  const adminUser = await User.findOne({ where: { role: 'admin' } });

  if (adminUser) {
    return res.json({ message: 'Admin user already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create the admin user
  const newAdminUser = new User({ name, surname, email, password: hashedPassword, role: 'admin' });

  try {
    await newAdminUser.save();
    return res.json({ message: 'Admin user created successfully' });
  } catch (err) {
    console.log(err);
    return res.json({ message: 'Error creating admin user' });
  }
};


const registerUser = async (req, res) => {
  const { name, surname, email, password, role, company_id } = req.body;
  const alreadyExistsUser = await User.findOne({ where: { email }}).catch(
    (err) => {
      console.log("Error: ",err);
    }
  );

  if (alreadyExistsUser) {
    return res.json({ message: "Email already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (req.user.role === "company") {
    // company users can't create other users
    return res.json({ message: "Company users can't create other users!" });
  }

  if (req.user.role === "admin") {
    // admin users can create any kind of user
    const newUser = new User({ name, surname, email, role, password: hashedPassword, company_id });
    const savedUser = await newUser.save().catch((err) => {
      console.log("Error: ", err);
      res.json({ error: "Cannot register user at the moment!" });
    });

    if (savedUser) {
      res.json({ message: "User created successfully!" });
    }
  } else if (req.user.role === "card") {
    // card users can only create company users
    if (role === "company") {
      const newUser = new User({ name, surname, email, role, password: hashedPassword, company_id });
      const savedUser = await newUser.save().catch((err) => {
        console.log("Error: ", err);
        res.json({ error: "Cannot register user at the moment!" });
      });

      if (savedUser) {
        res.json({ message: "User created successfully!" });
      }
    } else {
      return res.json({ message: "Card users can't create users with role 'card' or 'admin'!" });
    }
  }
};

  const loginUser = async (req, res) => {
    const { login, password } = req.body
    
    let whereClause;

    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login)) {
        whereClause = { email: login };
    } else {
        whereClause = { username: login };
    }

    const userWithIdentifier = await User.findOne({ 
      where: whereClause
    }).catch((err) => {
      console.log("Error: ", err)
    })
  
    if(!userWithIdentifier)
      return res.json({ message: "Username or email not found!"})
  
    const passwordMatch = await bcrypt.compare(password, userWithIdentifier.password);

    if (!passwordMatch)
        return res.json({ message: "Password does not match!"})
    
    const jwtToken = jwt.sign({ 
        id: userWithIdentifier.id,
        email: userWithIdentifier.email,
        username: userWithIdentifier.username,
        password: userWithIdentifier.password,
        role: userWithIdentifier.role,},
        process.env.JWT_SECRET )
    
    res.json({ message: "Welcome Back!", token: jwtToken })
  }

  const getInfoUser = async (req, res) => {
    try {
      let includeCompany = true;
      if (req.user.role === 'card' || req.user.role === 'admin') {
        includeCompany = false;
      }
  
      const user = await User.findOne({
        where: { id: req.user.id },
        include: includeCompany ? { model: Company, as: 'company' } : undefined,
      });
  
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const getAllUsers = async ( req , res ) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    const users = await User.findAll({
      include: {
        model: Company,
        as: 'company'
      }
    })
    res.status(200).send(users)
  }

  const getUserWithAllParams = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const { id, name, surname, telephone, role, company_id } = req.query;
  
    const whereClause = {};
    if (id) {
      whereClause.id = id;
    }
    if (name) {
      whereClause.name = name;
    }
    if (surname) {
      whereClause.surname = surname;
    }
    if (telephone) {
      whereClause.telephone = telephone;
    }
    if (role) {
      whereClause.role = role;
    }
    if (company_id) {
      whereClause.company_id = company_id;
    }
  
    const users = await User.findAll({
      where: whereClause,
      include: {
        model: Company,
        as: 'company',
      }
    });
  
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found with the given parameters" });
    }
  
    return res.json(users);
  };


  const updateUser = async (req, res) => {
    const { name, surname, telephone, username, password } = req.body;
    let user;
  
    if (req.user.role === "card" || req.user.role === "admin") {
      if (!req.params.id) {
        return res.status(405).json({ message: "Update user needs to provide an id" });
      }
      user = await User.findOne({ where: { id: req.params.id } });
    } else if (req.user.role === "company") {
      user = await User.findOne({ where: { id: req.user.id } });
    }
  
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
  
    if (username !== user.username) {
      const alreadyExistsUser = await User.findOne({ where: { username }});
  
      if (alreadyExistsUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
    }
  
    user.name = name || user.name;
    user.surname = surname || user.surname;
    user.telephone = telephone || user.telephone;
    user.username = username || user.username;
  
    if (password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }
  
    const updatedUser = await user.save();
  
    if (!updatedUser) {
      return res.status(400).json({ message: "Error updating user" });
    }
  
    return res.json({ message: "User updated successfully" });
  };  

  const deleteUser = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized access" });
    }
  
    const user = await User.findOne({ where: { id: req.params.id } });
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const deletedUser = await user.destroy();
  
    if (!deletedUser) {
      return res.status(400).json({ message: "Error deleting user" });
    }
  
    return res.json({ message: "User deleted successfully" });
  };

module.exports = {
    createAdminUser,
    registerUser,
    loginUser,
    getInfoUser,
    getAllUsers,
    getUserWithAllParams,
    updateUser,
    deleteUser
}