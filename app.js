const express = require('express')
const app = express()
const port = 3000
const path = require('path');

// Cấu hình bodyparser để đọc req từ form theo method post
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình middleware để sử dụng tệp tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

//Connect db
const connectToMongoDB = require('./models/mongoConnect');
// Kết nối đến MongoDB
connectToMongoDB();

// Import devices Route:
const devicesRoute = require('./routers/devices.route')

app.use('/api/v1/devices', devicesRoute);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})