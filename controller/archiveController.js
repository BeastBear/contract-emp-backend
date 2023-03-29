const db = require('../models')

const Archive = db.archive
const Employee = db.employee
const Contract = db.contract
const Company = db.company

  const createArchives = async ( req , res ) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const { employee_id, contract_id, department1, department2, department3, remark } = req.body;
    if (isNaN(employee_id)) {
      return res.status(402).json({ message: "Employee_id should be a number!" });
    }
    if (isNaN(contract_id)) {
      return res.status(402).json({ message: "Contract_id should be a number!" });
    }
    
    const newArchive = new Archive({ employee_id, contract_id, department1, department2, department3, remark })
    const saveArchive = await newArchive.save().catch((err) => {
      console.log("Error: ", err);
      res.status(403).json({ error: "Cannot create archive at the moment!" })
    })

    if (saveArchive) res.status(200).json({ message: "Archive create successfully!" });
  };   

  const getAllArchives = async (req, res) => {
    if (req.user.role === "admin" || req.user.role === "card") {
      const archive = await Archive.findAll({
        include: [
          { model: Employee, as: "employee" },
          { model: Contract, as: "contract", include: { model: Company, as: "company" } },
        ]
      });
      res.status(200).send(archive);
    } else if (req.user.role === "company") {
      const archive = await Archive.findAll({
        include: [
          { model: Employee, as: "employee" },
          { model: Contract, as: "contract", include: { model: Company, as: "company" } },
        ],
        where: { "$contract.company_id$": req.user.company_id },
      });
      res.status(200).send(archive);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };  

  const getArchiveWithAllParams = async ( req , res ) => {
    const whereClause = {};
    if (req.user.role === "company") {
      whereClause['$contract.company_id$'] = req.user.company_id;
      whereClause['$employee.createby$'] = req.user.company_id;
    }
    

    const { id, employee_id, contract_id, department1, department2, department3, remark, company_id } = req.query;
    
    if (id) {
      whereClause.id = id;
    }
    if (employee_id) {
        whereClause.employee_id = employee_id;
    }
    if (contract_id) {
        whereClause.contract_id = contract_id;
    }
    if (department1) {
        whereClause.department1 = department1;
    } 
    if (department2) {
        whereClause.department2 = department2;
    }   
    if (department3) {
        whereClause.department3 = department3;
    }
    if (remark) {
        whereClause.remark = remark;
    }
    if (company_id) {
      whereClause['$contract.company.id$'] = company_id;
  }    

    const archives = await Archive.findAll({
      where: whereClause,
      include: [
        { model: Employee, as: "employee" },
        { model: Contract, as: "contract" , include: { model: Company, as: "company" } },
      ]
    })

    if (archives.length === 0) {
      return res.status(404).json({ message: "No Archives found with the give parameters" });
    }

    return res.status(200).json(archives)
  }

  const updateArchive = async ( req , res ) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { employee_id, contract_id, department1, department2, department3, remark } = req.body;
    
    const archive = await Archive.findOne({ where: {id: req.params.id } })
    
    if (!archive) {
      return res.status(404).json({ message: "Archive not found"})
    }

    if (employee_id) {
      if (isNaN(employee_id)) {
        return res.status(403).json({ message: "Employee_id should be a number!" });
      }
      archive.employee_id = employee_id || archive.employee_id;
    }
    if (contract_id) {
      if (isNaN(contract_id)) {
        return res.status(403).json({ message: "Contract_id should be a number!" });
      }
      archive.contract_id = employee_id || archive.contract_id;
    }
    
    archive.department1 = department1 || archive.department1;
    archive.department2 = department2 || archive.department2;
    archive.department3 = department3 || archive.department3;
    archive.remark = remark || archive.remark;

    const updatedArchive = await archive.save();
    if (!updatedArchive) {
        return res.status(400).json({ message: "Error updating Archive"})
    }
    return res.status(200).json({message: "Archive update successfully!"})
  }

  const deleteArchive = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const archive = await Archive.findOne({ where: { id: req.params.id }});
  
    if (!archive) {
      return res.status(404).json({ message: "Archive not found" });
    }
  
    await archive.destroy();
  
    return res.status(200).json({ message: "Archive deleted successfully" });
  };

module.exports = {
    createArchives,
    getAllArchives,
    getArchiveWithAllParams,
    updateArchive,
    deleteArchive
}