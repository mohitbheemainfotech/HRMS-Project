import Payroll from "../models/Payroll.js";


// GET ALL PAYROLL
export const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().sort({
      createdAt: -1,
    });

    res.status(200).json(payrolls);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// CREATE PAYROLL
export const createPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.create(req.body);

    res.status(201).json(payroll);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE PAYROLL
export const deletePayroll = async (req, res) => {
  try {
    await Payroll.findByIdAndDelete(req.params.id);

    res.json({
      message: "Payroll deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};