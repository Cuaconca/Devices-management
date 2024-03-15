const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  id: {type: Number, unique: true, required: true},
  name: { type: String, required: true },
  type: { type: String, required: true },
  desc: { type: String },
  date: { type: String },
  status: { type: String, enum: ['Hoạt động', 'Bảo trì', 'Không hoạt động'], default: 'Hoạt động' },
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
