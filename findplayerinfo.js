function findPlayerId(name) {
    try {
        if (sportvalue == "NBA") {
          jsonData = NBAjsonData;
        }
        if (sportvalue == "MLB") {
          jsonData = MLBjsonData
        }
        if (sportvalue == "NHL") {
            jsonData = NHLjsonData;
          }
          if (sportvalue == "WNBA") {
            jsonData = WNBAjsonData
          }
        var data = JSON.parse(jsonData);
        var playerName = name;
        var playerId = null;
        var imageurl = null;
        var returnmsg = null;
        for (var i = 0; i < data.included.length; i++) {
            var item = data.included[i];
            if (
                item.type === "new_player" &&
                item.attributes.display_name === playerName
            ) {
                playerId = item.id;
                imageurl = item.attributes.image_url
                returnmsg = {id: playerId,
                             url: imageurl}
                break;
            }
        }
        if (playerId !== null) {
            return returnmsg;
        } else {
            return "Game Started / Error";
        }
    } catch (error) {
        // Handle JSON parsing errors
    }
  }
  
  function findstats(id, market) {
    try {
        var data = JSON.parse(jsonData);
        var playerid = id;
        var category = getCategoryName(market);
        var prop = null;
        for (var i = 0; i < data.data.length; i++) {
            var item = data.data[i];
            if (
                item.relationships.new_player.data.id === playerid &&
                item.attributes.stat_type === category &&
                item.attributes.odds_type !== "demon" &&
                item.attributes.odds_type !== "goblin"
            ) {
                prop = item.attributes.line_score;
                break;
            }
        }
        if (prop !== null) {
            return prop;
        } else {
            return "Game Started / Error";
        }
    } catch (error) {
        // Handle JSON parsing errors
    }
  }
  
  function getCategoryName(market) {
    var categoryMap = {
        "player_assists": "Assists",
        "player_points": "Points",
        "player_points_assists": "Pts+Asts",
        "player_points_rebounds": "Pts+Rebs",
        "player_points_rebounds_assists": "Pts+Rebs+Asts",
        "player_rebounds_assists": "Rebs+Asts",
        "player_rebounds": "Rebounds",
        "batter_hits_runs_rbis": "Hits+Runs+RBIS",
        "batter_runs_scored": "Runs",
        "batter_total_bases": "Total Bases",
        "batter_walks": "Walks",
        "batter_strikeouts": "Hitter Strikeouts"
    };
    return categoryMap[market] || "";
  }
  
