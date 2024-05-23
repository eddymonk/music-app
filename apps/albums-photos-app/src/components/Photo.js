import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../pages/AlbumsPhotosApp.css";

const Photo = ({ photo, index, handleEditPhoto, handleDeletePhoto }) => {
  return (
    <Draggable draggableId={photo.id.toString()} index={index}>
      {(provided) => (
        <div
          className="photo-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <p>{photo.title}</p>
          <div className="photo-buttons">
            <button onClick={() => handleEditPhoto(photo)}>Edit</button>
            <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Photo;
