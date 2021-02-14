import React, { useState, useEffect } from 'react';
import Dropdown from './Components/Dropdown';
import Listbox from './Components/Listbox';
import Detail from './Components/Detail';
import { Credentials } from './Components/Credentials';
import axios from 'axios';
import Table from './Components/Table';
import { useHistory } from "react-router-dom";

const App = () => {

  const spotify = Credentials();  
  let history = useHistory();

  const [token, setToken] = useState('');  
  const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
  const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
  const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []});
  const [trackDetail, setTrackDetail] = useState(null);
  const [songlist, setSongList] = useState([])
 
  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);

      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US&offset=0&limit=39', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (genreResponse => {    
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      });
    });
    handleSongs();

  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]); 

  

  const genreChanged = val => {
    setGenres({
      selectedGenre: val, 
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    });

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?offset=0&limit=20`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then(playlistResponse => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items
      })
    });
  }

  const playlistChanged = val => {
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
    });
  }

  const buttonClicked = e => {
    e.preventDefault();

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
    .then(tracksResponse => {
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracksFromAPI: tracksResponse.data.items
      })
    });
  }

  const listboxClicked = val => {

    const currentTracks = [...tracks.listOfTracksFromAPI];

    const trackInfo = currentTracks.filter(t => t.track.id === val);

    setTrackDetail(trackInfo[0].track);

  }


  const handleSongs = async () => {
    
    try {
      let response = await axios.get("http://localhost:3001/api/songs");
      setSongList(response.data);
    }
    catch(err) {
      console.log(err)
    }
    
  }

  const insertToDB = async () => {

    var minutes = Math.floor(trackDetail.duration_ms / 60000);
    var seconds = ((trackDetail.duration_ms % 60000) / 1000).toFixed(0);
    var result = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    var currentDate = new Date();

    let date = currentDate.toLocaleString('default', { month: 'long'}) + " " + currentDate.getDate() + ", " + currentDate.getFullYear()
   
    await axios.post("http://localhost:3001/api/create", {id : trackDetail.id, artists: trackDetail.artists[0].name, name: trackDetail.name, duration_ms: result, date: date, image: trackDetail.album.images[0].url, link: trackDetail.external_urls.spotify, type: trackDetail.album.album_type}); 
    handleSongs();
  }

  const deleteSongFromDB = async (id) => {
    await axios.delete(`http://localhost:3001/api/delete/${id}`);
  }

  const deleteSongFromTable = (id) => {
    const index = songlist.findIndex(song => {
      return song.id === id
    })
    songlist.splice(index, 1);
    setSongList(songlist)
    deleteSongFromDB(id);
    handleSongs();
  }

  const logout = () => {
      history.push('/');  
  }

  
  return (
    <div className="container">
      <button className="logout-btn" onClick={logout}>Logout</button>
      <form onSubmit={buttonClicked}>        
          <Dropdown label="Genre :" options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
          <Dropdown label="Playlist :" options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
          <div className="col-sm-6 row form-group px-0">
            <button type='submit' className="btn btn-success col-sm-12">
              Search
            </button>
          </div>
          <div className="row">
            <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
            {trackDetail && <Detail {...trackDetail} onPush={insertToDB} /> }
          </div>        
      </form>
      <Table update={songlist} onPush={deleteSongFromTable}/>
    </div>  
  );
}

export default App;
