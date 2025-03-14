import {
    Song
} from '../models/song.model.js';


export const getAllSongs = async (req, res,next) => {

    try {
        const songs = await Song.find().sort({
            createdAt: -1
        });
        res.json(songs);
    } catch (error) {
        next(error);
    }
}

export const getFeatuedSongs = async (req, res,next) => {
    try {
        const songs = await Song.aggregate([{
                $project: {
                    id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            },

            {
                $sample: {
                    size: 6
                }
            }
        ]);
        res.json(songs);


    } catch (error) {
        next(error);
    }
}

export const getMadeForYou = async (req, res,next) => {
    try {
        const songs = await Song.aggregate([{
                $project: {
                    id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            },
            {
                $sample: {
                    size: 4
                }
            }
        ]);
        res.json(songs);


    } catch (error) {
        next(error);
    }
}

export const getTrending = async (req, res,next) => {
    try {
        const songs = await Song.aggregate([{
                $project: {
                    id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            },
            {
                $sample: {
                    size: 4
                }
            }
        ]);
        res.json(songs);
    } catch (error) {
        next(error);
    }
}