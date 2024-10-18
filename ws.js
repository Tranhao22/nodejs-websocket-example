var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8000 });

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message);
        // Gửi phản hồi ngay lập tức
        ws.send(`Server received: ${message}`);
    });

    setInterval(
        // () => ws.send(`${new Date()}`),
        () => ws.send(`test`),
        5000
    );
});

// Thêm phương thức gửi dữ liệu đến tất cả các kết nối
function sendToAll(message) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === client.OPEN) {
            client.send(message);
        }
    });
}

// Xuất phương thức để sử dụng trong server.js
module.exports = { sendToAll };
