var https = require('follow-redirects').https;
var endpoint = require('../internal/endpoint');
var token = require('./refreshToken');
var qs = require('querystring');
const { encode } = require('punycode');
const { send } = require('process');

exports.searchPlaylist = (req, res, temp, style, city) =>{

    var json = "";

    var options = {
        host: 'api.spotify.com',
        path: `/v1/search?q=${encodeURI(style)}&type=playlist`,
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${process.env.spotifyToken}`
        }
    };

    callback = (response) => {
        var str = '';

        //pacote de dado recebido, incremente à 'str'
        response.on('data', (chunk) => {
            str += chunk;
        });

        //a resposta inteira retornou
        response.on('end', () => {
            //console.log(str);
            json = JSON.parse(str);
            
            if(response.statusCode == 401){
                token.getNewToken(req, res, temp, style, city);
                console.log("Desautorizado, solicitando um novo Token");
                return "error";
            }

            if(response.statusCode == 400){
                token.getNewToken(req, res, temp, style, city);
                console.log("Primeiro Início do Servidor, solicitando um Token de acesso");
                return "error";
            }
            if(response.statusCode == 200){
                //Trabalha com a primeira playlist do retorno de dados
                json = json.playlists.items[0];
                console.log(json);
                //endpoint.returnPlaylist(req, res, temp, style, city, json);
                var apiData = {'temp': temp, 'style' : style , 'city' : city, 'playlist' : {'id' : json.id , 'name' : json.name , 'url' : json.href}};
                getMusics(req,res,apiData);
            }

        });
    }

    https.request(options,callback).end();

}

const getMusics = (req, res, data) =>{
    var json = "";

    console.log(data);

    var options = {
        host: 'api.spotify.com',
        path: `/v1/playlists/${data.playlist.id}/tracks`,
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${process.env.spotifyToken}`
        }   
    }

    callback = (response) =>{
        var str = '';

        //pacote de dado recebido, incremente à 'str'
        response.on('data', (chunk) => {
            str += chunk;
        });

        response.on('end', () => {
            console.log(str);
            json = JSON.parse(str);
            
            if(response.statusCode == 401){
                token.getNewToken(req, res, temp, style, city);
                console.log("Desautorizado, solicitando um novo Token");
                return "error";
            }
            
            if(response.statusCode == 200){
                
                var musicas = [];

                for(var musica in json.items){
                    var dataN = {'url' : json.items[musica].track.href , 'id' : json.items[musica].track.id , 'name' : json.items[musica].track.name };
                    console.log(dataN);
                    musicas.push(dataN);
                }

                var dataOut = {
                    'city' : data.city,
                    'temp' : data.temp,
                    'style' : data.style,
                    'playlist' : {
                        'id' : data.playlist.id,
                        'name' : data.playlist.name,
                        'url' : data.playlist.url,
                        'tracks' : musicas
                    }
                }

                console.log(`cidade: ${data.city}`);

                endpoint.returnFinal(req, res, dataOut)
            }

        });
    }

    https.request(options,callback).end();
}