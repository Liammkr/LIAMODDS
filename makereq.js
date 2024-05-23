function makeRequest(eventID, bookmaker, sectionContent) {
  var sport = document.getElementById("sportSelect").value;
  var markets = "";

  if (sport == "basketball_nba" || sport == "basketball_wnba") {
    markets = "player_points,player_rebounds,player_assists,player_points_rebounds_assists,player_points_rebounds,player_points_assists,player_rebounds_assists";
  } else if (sport == "baseball_mlb") {
    markets = "batter_hits_runs_rbis,batter_runs_scored,batter_strikeouts,batter_total_bases,batter_walks";
  } else if (sport == "icehockey_nhl") {
    markets = "player_points,player_assists,player_shots_on_goal";
  }

  fetch(
    "https://api.the-odds-api.com/v4/sports/" +
      sport +
      "/events/" +
      eventID +
      "/odds?apiKey=" +
      apiKey +
      "&bookmakers=" +
      bookmaker +
      "&markets=" +
      markets +
      "&oddsFormat=decimal"
  )
    .then((response) => response.json())
    .then((data) => {
      var formattedHtml = "";
      var allOutcomes = [];

      data.bookmakers.forEach((bookmaker) => {
        bookmaker.markets.forEach((market) => {
          market.outcomes.forEach((outcome) => {
            allOutcomes.push({
              description: outcome.description,
              name: outcome.name,
              point: outcome.point,
              price: outcome.price,
              market: market.key
            });
          });
        });
      });

      allOutcomes.sort((a, b) => a.price - b.price);

      formattedHtml += "<div>";
      formattedHtml += "<h3>API Response:</h3>";
      formattedHtml += "<p><strong>Event ID:</strong> " + data.id + "</p>";
      formattedHtml += "<p><strong>Sport:</strong> " + data.sport_title + "</p>";
      formattedHtml += "<p><strong>Commence Time:</strong> " + data.commence_time + "</p>";
      formattedHtml += "</div>";

      formattedHtml += '<div class="grid-container">';

      allOutcomes.forEach((outcome) => {
        /*var formattedMarketName = outcome.market
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
          .replace("Player", "");
*/
        var formattedMarketName = getCategoryName(outcome.market)
        var oppositeEV = allOutcomes
          .filter(o => o.description === outcome.description && o.market === outcome.market && o.price !== outcome.price)
          .map(o => Number((100 / o.price).toFixed(2)))
          .shift() || 0;

        var noVIG = Number(
          (
            (Number((100 / outcome.price).toFixed(2)) /
              (oppositeEV + Number((100 / outcome.price).toFixed(2)))) *
            100
          ).toFixed(2)
        );
        if(noVIG == 100){
          noVIG = 50
          oppositeEV = 50
        }
        var inforeq = findPlayerId(outcome.description);
        var idnumbr = inforeq.id;
        var onPrizePicksCheck = findstats(idnumbr, outcome.market);
        var filterBY = document.getElementById("quantity").value;

        if (noVIG > filterBY && onPrizePicksCheck == outcome.point) {
          if(outcome.name == "Under"){
            var marketInfo = ` (${formattedMarketName})`;
            formattedHtml += `
              <div class="card">
                <img src="${inforeq.url}" alt="${outcome.description}">
                <div class="info">
                  <div class="player-info">
                    <div>${outcome.description}</div>
                  </div>
                  <div class="points">
                    ${outcome.point} <span>${formattedMarketName}</span>
                  </div>
                  <div class="buttons">
                    <button class="right">LESS ${noVIG}%</button>
                    <button class="more">MORE</button>
                  </div>
                </div>
              </div>
            `;
          }
          if(outcome.name == "Over"){
            var marketInfo = ` (${formattedMarketName})`;
            formattedHtml += `
              <div class="card">
                <img src="${inforeq.url}" alt="${outcome.description}">
                <div class="info">
                  <div class="player-info">
                    <div>${outcome.description} ${outcome.name}</div>
                  </div>
                  <div class="points">
                    ${outcome.point} <span>${formattedMarketName}</span>
                  </div>
                  <div class="buttons">
                    <button class="less">LESS</button>
                    <button class="right">MORE ${noVIG}%</button>
                  </div>
                </div>
              </div>
            `;
          }
        }
      });

      formattedHtml += '</div>';

      var enteredthing = document.getElementById("fullscreen");
      enteredthing.innerHTML = formattedHtml;
    })
    .catch((error) => {
      console.error("Error fetching odds data:", error);
      sectionContent.innerHTML = "<p>Error fetching odds data</p>";
    });
}
