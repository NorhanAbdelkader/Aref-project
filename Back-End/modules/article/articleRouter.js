import { Router } from "express";
import { createArticle, deleteArticle, dislikeArticle, editArticle, likeArticle, reportArticle, viewArticle, viewArticles } from "./articleController.js";
import { HME, fileValidation, myMulter } from "../../services/multer.js";
import { auth } from "../../middleware/auth.js";

const router = Router()

// TODO: auth before article creation/edit "midddleware"
router.post('/createArticle', myMulter(fileValidation.image).array('images', 4), HME, auth(['Admin','User']), createArticle);
router.put('/editArticle/:articleId', myMulter(fileValidation.image).array('images', 4), HME, auth(['Admin','User']), editArticle);
router.delete('/deleteArticle/:articleId', auth(['Admin','User']), deleteArticle);

// TODO: check if it could be "/article/:articleId/likeArticle"
router.patch('/likeArticle/:articleId',auth(['Admin','User']), likeArticle);
router.patch('/dislikeArticle/:articleId',auth(['Admin','User']), dislikeArticle);
router.patch('/reportArticle/:articleId',auth(['Admin','User']), reportArticle);

// TODO: auth
router.get('/viewArticle/:articleId',auth(['Admin','User']), viewArticle);
router.get('/viewArticles',auth(['Admin','User']), viewArticles);

export default router;



