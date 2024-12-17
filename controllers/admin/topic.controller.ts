import { Request, Response } from "express";
import Topic from "../../models/topic.model";

// [GET] /admin/topics
export const index = async (req: Request, res: Response) =>{
    try {
        const topics = await Topic.find({
            deleted: false,
            status : 'active'
        })

        res.render('admin/pages/topics/index',{
            topics: topics,
            pageTitle: "Danh mục bài hát"
        })
    } catch (error) {
        console.log(error);
        res.render('admin/pages/page-404')
    }

}