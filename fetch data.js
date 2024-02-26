const artistId = '0TnOYISbd1XYRBk9myaseg';
const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;
//const accessToken = 'BQBaR3q34NzKsF-_kI1w3jj60mysC14AmrJsRHSGExT285E7qbJz5S85WgCmhW1po4geNEhof7SrqoAx7bzBh-_DvmmAl62GstozMgA_li9F6KHSplsd5l0EDh_gAmy7aD0aornDGIGpHJjMQo06jwMVnDbZRFx7CwXeJPXNBfFdSmyrvrHBDJdfdwiUodpFfB4k1QQ2qZGyp1EMroF_kJlIk9Dkhk4VqNcTAyK_KFbbu2rjJzEKFA';
const client_Id = '96fc017ba3434613a39f8031bab6a401';
const client_Secret = 'a01e380ccced4096b6617971c748d583';
const refresh_token = 'AQAq5sZjHWDniM5ZhSqqmNHJN1ty1_9P16cFLDPmhDlxMCb8Sw-xk6_qn8uQ9l9pmqYS4Q_oB-PjQCMzTbwlECXmJQQ-wMWJC2jPCY8eS22LxFn6vagOY5xU0HoW6dtkjHE';
const token_Refresh_Endpoint = 'https://accounts.spotify.com/api/token';




//Esto pincha
/*fetch(url, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Handle the data as per your requirement
    data.items.forEach(item => {
      const albumName = document.createElement("p");
      albumName.id = "myId";
      albumName.className = "myClass";
      albumName.textContent = item.name;
      document.body.appendChild(albumName);
    });
    ;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });*/


  /*async function fetchArtistAlbums() {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch artist albums');
      }
  
      const data = await response.json();
      return data.items.map(item => item.name);
    } catch (error) {
      throw new Error('Failed to fetch artist albums: ' + error.message);
    }
  }
  
  async function displayAlbumNames() {
    try {
      const albumNames = await fetchArtistAlbums();
      const albumList = document.createElement('ul');
  
      albumNames.forEach(albumName => {
        const listItem = document.createElement('li');
        listItem.textContent = albumName;
        albumList.appendChild(listItem);
      });
  
      document.body.appendChild(albumList);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  displayAlbumNames();*/

  let accessToken = null;

  const fetchAccessToken = async () => {
    try {
        const response = await fetch(token_Refresh_Endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(client_Id + ':' + client_Secret)
            },
            body: new URLSearchParams({
                'grant_type': 'refresh_token',
                'refresh_token': refresh_token
            }).toString() // Convert URLSearchParams to string
        });

        if (!response.ok) {
            throw new Error('Failed to fetch access token');
        }

        const data = await response.json();
        accessToken = data.access_token;
    } catch (error) {
        console.error('Error refreshing access token:', error);
    }
};

async function fetchArtistAlbums() {
    if (!accessToken) {
        console.error('Access token not available');
        return;
    }

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch artist albums');
        }

        const data = await response.json();
        return data.items.map(item => item.name);
    } catch (error) {
        throw new Error('Failed to fetch artist albums: ' + error.message);
    }
}

async function displayAlbumNames() {
    try {
        await fetchAccessToken();
        const albumNames = await fetchArtistAlbums();
        const albumList = document.createElement('ul');

        albumNames.forEach(albumName => {
            const listItem = document.createElement('li');
            listItem.textContent = albumName;
            albumList.appendChild(listItem);
        });

        document.body.appendChild(albumList);
    } catch (error) {
        console.error(error.message);
    }
}

displayAlbumNames();
