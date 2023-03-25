const db = require("../models");

const Employee = db.employee;

const createEmployee = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "card") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { name, surname, number, telephone, note } = req.body;
  const { createby } = req.user.role

  if (!name) {
    return res.status(400).json({ message: "Please fill out the name field" });
  }

  if (!surname) {
    return res.status(400).json({ message: "Please fill out the surname field" });
  }

  if (!number) {
    return res.status(400).json({ message: "Please fill out the number field" });
  }

  if (!telephone) {
    return res.status(400).json({ message: "Please fill out the telephone field" });
  }


  const alreadyExistsEmployee = await Employee.findOne({
    where: { number },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (alreadyExistsEmployee) {
    return res.status(402).json({ message: "Employee already exists!" });
  }

  const newEmployee = new Employee({ name, surname, number, telephone, note, createby });
  const saveEmployee = await newEmployee.save().catch((err) => {
    console.log("Error: ", err);
    res.status(403).json({ error: "Cannot create employee at the moment!" });
  });

  if (saveEmployee)
    return res.status(200).json({ message: "Employee created successfully!" });
};

  
  const getAllEmployees = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const employees = await Employee.findAll({});
    return res.status(200).send(employees);
  };
  

  const getEmployeeWithAllParams = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const { id, name, surname, number, telephone, note } = req.query;
  
    const whereClause = {};
    if (id) {
      whereClause.id = id;
    }
    if (name) {
      whereClause.number = number;
    }
    if (surname) {
      whereClause.surname = surname;
    }
    if (number) {
      whereClause.number = number;
    }
    if (telephone) {
      whereClause.telephone = telephone;
    }
    if (note) {
        whereClause.note = note;
    }

    const employees = await Employee.findAll({ where: whereClause });
    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found with the given parameters" });
    }
  
    return res.status(200).send(employees);
  };

  const updateEmployee = async (req, res) => {
    const { name, surname, number, telephone, note } = req.body;
  
    // If user is not an admin or card, they can only update their own employee
    if (
      req.user.role !== "admin" &&
      req.user.role !== "card" &&
      req.user.company_id !== parseInt(req.params.id)
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const alreadyExistsEmployee = await Employee.findOne({
      where: { number },
    }).catch((err) => {
      console.log("Error: ", err);
    });
  
    if (alreadyExistsEmployee) {
      if (alreadyExistsEmployee.id !== parseInt(req.params.id)) {
        return res.status(402).json({ message: "Employee already exists!" });
      }
    }
  
    const employee = await Employee.findOne({ where: { id: req.params.id } });
  
    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }
  
    employee.name = name || employee.name;
    employee.surname = surname || employee.surname;
    employee.number = number || employee.number;
    employee.telephone = telephone || employee.telephone;
    employee.note = note || employee.note;
    
    const updatedEmployee = await employee.save();
    if (!updatedEmployee) {
      return res.status(400).json({ message: "Error updating Employee" });
    }
  
    return res.status(200).json({ message: "Employee updated successfully!" });
  };
   
    

  const deleteEmployee = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const employee = await Employee.findOne({ where: { id: req.params.id }});
  
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
  
    await employee.destroy();
  
    return res.status(200).json({ message: "Employee deleted successfully" });
  };


module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeWithAllParams,
    updateEmployee,
    deleteEmployee
}