var keynmbr = "error";
var numofprops = 0;
const h = (e) => (e < 0 ? (-1 * e) / (-1 * e + 100) : 100 / (e + 100));
const u = (e) => (e <= 0.5 ? ((1 - e) / e) * 100 : -((e / (1 - e)) * 100));

function novig(odd1, odd2) {
  const americanOdds1 = isNaN(odd1) ? 0 : parseFloat(odd1);
  const americanOdds2 = isNaN(odd2) ? 0 : parseFloat(odd2);

  const odds1Percentage = h(americanOdds1);
  const odds2Percentage = h(americanOdds2);

  const totalPercentage = odds1Percentage + odds2Percentage;

  const noVigPercentage1 = (odds1Percentage / totalPercentage) * 100;

  return noVigPercentage1.toFixed(2);
}

if (localStorage.getItem("keynmbr") == null) {
  localStorage.setItem("keynmbr", 0);
}
function makeRequest(eventID, bookmaker, sectionContent) {
  numofprops = 0;

  var sport = document.getElementById("sportSelect").value;
  var markets = "";

  if (sport == "basketball_nba" || sport == "basketball_wnba") {
    markets =
      "player_points,player_rebounds,player_assists,player_points_rebounds_assists,player_points_rebounds,player_points_assists,player_rebounds_assists";
  } else if (sport == "baseball_mlb") {
    markets =
      "batter_hits_runs_rbis,batter_runs_scored,batter_strikeouts,batter_total_bases,batter_walks";
  } else if (sport == "icehockey_nhl") {
    markets = "player_points,player_assists,player_shots_on_goal";
  } else if (sport == "americanfootball_nfl") {
    markets =
      "player_pass_tds,player_pass_yds,player_pass_completions,player_pass_attempts,player_rush_yds,player_rush_attempts,player_rush_longest,player_receptions,player_reception_yds,player_reception_longest,player_kicking_points,player_field_goals,player_tackles_assists";
  }

  fetch(
    "https://api.the-odds-api.com/v4/sports/" +
      sport +
      "/events/" +
      eventID +
      "/odds?apiKey=" +
      apiKey[localStorage.getItem("keynmbr")] +
      "&bookmakers=" +
      bookmaker +
      "&markets=" +
      markets +
      "&oddsFormat=american"
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
              market: market.key,
            });
          });
        });
      });

      allOutcomes.sort((a, b) => a.price - b.price);

      //formattedHtml += "<div>";
      //formattedHtml += "<h3>API Response:</h3>";
      //formattedHtml += "<p><strong>Event ID:</strong> " + data.id + "</p>";
      //formattedHtml += "<p><strong>Sport:</strong> " + data.sport_title + "</p>";
      //formattedHtml += "<p><strong>Commence Time:</strong> " + data.commence_time + "</p>";
      //formattedHtml += "</div>";

      formattedHtml += '<div class="grid-container">';

      allOutcomes.forEach((outcome) => {
        /*var formattedMarketName = outcome.market
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
          .replace("Player", "");
*/
        var formattedMarketName = getCategoryName(outcome.market);
        var oppositeEV = allOutcomes
          .filter(
            (o) =>
              o.description === outcome.description &&
              o.market === outcome.market &&
              o.price !== outcome.price
          )
          .map((o) => o.price);

        var noVIG = novig(outcome.price, oppositeEV);
        if (noVIG == 100) {
          noVIG = 50;
          oppositeEV = 50;
        }
        var inforeq = findPlayerId(outcome.description);
        var idnumbr = inforeq.id;
        var onPrizePicksCheck = findstats(idnumbr, outcome.market);

        if (noVIG > filterBY && onPrizePicksCheck == outcome.point) {
          if (outcome.name == "Under") {
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
            numofprops += 1;
          }
          if (outcome.name == "Over") {
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
                    <button class="less">LESS</button>
                    <button class="right">MORE ${noVIG}%</button>
                  </div>
                </div>
              </div>
            `;
            numofprops += 1;
          }
        }
      });
      formattedHtml += "</div>";
      if (numofprops == 0) {
        formattedHtml =
          "<p style='padding-bottom:20px'>No Current Props Found For This Game</p>";
        sectionContent.innerHTML = "<p>No Current Props</p>";
      }
      var enteredthing = document.getElementById("fullscreen");
      enteredthing.innerHTML = formattedHtml;
      if (numofprops > 0) {
        scrollToDiv();
      }
    })
    .catch((error) => {
      console.error("Error fetching odds data:", error);
      sectionContent.innerHTML = "<p>Error fetching odds data</p>";
      last = parseInt(localStorage.getItem("keynmbr"));
      if (last < apiKey.length) {
        last = last + 1;
      } else {
        last = 0;
      }
      localStorage.setItem("keynmbr", last);
    });
}
