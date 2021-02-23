

var http = require('http');
var querystring = require('querystring');

var Request = {};
var WorldUnitCity = {};


Request.postReq = function (Qurary, url, callBack) {
    Request.req(Qurary, url , "POST", callBack);
    
};

Request.getReq = function (Qurary, url, callBack) {
    Request.req(Qurary, url , "GET", callBack);
    
};



Request.req = function (Qurary, url, method, callBack){
    
    var data = querystring.stringify(Qurary);

    var post_options = {
        port: '80',
        path: url,
        host: Elkaisar.CONST.HOST,
        method: method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        var Str = "";
        res.on('data', function (chunk) {
            Str += chunk;
            
        });
        res.on('end', function () {
            if(callBack)
                callBack(Str);
        });
    });

    // post the data
    post_req.write(data);
    post_req.end();
};

module.exports.Request = Request;
module.exports.WorldUnitCity = WorldUnitCity;
module.exports.ServerData  = {};

module.exports.isJson = function (str){
    
        var json = false;
        try {
           json =  JSON.parse(str);
        } catch (e) {
            console.log("Json Parse Error",str);
            return false;
        }
        return json;
    
};

module.exports.broadcast = function (utfMsg){
    var connectedPlayers = Elkaisar.Arr.Players;
    
    for (var iii in connectedPlayers){
        connectedPlayers[iii].connection.sendUTF(utfMsg);
    }
};

exports.getPlayer = function (idPlayer){
    
    var player = Elkaisar.Arr.Players[idPlayer];
    if(player && player.connection && player.connection.connected)
        return player;
    
    return null;
};


exports.escapeHtml = function (text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
};


exports.arrayChunk = function (arr, chunkSize = 50){
    
    var index = 0;
    var arrayLength = arr.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunkSize) {
        myChunk = myArray.slice(index, index+chunkSize);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;  
    
};



exports.getAllWorldCity = function (){
    
    var CityBatches = Math.ceil(module.exports.ServerData.city_num / 250);
   
    for(var iii =0; iii <  CityBatches; iii++)
        Elkaisar.Base.getAllWorldCityPart(iii);
};


exports.getAllWorldCityPart = function (offset){
    
    Elkaisar.Base.Request.postReq(
            {
                "server"  : Elkaisar.CONST.SERVER_ID,
                offset    : offset
            },
            `${Elkaisar.CONST.BASE_URL}/ws/api/ACity/getWorldCity`,
            function (data) {
                var WorldCities = Elkaisar.Base.isJson(data);

                if (!WorldCities)
                    return;
                
                var ii;
                var Unit;
                for(ii in WorldCities)
                {
                    Unit = WorldCities[ii];
                    module.exports.WorldUnitCity[(Unit.x + "." + Unit.y)] = Unit;
                }
                    
            }
    );
};



exports.rand = function (min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};