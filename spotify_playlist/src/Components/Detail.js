import React from 'react';


const Detail = ({album, artists, name, duration_ms, id, onPush}) => {

    return (
        <div className="offset-md-1 col-sm-4" >
            <div className="row col-sm-12 px-0">
                <img 
                    src={album.images[0].url}
                    alt={name}>                    
                </img>
            </div>
            <div className="row col-sm-12 px-0">
                <label htmlFor={name} className="form-label col-sm-12">
                    {name}
                </label>
            </div>
            <div className="row col-sm-12 px-0">
                <label htmlFor={artists[0].name} className="form-label col-sm-12">
                    {artists[0].name}
                </label>
            </div>
            <button className="add-to-playlist" onClick={() => {onPush(id, artists, name, duration_ms)}}>Add to Playlist</button>
        </div>
    );
}

export default Detail;