const mongoose = require("mongoose");

const FeeConfigSchema = new mongoose.Schema({
  1: { type: Number, required: true, default: 0 },
  2: { type: Number, required: true, default: 0 },
  3: { type: Number, required: true, default: 0 },
  4: { type: Number, required: true, default: 0 },
  5: { type: Number, required: true, default: 0 },
  6: { type: Number, required: true, default: 0 },
  7: { type: Number, required: true, default: 0 },
  8: { type: Number, required: true, default: 0 },
  9: { type: Number, required: true, default: 0 },
  10: { type: Number, required: true, default: 0 },
  11: { type: Number, required: true, default: 0 },
  12: { type: Number, required: true, default: 0 },
  13: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const FeeConfig =  mongoose.model("FeeConfig", FeeConfigSchema);
module.exports = FeeConfig;
