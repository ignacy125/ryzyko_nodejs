
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8083);
console.log("working");



function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }


    res.writeHead(200);
    res.end(data);
  });

}



io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
    socket.on('send_deployed_units_amount', function (data) {
        console.log('przed rozmieszczeniem: '+ data);
        fs = require('fs');
        var users_json = JSON.parse(fs.readFileSync('users.json').toString());
        user1_units_to_deploy = users_json["users"]["user1"]["units_to_deploy"] -=1;
        fs.writeFile('users.json', JSON.stringify(users_json));
        fs1 = require('fs');
        var dataCountries = JSON.parse(fs1.readFileSync('countries.json').toString());
        var alaska_units = dataCountries["continents"]["North_america"]["Alaska"]["units"] +=1;
        fs1.writeFile('countries.json', JSON.stringify(dataCountries));


        console.log('po rozmieszczeniu Alaska units '+alaska_units);
        console.log('po rozmieszczeniu user 1 units to deploy '+user1_units_to_deploy);
    });
  socket.on('testowy_event', function (data) {
    console.log(data);
  });

});

