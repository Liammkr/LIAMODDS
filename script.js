var apiKey = "16bdd170ce0e3d7e76c2395e70f6428c";
var result = "error";
var jsonData = null;
var MLBjsonData,
  NBAjsonData,
  sportvalue,
  playerName,
  sortedOutcomes, imageurl,
  currentLine;
var filterBY = null;
if (localStorage.getItem("filter") != null) {
  var filterBY = localStorage.getItem("filter");
} else {
  localStorage.setItem("filter", 50);
  var filterBY = 50
}
document.getElementById("quantity").value = filterBY;
document.getElementById("quantity").addEventListener("input", function (event) {
  localStorage.setItem("filter", document.getElementById("quantity").value);
});

var sport = null;
if (localStorage.getItem("sport") != null) {
  var sport = localStorage.getItem("sport");
} else {
  localStorage.setItem("sport", "basketball_nba");
  var sport = "basketball_nba"
}
document.getElementById("sportSelect").value = sport;
document.getElementById("sportSelect").addEventListener("input", function (event) {
  localStorage.setItem("sport", document.getElementById("sportSelect").value);
});
var teamNumberMap = {
  celtics: 38,
  knicks: 52,
  bucks: 49,
  cavaliers: 39,
  magic: 53,
  pacers: 54,
  sixers: 55,
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
  brewers: 158
};
function hideAllSectionContents() {
    var sectionContents = document.querySelectorAll('.section-content');
    sectionContents.forEach(function(section) {
        section.style.display = 'none';
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
window.onload = function () {
    loadDataFromFile("NBA.txt", function (NBAcontent) {
      NBAjsonData = NBAcontent;
    loadDataFromFile("MLB.txt", function (MLBcontent) {
      MLBjsonData = MLBcontent;
    });
  });
};

document.getElementById("sportSelect").addEventListener("change", function () {
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
  if (document.getElementById("bookmakerSelect").value == "draftkings") {
    var bookmakertitle = "DraftKings";
  }
  if (document.getElementById("bookmakerSelect").value == "fanduel") {
    var bookmakertitle = "FanDuel";
  }
  document.title = "Liam Odds | " + sportvalue;
  var selectedSport = this.value;
  var selectedBookmaker = document.getElementById("bookmakerSelect").value;
  var responseContainer = document.getElementById("responseContainer");
  responseContainer.innerHTML = "";

  fetch(
    "https://api.the-odds-api.com/v4/sports/" + selectedSport + "/events?apiKey=" + apiKey
  )
    .then((response) => response.json())
    .then((events) => {
      events.forEach((event) => {
        var sectionContent = document.createElement("div");
        sectionContent.className = "section-content";
        sectionContent.style.display = "none";

        var section = document.createElement("div");
        section.className = "section";
        const dateTimeString = event.commence_time;
        const dateTime = new Date(dateTimeString);

        // Extracting the date and time portions
        const month = dateTime.getMonth() + 1; // Adding 1 because months are zero-based
        const day = dateTime.getDate();
        let hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const period = hours >= 12 ? "PM" : "AM";

        // Convert hours to 12-hour format
        hours = hours % 12 || 12;

        const dateString = `${month}/${day}`;
        const timeString = `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;


        function lastWord(words){
          var wordArray = words.split(" ");
          return wordArray[wordArray.length - 1];
        }

        function findTeamNumber(teamName) {
          var lowercaseTeamName = teamName.toLowerCase();
          if (lowercaseTeamName in teamNumberMap) {
            return teamNumberMap[lowercaseTeamName];
          } else {
            return "Team not found" + teamName;
          }
        }

        var hometeamNumber = findTeamNumber(lastWord(event.home_team));
        var awayteamNumber = findTeamNumber(lastWord(event.away_team));
        
        if(sportvalue == "NBA"){
          var homeUrl = "https://cdn.nba.com/logos/nba/16106127" + hometeamNumber + "/primary/L/logo.svg"; 
          var awayUrl = "https://cdn.nba.com/logos/nba/16106127" + awayteamNumber + "/primary/L/logo.svg";
          var imageSizeWidth = 100;
          var imageSizeHeight = 100;
       } else if(sportvalue == "MLB"){
            var homeUrl = "https://www.mlbstatic.com/team-logos/team-primary-on-light/"+ hometeamNumber+ ".svg"; 
            var awayUrl = "https://www.mlbstatic.com/team-logos/team-primary-on-light/"+ awayteamNumber+ ".svg";
            var imageSizeWidth = 80;
            var imageSizeHeight = 80;
       }
        else{
          var homeUrl = "https://raw.githubusercontent.com/Liammkr/WSTBET/main/AILogo.png";
          var awayUrl = "https://raw.githubusercontent.com/Liammkr/WSTBET/main/AILogo.png";
          var imageSizeWidth = 80;
          var imageSizeHeight = 80;
        }
        // Example HTML generation with images
        section.innerHTML = `
        <div class="section-header">
                <div style="display: flex; align-items: center; justify-content: center;">
                    <img src="${homeUrl}" alt="Home Team Logo" width="${imageSizeWidth}" height="${imageSizeHeight}">
                    <span style="margin: 0 10px;">vs</span>
                    <img src="${awayUrl}" alt="Away Team Logo" width="${imageSizeWidth}" height="${imageSizeHeight}">
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
            hideAllSectionContents()
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
      });
    })
    .catch((error) => {
      console.error("Error fetching event IDs:", error);
    });
});

document.getElementById("sportSelect").dispatchEvent(new Event("change"));
document.getElementById("openIframeBtn").addEventListener("click", function () {
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

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  var inputValue = document.getElementById("inputText").value;
  console.log("Submitted value:", inputValue);
  jsonData = inputValue;
  // You can perform further actions with the submitted value here
  // Close the iframe and hide the form container
  document.getElementById("iframeContainer").style.display = "none";
  document.getElementById("formContainer").style.display = "none";
});
function backbutton() {
  location.reload();
}
