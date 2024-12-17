import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";


// [GET] /search/:type
export const result = async(req: Request, res: Response) =>{
    const type: string = req.params.type;
    const keyword: string = `${req.query.keyword}`;

    let newSongs = [];
  
    if(keyword) {
      const keywordRegex = new RegExp(keyword, "i");
      // Tạo ra slug không dấu, có thêm dấu - ngăn cách
      const stringSlug = convertToSlug(keyword);
      const stringSlugRegex = new RegExp(stringSlug, "i");
      console.log(keyword);
      console.log(keywordRegex);
      console.log(stringSlugRegex);
      const songs = await Song.find({
        $or: [
          { title: keywordRegex },
          { slug: stringSlugRegex }
        ] 
      });

      for(let i = 0; i<songs.length; i++){
        const infoSinger = await Singer.findOne({
            _id: songs[i].singerId
          });
    
          // songs[i]["infoSinger"] = infoSinger;
          newSongs.push({
            id: songs[i].id,
            title: songs[i].title,
            avatar: songs[i].avatar,
            like: songs[i].like,
            slug: songs[i].slug,
            infoSinger: {
              fullName: infoSinger.fullName
            }
          });
      }
      // newSongs=songs;
    }

    switch (type) {
      case "result":
        res.render("client/pages/search/result", {
          pageTitle: `Kết quả: ${keyword}`,
          keyword: keyword,
          songs: newSongs
        });
        break;
        case "suggest":
          res.json({
            code: 200,
            message: "Thành công!",
            songs: newSongs
          });
          break;
      default:
        break;
    }
}