import { Router } from "express";
import { celebrate } from "celebrate";
import auth from "../../../middleware/auth"
import { validation } from "../../../common";
import { syllabusCtrV1 } from "../../../controllers/v1/teacher/syllabus.ctr"

export default function (router: Router) {
    router.post(
        "/create_chapter", auth,
        celebrate({
            body: {
                class_id: validation.chapter.class_id,
                chapter_name: validation.chapter.chapter_name
            }
        }),
        (req, res, next) => {
            syllabusCtrV1.create_chapter(req, res, next);
        }
    );

    router.post(
        "/get_chapter", auth,
        celebrate({
            body: {
                class_id: validation.chapter.class_id,
            }
        }),
        (req, res, next) => {
            syllabusCtrV1.get_chapter(req, res, next);
        }
    );

    router.get(
        "/get_all_chapter", auth,
        (req, res, next) => {
            syllabusCtrV1.get_all_chapter(req, res, next);
        }
    );

    router.post(
        "/edit_chapter", auth,
        celebrate({
            body: {
                chapter_name: validation.chapter.chapter_name,
                chp_id: validation.chapter.chp_id
            }
        }),
        (req, res, next) => {
            syllabusCtrV1.edit_chapter(req, res, next);
        }
    );

    router.post(
        "/delete_chapter", auth,
        celebrate({
            body: {
                chp_id: validation.chapter.chp_id,
            }
        }),
        (req, res, next) => {
            syllabusCtrV1.delete_chapter(req, res, next);
        }
    );

    router.post(
        "/assign_chapter_month", auth,
        celebrate({
            body: {
                class_id: validation.chapter.class_id,
                chapters: validation.chapter.chapters,
                month: validation.chapter.month
            }
        }),
        (req, res, next) => {
            syllabusCtrV1.assign_chapter_month(req, res, next);
        }
    );

    router.post(
        "/create_topic", auth,
        celebrate({
            body: {
                class_id: validation.topic.class_id,
                chp_id: validation.topic.chp_id,
                topics: validation.topic.topics
            }
        }),
        (req, res, next) => {
            syllabusCtrV1.create_topic(req, res, next);
        }
    );

    router.post(
        "/get_topic", auth,
        celebrate({
            body: {
                chp_id: validation.topic.chp_id,
            }
        }),
        (req, res, next) => {
            syllabusCtrV1.get_topic(req, res, next);
        }
    );

    router.post(
        "/edit_topic", auth,
        celebrate({
            body: {
                topic_id: validation.topic.topic_id,
                topic_name: validation.topic.topic_name,
                chp_id: validation.topic.chp_id
            }
        }),
        (req, res, next) => {
            syllabusCtrV1.edit_topic(req, res, next);
        }
    );

    router.post(
        "/assign_date_topic", auth,
        celebrate({
            body: {
                topic_id: validation.topic.topic_id,
                start_date: validation.topic.start_date,
                end_date: validation.topic.end_date,
                chp_id: validation.topic.chp_id
            }
        }),
        (req, res, next) => {
            syllabusCtrV1.assign_date_topic(req, res, next);
        }
    );

    router.post(
        "/delete_topic", auth,
        celebrate({
            body: {
                chp_id: validation.topic.chp_id,
                topic_id: validation.topic.topic_id,
            }
        }),
        (req, res, next) => {
            syllabusCtrV1.delete_topic(req, res, next);
        }
    );

    return router;
}