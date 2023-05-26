// SCROLL BUTTON

const btnScrollToTop = document.querySelector("#btnScrollToTop");

const scrollButton = () => {
  if (document.documentElement.scrollTop > 400) {
    btnScrollToTop.classList.remove("hidden");
  } else {
    btnScrollToTop.classList.add("hidden");
  }
};

const pageScroll = () => {
  window.scrollTo(0, 0);
};

btnScrollToTop.addEventListener("click", pageScroll);
window.addEventListener("scroll", scrollButton);

// ACCORDION

const accordianWrapper = document.querySelectorAll(".accordion-wrapper");

accordianWrapper.forEach((accordion) => {
  const header = accordion.querySelector(".accordion");

  header.addEventListener("click", (event) => {
    event.target.nextElementSibling.classList.toggle("hidden");
  });
});

// NAVBAR

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// API CODE
// Add "load" event listener to the window

window.addEventListener("load", () => {
  const sbtn = document.getElementById("searchButton");
  const rapidapiKey = "4a59fad1d5msh27e042a384d1945p17e984jsn3736d079d843";

  // Add click event listener to the search button
  sbtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Get the value of the search bar
    var q = document.getElementById("searchBar").value;
    if (q) {
      // Start the search
      startSearch(q);
    } else {
      // Display an alert if the search bar is empty
      alert("Please enter an artist's name");
    }
  });
  // Function to start the search
  async function startSearch(q) {
    // Construct the API URL with the search query
    const url =
      "https://spotify23.p.rapidapi.com/search/?q=" +
      encodeURI(q) +
      "&type=artists&offset=0&limit=1&numberOfTopResults=1";

    console.log(url);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": rapidapiKey,
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    try {
      // Send a GET request to the API endpoint
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
      data = JSON.parse(result);
      a_id = data["artists"]["items"][0]["data"]["uri"].split(":")[2];
      console.log(a_id);
      var a_name = data["artists"]["items"][0]["data"]["profile"]["name"];
      var a_avatar =
        data["artists"]["items"][0]["data"]["visuals"]["avatarImage"][
          "sources"
        ][0]["url"];

      const albumSection = document.querySelector("#Album-Section");
      const singlesSection = document.querySelector("#Singles-Section");
      albumSection.id = "Album-Section-Title";
      singlesSection.id = "Singles-Section-Title";
      // select div 'resultWrapper' to display new elements
      const out = document.getElementById("Avatar");
      out.innerHTML = "";
      // Create and append the artist avatar image element
      const art_avatar = document.createElement("img");
      art_avatar.id = "artist_avatar";
      art_avatar.src = a_avatar;
      out.appendChild(art_avatar);

      // Create and append the artist name element
      const art_name = document.createElement("h4");
      art_name.id = "artist_name";
      art_name.innerText = a_name;
      out.appendChild(art_name);

      // Retrieve artist albums and singles
      getArtistAlbums(a_id);
      getArtistSingles(a_id);
    } catch (error) {
      console.error(error);
    }
  }

  // Function to get artist albums
  async function getArtistAlbums(a_id) {
    // Construct the API URL with the artist ID
    const url =
      "https://spotify23.p.rapidapi.com/artist_albums/?id=" +
      a_id +
      "&offset=0&limit=5";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": rapidapiKey,
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    try {
      // Send a GET request to the API endpoint
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
      data = JSON.parse(result);
      albums = data["data"]["artist"]["discography"]["albums"]["items"];
      console.log(albums);

      const out = document.getElementById("Albums");
      out.innerHTML = "";
      const titlePanel = document.createElement("h4");
      titlePanel.innerHTML = "Albums";
      titlePanel.setAttribute("class", "Titles");
      out.appendChild(titlePanel);
      // Iterate over each album and display its name and cover
      for (let i = 0; i < albums.length; i++) {
        let album = document.createElement("div");
        let a_title = albums[i]["releases"]["items"][0]["name"];
        let a_cover =
          albums[i]["releases"]["items"][0]["coverArt"]["sources"][0]["url"];

        const alb_avatar = document.createElement("img");
        alb_avatar.src = a_cover;
        album.appendChild(alb_avatar);

        const alb_name = document.createElement("h4");
        alb_name.innerText = a_title;
        album.appendChild(alb_name);
        out.appendChild(album);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Function to get artist singles
  async function getArtistSingles(a_id) {
    // Construct the API URL with the artist ID
    const url =
      "https://spotify23.p.rapidapi.com/artist_singles/?id=" +
      a_id +
      "&offset=0&limit=5";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": rapidapiKey,
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    try {
      // Send a GET request to the API endpoint
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
      data = JSON.parse(result);
      singles = data["data"]["artist"]["discography"]["singles"]["items"];
      console.log(singles);

      const out = document.getElementById("Singles");
      out.innerHTML = "";
      const titlePanel = document.createElement("h4");
      titlePanel.innerHTML = "Singles";
      titlePanel.setAttribute("class", "Titles");
      out.appendChild(titlePanel);
      // Iterate over each single and display its name and cover
      for (let i = 0; i < singles.length; i++) {
        let single = document.createElement("div");
        let s_title = singles[i]["releases"]["items"][0]["name"];
        let s_cover =
          singles[i]["releases"]["items"][0]["coverArt"]["sources"][0]["url"];

        const single_avatar = document.createElement("img");
        single_avatar.src = s_cover;
        single.appendChild(single_avatar);
        out.appendChild(single);

        const single_name = document.createElement("h4");
        single_name.innerText = s_title;
        single.appendChild(single_name);
      }
    } catch (error) {
      console.error(error);
    }
  }
});
