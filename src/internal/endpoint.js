const qs = require("querystring");
const weather = require("../external/weather");
const music = require("../external/music");

process.env.history = "[]";

module.exports = (app) =>{
    app.get('/history/', returnHistory);
    app.get('/cidade/:city', processReq);
}

const processReq = (req, res) => {
    
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

    let cityName = req.params.city;

    if(cityName == ""){
        res.status(400).send("Parâmetro cidade em branco");
        res.end();
        return;
    }

    cityName = encodeURI(cityName);

    console.log(`\nEntrada de parametro via GET\n${cityName}\n`);

    weather.getWeather(req, res, cityName);
    
}

exports.returnTemp = (req, res, temp) => {
    let tempo = {"temperatura" : temp, "cidade" : req.query.city}

    console.log(`\nRetorno da requisição de temperatura\n${JSON.stringify(tempo)}\n`);

    let style;

    if(temp > 25)
        style = "Pop Song"
    else if (temp < 10)
        style = "Classical Music"
    else
        style = "Rock Music"

    console.log(`\nEstilo retornado baseado na temperatura\n${style}\n`);

    //res.status(200).send("Até aqui estamos bem");
    
    music.searchPlaylist(req, res, temp, style, req.params.city);
    //music.getNewToken(req, res);
    //music.refreshToken(req, res);
}

exports.returnFinal = (req, res, dataOut) =>{

    var histTemp = process.env.history;
    
    histTemp = JSON.parse(histTemp);
    histTemp.push(dataOut.city);

    process.env.history = JSON.stringify(histTemp);
    
    console.log(dataOut.city);
    res.status(200).send(dataOut);
    res.end();
}

const returnHistory = (req, res) => {

    var histTemp = process.env.history;
    
    histTemp = JSON.parse(histTemp);

    console.log(process.env.history);

    res.status(200).send(histTemp);

}