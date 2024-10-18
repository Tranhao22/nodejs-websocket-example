var express = require('express');
var ws = require('./ws');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // Sử dụng middleware để phân tích dữ liệu JSON

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/ws.html');
});

// Tạo endpoint webhook
app.post('/webhook', function (req, res) {
    const data = req.body; // Lấy dữ liệu từ yêu cầu POST
    console.log('Received webhook data:', data);
    
    // Gửi dữ liệu đến tất cả các kết nối WebSocket
    ws.sendToAll(`Received webhook data: ${JSON.stringify(data)}`);
    
    res.status(200).send('Webhook received'); // Gửi phản hồi cho Postman
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
