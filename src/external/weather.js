const http = require('http');
const endpoint = require('../internal/endpoint');


exports.getWeather = (req, res, city) => {
    const weatherApiKey = '7c3986a54d9ceeaa887470e424ccf285';

    var json = "",temp;

    var options = {
        host: 'api.openweathermap.org',
        path: `/data/2.5/weather?q=${city}&appid=${weatherApiKey}`,
        method: 'GET'
    };

    callback = (response) => {
        var str = '';

        //pacote de dado recebido, incremente à 'str'
        response.on('data', (chunk) => {
            str += chunk;
        });

        //a resposta inteira retornou
        response.on('end', () => {
            console.log(str);
            json = JSON.parse(str);

            if(response.statusCode == 200){
                let tempo = json.main.temp - 273.15;
                endpoint.returnTemp(req, res, tempo);
            }else if(response.statusCode == 404){
                res.status(404).send("Cidade não encontrada");
                return "error";
            }else{
                res.status(400).send("Ocorreu um erro, tente novamente mais tarde");
                return "error";
            }
        });
    }

    http.request(options,callback).end();

}   