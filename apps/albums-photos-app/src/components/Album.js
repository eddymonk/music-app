import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../pages/AlbumsPhotosApp.css";

const Album = ({ album, index, handleAlbumClick, handleEditAlbum }) => {
  return (
    <Draggable draggableId={album.id.toString()} index={index}>
      {(provided) => (
        <li
          className="album-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => handleAlbumClick(album.id)}>
          <div>
            <p>
              <b>Title: </b>
              {album.title}
            </p>
            <p>
              <b>User ID: </b>
              {album.userId}
            </p>
          </div>
          <button onClick={() => handleEditAlbum(album)}>Edit</button>
        </li>
      )}
    </Draggable>
  );
};

export default Album;
