import Employee from "../models/Employee.js";

// GET ALL (with search + filter + pagination)
export const getEmployees = async (req, res) => {
  try {
    const { search, department, designation, status, page = 1, limit = 5 } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (department) query.department = department;
    if (designation) query.designation = designation;
    if (status) query.status = status;

    const total = await Employee.countDocuments(query);

    const employees = await Employee.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      employees,
      totalPages: Math.ceil(total / limit),
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE
export const getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    res.json(emp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
export const createEmployee = async (req, res) => {
  try {
    let docs = [];

    if (req.files) {
      docs = req.files.map(file => ({
        name: file.originalname,
        url: `/uploads/${file.filename}`,
      }));
    }

    const employee = new Employee({
      ...req.body,
      documents: docs,
    });

    await employee.save();

    res.status(201).json(employee);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateEmployee = async (req, res) => {
  try {
    let docs = [];

    if (req.files) {
      docs = req.files.map(file => ({
        name: file.originalname,
        url: `/uploads/${file.filename}`,
      }));
    }

    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(docs.length && { $push: { documents: { $each: docs } } }),
      },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};