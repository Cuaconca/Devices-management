const colors = require('colors')

// Import model device
const Device = require('../models/devicesModel')


module.exports.createDevice = async (req, res, next) => {

    try {
        console.log(req.body)
        // Lấy ra tất cả id hiện có
        const existingIds = await Device.find({}, 'id');
    
        // Tạo mảng id hiện có
        const existingIdArray = existingIds.map(item => item.id);
    
        // Tìm id đầu tiên thiếu
        let newId = 1;
        while (existingIdArray.includes(newId)) {
          newId++;
        }

        const newDevice = new Device({
            id: newId,
            name: req.body.name,
            type: req.body.type,
            desc: req.body.desc,
            date: req.body.date,
            status: req.body.status,
        });

        
        try {
            console.log("Save devices succesfully!".bgBlue.bold)
            const savedDevice = await newDevice.save();
            res.status(201).json(savedDevice);
        } catch (error) {
            console.log("Save devices failure!".red.bold)
            res.status(400).json({ message: error.message });
        }

    } catch(error) {
        console.log("Save devices failure!".bgRed.bold)
        res.status(400).json({ message: error.message });
    }

    
    
}

module.exports.getDevice = async (req, res, next) => {
    const data = await Device.find().then(result => {
        return res.status(200).json({
            success: true,
            message: result
        })
    });
}

module.exports.updateDevice = async (req, res, next) => {
    console.log('update router')
    // const { id } = req.params; // Lấy id của sản phẩm từ request params
    const { id , name, type, desc, date, status } = req.body; // Lấy thông tin cập nhật từ request body
    console.log(req.body)
    try {
        const updatedDevice = await Device.findOneAndUpdate({ id: id }, { name, type, desc, date, status }, { new: true }); // Tìm và cập nhật sản phẩm với id tương ứng
        if (!updatedDevice) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm để cập nhật' });
        }
        res.status(200).json(updatedDevice);
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật sản phẩm' });
    }
}

module.exports.deleteDevice = async (req, res, next) => {
    const { id } = req.params; // Lấy id từ request params

    try {
        const devices = await Device.findOneAndDelete({ id: id }); // Tìm và xóa thiết bị với id tương ứng
        if (!devices) {
            return res.status(404).json({ message: 'Không tìm thấy thiết bị để xóa' });
        }
        res.status(200).json({ message: 'Thiết bị đã được xóa thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa thiết bị:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa thiết bị' });
    }
}