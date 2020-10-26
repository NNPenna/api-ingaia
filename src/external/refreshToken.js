const https = require('follow-redirects').https;
const music = require('./music');

//Token inicial da api
process.env.spotifyToken = ''; 

const clientCredentials = 'YTQ3YWZhMjAyNjM0NGNlNWIwNjE2ZDdmMWNkNjYyMWM6MDNhYjhjODY2MGZjNDM5ZGFkOGI5YTdiZDI0NWQ1ZWM=';

exports.getNewToken = (req, res, temp, style, city) =>{
   // console.log(`\nAccess token: ${process.env.spotifyToken}`);

    var options = {
        method : 'POST',
        host : 'accounts.spotify.com',
        path : '/api/token',
        headers : {
            'Authorization' : `Basic ${clientCredentials}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    };

    callback = (responseToken) =>{
         var chunks = [];
   
        responseToken.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        responseToken.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            body = JSON.parse(body);
            console.log(`\nNew Access Token: ${body.access_token}\n`);
            process.env.spotifyToken = body.access_token;

             music.searchPlaylist(req, res, temp, style, city);
 //           res.status(200).send("Token atualizado");
        });
    
        responseToken.on("error", function (error) {
            console.error(error);
        });
    }
   
   var qs = require('querystring');
   
   var request = https.request(options, callback);
   
   var postData = qs.stringify({
     'grant_type': 'client_credentials'
   });
   
   request.write(postData);
   
   request.end();

}
