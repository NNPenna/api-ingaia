const express = require('express');
const cors = require('cors');
const app = express();

require('./src/internal/index')(app);

app.use(express.static("public"));

app.use(cors());
app.use(express.json());
app.listen(process.env.PORT || 3333);


/**
 * 
 * @api {get} /cidade/:city Request city temperature based playlist
 * @apiName Return_Playlist
 * @apiGroup Request
 * 
 * @apiParam {String} city city to get temperature
 * 
 * @apiSuccess {Number} temp temperature of city
 * @apiSuccess {String} style style of music to request based on city temperature
 * @apiSuccess {Object} playlist playlist based on city temperature
 * @apiSuccess {String} id playlist spotify id
 * @apiSuccess {String} name playlist spotify name
 * @apiSuccess {String} url playlist spotify url
 * @apiSuccess {Object} tracks playlist list of music
 * @apiSuccess {String} url music spotify url
 * @apiSuccess {String} id music spotify id
 * @apiSuccess {String} name music spotify name
 * 
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "city": "Campinas",
 *          "temp": 19,
 *          "style": "Rock Music",
 *          "playlist": {
 *              "id": "4l71w3zzHexLQJ53Fha8sK",
 *              "name": "Rock Music",
 *              "url": "https://api.spotify.com/v1/playlists/4l71w3zzHexLQJ53Fha8sK",
 *              "tracks": [
 *                  {
 *                      "url": "https://api.spotify.com/v1/tracks/0AVfupGML4DBoQAWsntJnr",
 *                      "id": "0AVfupGML4DBoQAWsntJnr",
 *                      "name": "Summer Jam"
 *                  }
 *              ]
 *          }
 *      }
 * 
 * @apiError NotValidCity the city wasn't found
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 200 OK
 *      {
 *          Cidade não encontrada
 *      }
 */

 
/**
 * 
 * @api {get} /history Request service history
 * @apiName Return_History
 * @apiGroup Request
 * 
 * @apiSuccess {Object[]} History history of API searched cities
 * 
 *  @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          "campinas",
 *          "indaiatuba"
 *      ]
 * 
 */