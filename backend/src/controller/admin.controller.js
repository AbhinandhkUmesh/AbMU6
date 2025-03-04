import {
    Song
} from "../models/song.model.js";

import {
    Album
} from "../models/album.model.js";

import cloudinary from "../lib/cloudinary.js";


// Helper function to upload file to Cloudinary
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        });
        return result.secure_url;
    } catch (error) {
        console.log("Error in uploadToCloudinary", error);
        throw new Error("Error in uploading file to Cloudinary");
    }
};

export const createSong = async (req, res, next) => {
    try {
        // Check if both audio and image files are present
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({
                message: "Please upload both audio and image files",
            });
        }

        const {
            title,
            artist,
            albumId,
            duration
        } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        // Upload files to Cloudinary
        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        // Create a new song
        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null,
        });

        await song.save();

        // If the song belongs to an album, update the album's songs array
        if (albumId) {
            await album.findByIdAndUpdate(albumId, {
                $push: {
                    songs: song._id,
                },
            });
        }

        res.status(201).json({
            message: "Song created successfully",
            song,
        });

    } catch (error) {
        console.log("Error in createSong", error);
        next(error);
    }
};

export const deleteSong = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        const song = await Song.findById(id);

        //if song belongs to an album, remove it from the album's songs array
        if (song.albumId) {
            await album.findByIdAndUpdate(song.albumId, {
                $pull: {
                    songs: song._id,
                },
            });
        }

        await Song.findByIdAndDelete(id);
        res.status(200).json({
            message: "Song deleted successfully",
        });

    } catch (error) {
        console.log("Error in deleteSong", error);
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try {

        const {
            title,
            artist,
            releaseYear,
        } = req.body;

        const {
            imageFile
        } = req.files;

        const imageUrl = await uploadToCloudinary(imageFile);

        const newAlbum = new Album({
            title,
            artist,
            releaseYear,
            imageUrl,
        });

        await newAlbum.save();

        res.status(201).json(newAlbum, {
            message: "Album created successfully",
        });

    } catch (error) {
        console.log("Error in createAlbum", error);
        next(error);

    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        await Song.deleteMany({
            albumId: id
        });
        await Album.findByIdAndDelete(id);

        res.status(200).json({
            message: "Album deleted successfully",
        });


    } catch (error) {
        console.log("Error in deleteAlbum", error);
        next(error);
    }
}

export const checkAdmin = async (req, res, next) => {   
    try {
        res.status(200).json({admin:true});
    } catch (error) {
        console.log("Error in checkAdmin", error);
        next(error);
    }
}