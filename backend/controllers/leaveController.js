import Leave from "../models/Leave.js";


// ✅ GET ALL LEAVES
export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({
      createdAt: -1,
    });

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ✅ CREATE LEAVE
export const createLeave = async (req, res) => {
  try {
    const { name, type, from, to } = req.body;

    const start = new Date(from);
    const end = new Date(to);

    const days =
      (end - start) /
        (1000 * 60 * 60 * 24) +
      1;

    const leave = await Leave.create({
      name,
      type,
      from,
      to,
      days,
    });

    res.status(201).json(leave);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ✅ UPDATE STATUS
export const updateLeaveStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};