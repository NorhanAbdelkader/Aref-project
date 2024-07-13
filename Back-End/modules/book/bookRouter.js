import { Router } from 'express'
import { addbook,allbooks,deletebook,filterbooks,getbook,rateBook,searchBooksByName,sortbooks,updatebook} from './bookController.js';
import { myMulter ,fileValidation,HME } from '../../services/multer.js';
import { auth } from '../../middleware/auth.js';
const router = Router();




router.post("/",myMulter(fileValidation.image).single('image'),HME,auth(['Admin']), addbook)

router.get("/", allbooks)

router.get("/filter", filterbooks)

router.get("/sort", sortbooks)

router.get("/search", searchBooksByName)

router.get("/:id",getbook)

router.patch("/:id", auth(['User']),rateBook)

router.put("/:id",myMulter(fileValidation.image).single('image'),HME,auth(['Admin']),updatebook)

router.delete("/:id", auth(['Admin']),deletebook)






export default router