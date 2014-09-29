var express = require('express')
var app = express();
var gclib = require('goodscloud');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
    var c = new gclib('http://sandbox.goodscloud.com');
    c.login('XXX', 'XXX',
        function () {
            console.info("Logged in as", c.email);
            c.get('/api/internal/company', {flat: true}, function (data) {
                console.info(data);
            });
        }
    );

    response.send('Hello World!')
})

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})
