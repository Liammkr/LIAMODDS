var nbamap = {
  celtics: 38,
  knicks: 52,
  bucks: 49,
  cavaliers: 39,
  magic: 53,
  pacers: 54,
  "76ers": 55,
  heat: 48,
  bulls: 41,
  hawks: 37,
  nets: 51,
  raptors: 61,
  hornets: 66,
  wizards: 64,
  pistons: 65,
  thunder: 60,
  nuggets: 43,
  timberwolves: 50,
  clippers: 46,
  mavericks: 42,
  suns: 56,
  pelicans: 40,
  lakers: 47,
  kings: 58,
  warriors: 44,
  rockets: 45,
  jazz: 62,
  grizzlies: 63,
  spurs: 59,
  blazers: 57,
};
var nflmap = {
  cardinals: "ARI",
  falcons: "ATL",
  panthers: "CAR",
  bears: "CHI",
  cowboys: "DAL",
  lions: "DET",
  packers: "GB",
  rams: "LA",
  vikings: "MIN",
  saints: "NO",
  giants: "NYG",
  eagles: "PHI",
  "49ers": "SF",
  seahaws: "SEA",
  buccaneers: "TB",
  commanders: "WAS",
  ravens: "BAL",
  bills: "BUF",
  bengals: "CIN",
  browns: "CLE",
  broncos: "DEN",
  texans: "HOU",
  colts: "IND",
  jaguars: "JAX",
  chiefs: "KC",
  raiders: "LV",
  chargers: "LAC",
  dolphins: "MIA",
  patriots: "NE",
  jets: "NYJ",
  steelers: "PIT",
  titans: "TEN",
  seahawks: "SEA",
};
var nhlmap = {
  ducks: "ANA",
  coyotes: "ARI",
  bruins: "BOS",
  sabres: "BUF",
  flames: "CGY",
  hurricanes: "CAR",
  blackhawks: "CHI",
  avalanche: "COL",
  jackets: "CBJ",
  stars: "DAL",
  wings: "DET",
  oilers: "EDM",
  panthers: "FLA",
  kings: "LAK",
  wild: "MIN",
  canadiens: "MTL",
  predators: "NSH",
  devils: "NJD",
  islanders: "NYI",
  rangers: "NYR",
  senators: "OTT",
  flyers: "PHI",
  penguins: "PIT",
  sharks: "SJS",
  kraken: "SEA",
  blues: "STL",
  lightning: "TBL",
  mapleleafs: "TOR",
  canucks: "VAN",
  knights: "VGK",
  capitals: "WSH",
  jets: "WPG",
  club: "UTA",
  leafs: "TOR",
};
var mlbmap = {
  angels: 108,
  diamondbacks: 109,
  orioles: 110,
  redsox: 111,
  cubs: 112,
  reds: 113,
  guardians: 114,
  rockies: 115,
  tigers: 116,
  astros: 117,
  royals: 118,
  dodgers: 119,
  nationals: 120,
  mets: 121,
  athletics: 133,
  pirates: 134,
  padres: 135,
  mariners: 136,
  giants: 137,
  cardinals: 138,
  rays: 139,
  rangers: 140,
  jays: 141,
  twins: 142,
  phillies: 143,
  braves: 144,
  sox: 145,
  marlins: 146,
  yankees: 147,
  brewers: 158,
};
var wnbamap = {
  dream: 30,
  sky: 29,
  sun: 23,
  fever: 25,
  liberty: 13,
  mystics: 22,
  wings: 21,
  aces: 19,
  sparks: 20,
  lynx: 24,
  mercury: 17,
  storm: 28,
};
function changesprt(sport) {
  val = document.getElementById("sportSelect");
  val.value = sport;
  var event = new Event("change");
  val.dispatchEvent(event);
  cntr = document.getElementById("fullscreen");
  cntr.innerHTML = "";
}
function getData(url) {
  const corsAnywhereUrl = url;

  const headers = {
    Origin: window.location.origin,
  };

  return fetch(corsAnywhereUrl, { headers })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .catch((error) => {
      throw error;
    });
}

var data, newdata;
/*database
  .ref("liamkr")
  .once("value")
  .then(function (snapshot) {
    data = snapshot.val();
    console.log(data.apikey); 
    getData(data.uploaded_text_url)
    .then(data => {
      NBAjsonData = data;
      console.log(NBAjsonData); 
      finditem()
    })
    .catch(error => {
      console.error('Error:', error);
    });
  })
  .catch(function (error) {
    console.error(error);
  });
*/
getData(
  "https://firebasestorage.googleapis.com/v0/b/liamkrodds.appspot.com/o/NBA?alt=media"
).then((data) => {
  NBAjsonData = data;
  console.log("NBA Loaded");
});
getData(
  "https://firebasestorage.googleapis.com/v0/b/liamkrodds.appspot.com/o/MLB?alt=media"
).then((data) => {
  MLBjsonData = data;
  console.log("MLB Loaded");
});
getData(
  "https://firebasestorage.googleapis.com/v0/b/liamkrodds.appspot.com/o/NHL?alt=media"
).then((data) => {
  NHLjsonData = data;
  console.log("NHL Loaded");
});
getData(
  "https://firebasestorage.googleapis.com/v0/b/liamkrodds.appspot.com/o/WNBA?alt=media"
).then((data) => {
  WNBAjsonData = data;
  console.log("WNBA Loaded");
});
getData(
  "https://firebasestorage.googleapis.com/v0/b/liamkrodds.appspot.com/o/NFL?alt=media"
).then((data) => {
  NFLjsonData = data;
  console.log("NFL Loaded");
});
/*database.ref("liamkr").update({
  run_script: true,
});*/
var apiKey = [
  "491f5f92d61bab1c3f4767f31a044794",
  "d9c1921d37a313c158ec26608448298e",
  "351c3f3fd620edf8816d9eb8dc87e087",
  "6448326aff8a17d51e863ae0915aa93e",
];
var result = "error";
var jsonData = null;
var MLBjsonData,
  NBAjsonData,
  sportvalue,
  playerName,
  sortedOutcomes,
  imageurl,
  currentLine;
var filterBY = 50;

/*window.addEventListener("load", (event) => {
  if (localStorage.getItem("emailsent") != "emailrecieved") {
    document.getElementById("notis").innerHTML = `   <div class="form">
  <button class="close-btn" onclick="closebtn()">&times;</button>
  <span class="title">Stay Updated</span>
  <p class="description">Receive one free notification per day for Positive EV Props, and enjoy unlimited notifications with a subscription.</p>
  <div>
    <input placeholder="Enter your email" type="email" id="email-address">
    <button id="subscribe">Subscribe</button>
  </div>      
</div>`;
  }
});*/
window.addEventListener("load", (event) => {
  if (localStorage.getItem("emailsent") != "emailrecieved") {
    document.getElementById("notis").innerHTML = `   <div class="form">
  <button class="close-btn" onclick="closebtn()">&times;</button>
  <span class="title">Stay Updated</span>
  <p class="description">Receive one free notification per day for Positive EV Props, and enjoy unlimited notifications with a subscription.</p>
  <div>
    <button id="abcd" style="width:100%" onclick="window.open('https://discord.com/invite/eT6ZzResPT')">
    <i class="fa-brands fa-discord"></i>
     Discord</button>
  </div>      
</div>`;
  }
});
function scrollToDiv() {
  var targetDiv = document.getElementById("fullscreen");

  if (!targetDiv) {
    console.error("Fullscreen element not found.");
    return;
  }

  // Scroll the targetDiv into view first
  targetDiv.scrollIntoView({ behavior: "smooth" });

  // Scroll 100px further down after a short delay
  setTimeout(() => {
    targetDiv.scrollBy({
      top: 100,
      behavior: "smooth",
    });
  }, 500); // Adjust delay if needed
}
function closebtn() {
  //localStorage.setItem("emailsent", "emailrecieved");
  document.getElementById("notis").remove();
}
var sport = null;
if (localStorage.getItem("sport") != null) {
  var sport = localStorage.getItem("sport");
} else {
  localStorage.setItem("sport", "best_sprt");
  var sport = "best_sprt";
}
document.getElementById("sportSelect").value = sport;
document
  .getElementById("sportSelect")
  .addEventListener("change", function (event) {
    localStorage.setItem("sport", document.getElementById("sportSelect").value);
  });
function hideAllSectionContents() {
  var sectionContents = document.querySelectorAll(".section-content");
  sectionContents.forEach(function (section) {
    section.style.display = "none";
  });
}

function loadDataFromFile(filePath, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", filePath, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.send();
}

document.getElementById("sportSelect").addEventListener("change", function () {
  console.log(this.value);
  if (
    this.value != "best_sprt" &&
    this.value != "goblins" &&
    this.value != "demons"
  ) {
    if (this.value == "basketball_nba") {
      sportvalue = "NBA";
    }
    if (this.value == "basketball_wnba") {
      sportvalue = "WNBA";
    }
    if (this.value == "baseball_mlb") {
      sportvalue = "MLB";
    }
    if (this.value == "icehockey_nhl") {
      sportvalue = "NHL";
    }
    if (this.value == "americanfootball_nfl") {
      sportvalue = "NFL";
    }
    if (document.getElementById("bookmakerSelect").value == "draftkings") {
      var bookmakertitle = "DraftKings";
    }
    if (document.getElementById("bookmakerSelect").value == "fanduel") {
      var bookmakertitle = "FanDuel";
    }
    document.title = "Liam Odds | " + sportvalue;
    var selectedSport = this.value;
    var selectedBookmaker = document.getElementById("bookmakerSelect").value;
    const responseContainer = document.getElementById("responseContainer");
    responseContainer.innerHTML = "";

    fetch(
      "https://api.the-odds-api.com/v4/sports/" +
        selectedSport +
        "/events?apiKey=" +
        apiKey[0]
    )
      .then((response) => response.json())
      .then((events) => {
        if (events.length === 0) {
          var sectionContent = document.createElement("div");
          sectionContent.className = "section-content";
          sectionContent.style.display = "none";

          var section = document.createElement("div");
          section.className = "section";
          section.innerHTML = "<p>No Current Games</p>";
          section.appendChild(sectionContent);
          responseContainer.appendChild(section);
          console.log("No events found");
        } else {
          count = 0;
          events.forEach((event) => {
            if (count < 10) {
              var sectionContent = document.createElement("div");
              sectionContent.className = "section-content";
              sectionContent.style.display = "none";

              var section = document.createElement("div");
              section.className = "section";
              const dateTimeString = event.commence_time;
              const dateTime = new Date(dateTimeString);

              const month = dateTime.getMonth() + 1;
              const day = dateTime.getDate();
              let hours = dateTime.getHours();
              const minutes = dateTime.getMinutes();
              const period = hours >= 12 ? "PM" : "AM";

              hours = hours % 12 || 12;

              const dateString = `${month}/${day}`;
              const timeString = `${hours}:${minutes
                .toString()
                .padStart(2, "0")} ${period}`;

              function lastWord(words) {
                var wordArray = words.split(" ");
                return wordArray[wordArray.length - 1];
              }

              function findTeamNumber(teamName) {
                var lowercaseTeamName = teamName.toLowerCase();
                if (sportvalue == "NBA") {
                  return nbamap[lowercaseTeamName];
                }
                if (sportvalue == "MLB") {
                  return mlbmap[lowercaseTeamName];
                }
                if (sportvalue == "NHL") {
                  return nhlmap[lowercaseTeamName];
                }
                if (sportvalue == "WNBA") {
                  return wnbamap[lowercaseTeamName];
                }
                if (sportvalue == "NFL") {
                  return nflmap[lowercaseTeamName];
                } else {
                  return "Team not found" + teamName;
                }
              }

              var hometeamNumber = findTeamNumber(lastWord(event.home_team));
              var awayteamNumber = findTeamNumber(lastWord(event.away_team));

              if (sportvalue == "NBA") {
                var homeUrl =
                  "https://cdn.nba.com/logos/nba/16106127" +
                  hometeamNumber +
                  "/primary/L/logo.svg";
                var awayUrl =
                  "https://cdn.nba.com/logos/nba/16106127" +
                  awayteamNumber +
                  "/primary/L/logo.svg";
                var imageSizeWidth = 100;
                var imageSizeHeight = 100;
              } else if (sportvalue == "MLB") {
                var homeUrl =
                  "https://www.mlbstatic.com/team-logos/team-primary-on-light/" +
                  hometeamNumber +
                  ".svg";
                var awayUrl =
                  "https://www.mlbstatic.com/team-logos/team-primary-on-light/" +
                  awayteamNumber +
                  ".svg";
                var imageSizeWidth = 80;
                var imageSizeHeight = 80;
              } else if (sportvalue == "NHL") {
                var homeUrl =
                  "https://assets.nhle.com/logos/nhl/svg/" +
                  hometeamNumber +
                  "_dark.svg";
                var awayUrl =
                  "https://assets.nhle.com/logos/nhl/svg/" +
                  awayteamNumber +
                  "_dark.svg";
                var imageSizeWidth = 100;
                var imageSizeHeight = 100;
              } else if (sportvalue == "WNBA") {
                var homeUrl =
                  "https://cdn.wnba.com/logos/wnba/16116613" +
                  hometeamNumber +
                  "/global/D/logo.svg";
                var awayUrl =
                  "https://cdn.wnba.com/logos/wnba/16116613" +
                  awayteamNumber +
                  "/global/D/logo.svg";
                var imageSizeWidth = 100;
                var imageSizeHeight = 100;
              } else if (sportvalue == "NFL") {
                var homeUrl =
                  "https://static.www.nfl.com/t_headshot_desktop_2x/f_auto/league/api/clubs/logos/" +
                  hometeamNumber;
                var awayUrl =
                  "https://static.www.nfl.com/t_headshot_desktop_2x/f_auto/league/api/clubs/logos/" +
                  awayteamNumber;
                var imageSizeWidth = 100;
                var imageSizeHeight = 100;
              } else {
                var homeUrl =
                  "https://raw.githubusercontent.com/Liammkr/WSTBET/main/AILogo.png";
                var awayUrl =
                  "https://raw.githubusercontent.com/Liammkr/WSTBET/main/AILogo.png";
                var imageSizeWidth = 80;
                var imageSizeHeight = 80;
              }
              // Example HTML generation with images
              section.innerHTML = `
        <div class="section-header">
                <div style="display: flex; align-items: center; justify-content: center;">
                    <img src="${homeUrl}" alt="Home Team Logo" class="sectionimg" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/Liammkr/WSTBET/main/BLACKIMG.jpg';">
                    <span style="margin: 0 10px;">vs</span>
                    <img src="${awayUrl}" alt="Away Team Logo" class="sectionimg" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/Liammkr/WSTBET/main/BLACKIMG.jpg';">
                </div>
                <div>${timeString} on ${dateString}</div>
            </div>
        `;
              //section.innerHTML = '<div class="section-header">' + homelastWord + homeUrl+ ' vs ' + awaylastWord + awayUrl+ " on " +dateString+ " at "+ timeString+ '</div>';
              section.appendChild(sectionContent);

              responseContainer.appendChild(section);

              section
                .querySelector(".section-header")
                .addEventListener("click", function () {
                  hideAllSectionContents();
                  //buttonloc = document.getElementById("back");
                  //buttonloc.style.display = "";
                  test123 = document.getElementById("responseContainer");
                  //test123.style.display = "none";
                  if (sectionContent.style.display === "none") {
                    sectionContent.style.display = "block";
                    if (!sectionContent.getAttribute("data-loaded")) {
                      makeRequest(event.id, selectedBookmaker, sectionContent);
                      //sectionContent.setAttribute('data-loaded', 'true');
                    }
                  } else {
                    sectionContent.style.display = "none";
                  }
                });
              count++;
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching event IDs:", error);
      });
  } /*else {
    const responseContainer2 = document.getElementById("responseContainer");
    responseContainer2.innerHTML = "";
    document.title = "Liam Odds | All Sports";
    var htmltest = '<div style="width:70%"class="grid-container">';
    loggedin = true;
    if (loggedin == true) {
      fetch(
        "https://firebasestorage.googleapis.com/v0/b/liamkrodds.appspot.com/o/uploads%2Ftopdata.json?alt=media"
      )
        .then((response) => response.json())
        .then((data) => {
          const props = data.props; // Access the props array
          for (let i = 0; i < props.length; i++) {
            console.log(props[i]);
            if (props[i].over > props[i].under) {
              htmltest +=
                `<div class="card">
                            <img src="` +
                props[i].url +
                `" alt="` +
                props[i].name +
                `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                props[i].name +
                `</div>
                                </div>
                                <div class="points">
                                    ` +
                props[i].line +
                ` <span>` +
                props[i].market +
                `</span>
                                </div>
                                <div class="buttons">
                                    <button class="right">LESS ` +
                props[i].under +
                `%</button>
                                    <button class="more">MORE</button>
                                </div>
                            </div>
                        </div>`;
            } else {
              htmltest +=
                `<div class="card">
                            <img src="` +
                props[i].url +
                `" alt="` +
                props[i].name +
                `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                props[i].name +
                `</div>
                                </div>
                                <div class="points">
                                    ` +
                props[i].line +
                ` <span>` +
                props[i].market +
                `</span>
                                </div>
                                <div class="buttons">
                                    <button class="more">LESS</button>
                                    <button class="right">MORE ` +
                props[i].over +
                `%</button>
                                </div>
                            </div>
                        </div>`;
            }
          }
          htmltest += "</div>";

          responseContainer2.innerHTML = htmltest;
        });
    } else {
      fetch(
        "https://firebasestorage.googleapis.com/v0/b/liamkrodds.appspot.com/o/uploads%2Ftop1.json?alt=media"
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.over >= data.under) {
            htmltest +=
              `<div class="card">
                            <img src="` +
              data.url +
              `" alt="` +
              data.name +
              `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
              data.name +
              `</div>
                                </div>
                                <div class="points">
                                    ` +
              data.line +
              ` <span>` +
              data.market +
              `</span>
                                </div>
                                <div class="buttons">
                                    <button class="right">LESS ` +
              data.under +
              `%</button>
                                    <button class="more">MORE</button>
                                </div>
                            </div>
                        </div>`;
            for (let i = 0; i < 2; i++) {
              htmltest +=
                `<div class="card" style="filter: blur(10px)">
                            <img src="` +
                data.url +
                `" alt="` +
                data.name +
                `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                data.name +
                `</div>
                                </div>
                                <div class="points">
                                    ` +
                data.line +
                ` <span>` +
                data.market +
                `</span>
                                </div>
                                <div class="buttons">
                                    <button class="right">LESS ` +
                data.under +
                `%</button>
                                    <button class="more">MORE</button>
                                </div>
                            </div>
                        </div>`;
            }
          } else if (data.over < data.under) {
            htmltest +=
              `<div class="card ">
                            <img src="` +
              data.url +
              `" alt="` +
              data.name +
              `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
              data.name +
              `</div>
                                </div>
                                <div class="points">
                                    ` +
              data.line +
              ` <span>` +
              data.market +
              `</span>
                                </div>
                                <div class="buttons">
                                    <button class="more">LESS</button>
                                    <button class="right">MORE ` +
              data.over +
              `%</button>
                                </div>
                            </div>
                        </div>`;
            for (let i = 0; i < 2; i++) {
              htmltest +=
                `<div class="card" style="filter: blur(10px)">
                            <img src="` +
                data.url +
                `" alt="` +
                data.name +
                `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                data.name +
                `</div>
                                </div>
                                <div class="points">
                                    ` +
                data.line +
                ` <span>` +
                data.market +
                `</span>
                                </div>
                                <div class="buttons">
                                    <button class="more">LESS</button>
                                    <button class="right">MORE ` +
                data.over +
                `%</button>
                                </div>
                            </div>
                        </div>`;
            }
          }
          htmltest += "</div>";

          responseContainer2.innerHTML = htmltest;
        });
    }*/
  /*htmltest += `<div class="card">
                            <img src="https://static.prizepicks.com/images/players/mlb/Masataka_Yoshida_6de34681-ea14-4946-a3de-26053e746465.webp" alt="Masataka Yoshida">
                            <div class="info">
                                <div class="player-info">
                                    <div>Masataka Yoshida</div>
                                </div>
                                <div class="points">
                                    0.5 <span>Runs</span>
                                </div>
                                <div class="buttons">
                                    <button class="right">LESS 57.80%</button>
                                    <button class="more">MORE</button>
                                </div>
                            </div>
                        </div>`;
    htmltest += `<div class="card" style="filter: blur(10px)">
                            <img src="https://static.prizepicks.com/images/players/mlb/Masataka_Yoshida_6de34681-ea14-4946-a3de-26053e746465.webp" alt="Masataka Yoshida">
                            <div class="info">
                                <div class="player-info">
                                    <div>Masataka Yoshida</div>
                                </div>
                                <div class="points">
                                    0.5 <span>Runs</span>
                                </div>
                                <div class="buttons">
                                    <button class="right">LESS 57.80%</button>
                                    <button class="more">MORE</button>
                                </div>
                            </div>
                        </div>`;
    htmltest += `<div class="card" style="filter: blur(10px)">
                            <img src="https://static.prizepicks.com/images/players/mlb/Masataka_Yoshida_6de34681-ea14-4946-a3de-26053e746465.webp" alt="Masataka Yoshida">
                            <div class="info">
                                <div class="player-info">
                                    <div>Masataka Yoshida</div>
                                </div>
                                <div class="points">
                                    0.5 <span>Runs</span>
                                </div>
                                <div class="buttons">
                                    <button class="right">LESS 57.80%</button>
                                    <button class="more">MORE</button>
                                </div>
                            </div>
                        </div>`;
  }*/
});

document.getElementById("sportSelect").dispatchEvent(new Event("change"));
/*document.getElementById("openIframeBtn").addEventListener("click", function () {
  document.getElementById("iframeContainer").style.display = "block";
  if (sportvalue == "NBA") {
    iframeURL =
      "https://api.prizepicks.com/projections?league_id=7&per_page=250&state_code=CA&single_stat=true&game_mode=pickem";
  } else {
    iframeURL =
      "https://api.prizepicks.com/projections?league_id=2&per_page=250&state_code=CA&single_stat=true&game_mode=pickem";
  }
  document.getElementById("myIframe").src = iframeURL;
  document.getElementById("formContainer").style.display = "block";
});
*/
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  var inputValue = document.getElementById("inputText").value;
  console.log("Submitted value:", inputValue);
  jsonData = inputValue;
  document.getElementById("iframeContainer").style.display = "none";
  document.getElementById("formContainer").style.display = "none";
});
function backbutton() {
  location.reload();
}
