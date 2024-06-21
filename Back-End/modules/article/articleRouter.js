import { Router } from "express";
import { createArticle, deleteArticle, dislikeArticle, editArticle, likeArticle, reportArticle, viewArticle, viewArticles } from "./articleController.js";

const router = Router()

// TODO: multer, auth before article creation/edit "midddleware"
router.post('/createArticle', createArticle);
router.put('/editArticle/:articleId', editArticle);
router.delete('/deleteArticle/:articleId', deleteArticle);

// TODO: check if it could be "/article/:articleId/likeArticle"
router.patch('/likeArticle/:articleId', likeArticle);
router.patch('/dislikeArticle/:articleId', dislikeArticle);
router.patch('/reportArticle/:articleId', reportArticle);

// TODO: auth
router.get('/viewArticle/:articleId', viewArticle);
router.get('/viewArticles', viewArticles);

export default router;



