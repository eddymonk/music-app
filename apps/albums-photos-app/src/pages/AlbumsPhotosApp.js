import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Album from "../components/Album";
import Photo from "../components/Photo";
import "./AlbumsPhotosApp.css";

const AlbumsPhotosApp = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editAlbum, setEditAlbum] = useState(null);
  const [editPhoto, setEditPhoto] = useState(null);
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    url: "",
    thumbnailUrl: "",
  });

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/albums"
        );
        setAlbums(response.data);
        setFilteredAlbums(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  useEffect(() => {
    setFilteredAlbums(
      albums.filter((album) =>
        album.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, albums]);

  useEffect(() => {
    setFilteredPhotos(
      photos.filter((photo) =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, photos]);

  const fetchPhotos = async (albumId) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
      );
      setPhotos(response.data);
      setFilteredPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleAlbumClick = (albumId) => {
    setSelectedAlbumId(albumId);
    fetchPhotos(albumId);
  };

  const handleEditAlbum = (album) => {
    setEditAlbum(album);
  };

  const handleEditPhoto = (photo) => {
    setEditPhoto(photo);
  };

  const handleAlbumUpdate = (event) => {
    event.preventDefault();
    const updatedAlbums = albums.map((album) =>
      album.id === editAlbum.id ? { ...album, title: editAlbum.title } : album
    );
    setAlbums(updatedAlbums);
    setFilteredAlbums(updatedAlbums);
    setEditAlbum(null);
  };

  const handlePhotoUpdate = (event) => {
    event.preventDefault();
    const updatedPhotos = photos.map((photo) =>
      photo.id === editPhoto.id ? { ...photo, title: editPhoto.title } : photo
    );
    setPhotos(updatedPhotos);
    setFilteredPhotos(updatedPhotos);
    setEditPhoto(null);
  };

  const handleAddPhoto = (event) => {
    event.preventDefault();
    const newPhotoData = {
      ...newPhoto,
      albumId: selectedAlbumId,
      id: photos.length + 1,
    };
    setPhotos([...photos, newPhotoData]);
    setFilteredPhotos([...photos, newPhotoData]);
    setNewPhoto({ title: "", url: "", thumbnailUrl: "" });
  };

  const handlePhotoInputChange = (event) => {
    const { name, value } = event.target;
    setNewPhoto({ ...newPhoto, [name]: value });
  };

  const handleDeletePhoto = (photoId) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
    setPhotos(updatedPhotos);
    setFilteredPhotos(updatedPhotos);
  };

  const onDragEndAlbums = (result) => {
    if (!result.destination) return;
    const items = Array.from(albums);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setAlbums(items);
    setFilteredAlbums(items);
  };

  const onDragEndPhotos = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
    setFilteredPhotos(items);
  };

  return (
    <div className="albums-photos-app">
      <h1>Albums</h1>
      <input
        type="text"
        placeholder="Search albums..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? (
        <p>Loading albums...</p>
      ) : (
        <DragDropContext onDragEnd={onDragEndAlbums}>
          <Droppable droppableId="albums">
            {(provided) => (
              <ul
                className="album-list"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {filteredAlbums.map((album, index) => (
                  <Album
                    key={album.id}
                    album={album}
                    index={index}
                    handleAlbumClick={handleAlbumClick}
                    handleEditAlbum={handleEditAlbum}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {selectedAlbumId && (
        <div className="photos-section">
          <h2>Photos in Album {selectedAlbumId}</h2>
          <input
            type="text"
            placeholder="Search photos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <form onSubmit={handleAddPhoto} className="form-container">
            <input
              type="text"
              name="title"
              placeholder="Photo title"
              value={newPhoto.title}
              onChange={handlePhotoInputChange}
              required
            />
            <input
              type="url"
              name="url"
              placeholder="Photo URL"
              value={newPhoto.url}
              onChange={handlePhotoInputChange}
              required
            />
            <input
              type="url"
              name="thumbnailUrl"
              placeholder="Thumbnail URL"
              value={newPhoto.thumbnailUrl}
              onChange={handlePhotoInputChange}
              required
            />
            <button type="submit">Add Photo</button>
          </form>
          <DragDropContext onDragEnd={onDragEndPhotos}>
            <Droppable droppableId="photos" direction="horizontal">
              {(provided) => (
                <div
                  className="photos-grid"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {filteredPhotos.map((photo, index) => (
                    <Photo
                      key={photo.id}
                      photo={photo}
                      index={index}
                      handleEditPhoto={handleEditPhoto}
                      handleDeletePhoto={handleDeletePhoto}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
      {editAlbum && (
        <form onSubmit={handleAlbumUpdate} className="form-container">
          <h2>Edit Album</h2>
          <input
            type="text"
            value={editAlbum.title}
            onChange={(e) =>
              setEditAlbum({ ...editAlbum, title: e.target.value })
            }
          />
          <button type="submit">Update Album</button>
        </form>
      )}
      {editPhoto && (
        <form onSubmit={handlePhotoUpdate} className="form-container">
          <h2>Edit Photo</h2>
          <input
            type="text"
            value={editPhoto.title}
            onChange={(e) =>
              setEditPhoto({ ...editPhoto, title: e.target.value })
            }
          />
          <button type="submit">Update Photo Title</button>
        </form>
      )}
    </div>
  );
};

export default AlbumsPhotosApp;
