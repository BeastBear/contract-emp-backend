const db = require("../models");

const Company = db.company;
const User = db.user;

const createCompany = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "card") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { name, address, telephone } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Please fill out the name field" });
  }

  if (!address) {
    return res.status(400).json({ message: "Please fill out the address field" });
  }

  if (!telephone) {
    return res.status(400).json({ message: "Please fill out the telephone field" });
  }

  const alreadyExistsCompany = await Company.findOne({
    where: { name },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (alreadyExistsCompany) {
    return res.status(402).json({ message: "Company already exists!" });
  }
  if (isNaN(telephone)) {
    return res.status(403).json({ message: "Telephone number should be a number!" });
  }

  const newCompany = new Company({ name, address, telephone });
  const saveCompany = await newCompany.save().catch((err) => {
    console.log("Error: ", err);
    res.status(403).json({ error: "Cannot create company at the moment!" });
  });

  if (saveCompany)
    return res.status(200).json({ message: "Company created successfully!" });
};

const getInfoCompany = async (req, res) => {
  try {
    // return unauthorized message for admin and card users
    if (req.user.role === "admin" || req.user.role === "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // find the user's company based on their id
    const user = await User.findOne({ where: { id: req.user.id } });
    const companyId = user.company_id;

    // find the company info based on the company id
    const company = await Company.findOne({ where: { id: companyId } });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // return the company info
    return res.json(company);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


  const getAllCompanies = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const companies = await Company.findAll({});
    return res.status(200).send(companies);
  };
  

  const getCompanyWithAllParams = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const { id, name, telephone } = req.query;
  
    const whereClause = {};
    if (id) {
      whereClause.id = id;
    }
    if (name) {
      whereClause.name = name;
    }
    if (telephone) {
      whereClause.telephone = telephone;
    }

    const companies = await Company.findAll({ where: whereClause });
    if (companies.length === 0) {
      return res.status(404).json({ message: "No companies found with the given parameters" });
    }
  
    return res.status(200).send(companies);
  };

  const updateCompany = async (req, res) => {
    const { name, address, telephone } = req.body;

    // If user is a company user, don't use req.params.id
    const companyId = req.user.role === "company" ? req.user.company_id : req.params.id;

    const alreadyExistsCompany = await Company.findOne({
      where: { name },
    }).catch((err) => {
      console.log("Error: ", err);
    });
  
    if (alreadyExistsCompany) {
      if (alreadyExistsCompany.id !== companyId) {
        return res.status(402).json({ message: "Company already exists!" });
      }
    }
  
    const company = await Company.findOne({ where: { id: companyId } });
  
    if (!company) {
      return res.status(404).json({ message: "Company not found!" });
    }
  
    company.name = name || company.name;
    company.address = address || company.address;
    
    if (telephone) {
      if (isNaN(telephone)) {
        return res.status(403).json({ message: "Telephone number should be a number!" });
      }
      company.telephone = telephone || company.telephone;
    }
    
    const updatedCompany = await company.save();
    if (!updatedCompany) {
      return res.status(400).json({ message: "Error updating Company" });
    }
  
    return res.status(200).json({ message: "Company updated successfully!" });
  };

   
    

  const deleteCompany = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const company = await Company.findOne({ where: { id: req.params.id }});
  
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
  
    await company.destroy();
  
    return res.status(200).json({ message: "Company deleted successfully" });
  };


module.exports = {
    createCompany,
    getAllCompanies,
    getInfoCompany,
    getCompanyWithAllParams,
    updateCompany,
    deleteCompany
}