define({ "api": [
  {
    "type": "get",
    "url": "/history",
    "title": "Request service history",
    "name": "Return_History",
    "group": "Request",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "History",
            "description": "<p>history of API searched cities</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    \"campinas\",\n    \"indaiatuba\"\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Request"
  },
  {
    "type": "get",
    "url": "/cidade/:city",
    "title": "Request city temperature based playlist",
    "name": "Return_Playlist",
    "group": "Request",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city to get temperature</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "temp",
            "description": "<p>temperature of city</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "style",
            "description": "<p>style of music to request based on city temperature</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "playlist",
            "description": "<p>playlist based on city temperature</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>playlist spotify id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>playlist spotify name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>playlist spotify url</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tracks",
            "description": "<p>playlist list of music</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"city\": \"Campinas\",\n    \"temp\": 19,\n    \"style\": \"Rock Music\",\n    \"playlist\": {\n        \"id\": \"4l71w3zzHexLQJ53Fha8sK\",\n        \"name\": \"Rock Music\",\n        \"url\": \"https://api.spotify.com/v1/playlists/4l71w3zzHexLQJ53Fha8sK\",\n        \"tracks\": [\n            {\n                \"url\": \"https://api.spotify.com/v1/tracks/0AVfupGML4DBoQAWsntJnr\",\n                \"id\": \"0AVfupGML4DBoQAWsntJnr\",\n                \"name\": \"Summer Jam\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotValidCity",
            "description": "<p>the city wasn't found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n        Cidade não encontrada\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Request"
  }
] });
