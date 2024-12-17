import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";
import FavoriteSong from "../../models/favorite-songs";

export const index = async(req: Request, res: Response) => {
    const favoriteSongs = await FavoriteSong.find({
        // userId: "",
        deleted: false
    });

    for(let i = 0; i<favoriteSongs.length; i++){
        const infoSong = await Song.findOne({
           _id: favoriteSongs[i].songId,
           deleted: false 
        });

        const infoSinger = await Singer.findOne({
            _id: infoSong.singerId,
            deleted: false
        })

        favoriteSongs[i]["infoSong"] = infoSong;
        favoriteSongs[i]["infoSinger"] = infoSinger;
    }

    
    res.render("client/pages/favorite-songs/index", {
        pageTitle: "Bài hát yêu thích",
        favoriteSongs: favoriteSongs
    });
}