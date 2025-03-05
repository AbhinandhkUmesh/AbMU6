import {Album} from "../models/album.model.js";

export const getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find({}).populate("songs");
        res.staus(200).json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
        next(error);
    }
}

export const getAlbumById = async (req, res) => {
    try {
        const {albumId} = req.params.albumId;

        const album = await Album.findById(albumId).populate("songs");
         
        
        if(!album) {
            res.status(404).json({message: "Album not found"});
        }
        res.status(200).json(album);
     }
    catch (error) {
        res.status(500).json({ message: error.message }); 
        next(error);
    }
}