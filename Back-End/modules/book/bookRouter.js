import { Router } from 'express'
import { addbook,allbooks,deletebook,filterbooks,getbook,rateBook,searchBooksByName,sortbooks,updatebook} from './bookController.js';
import { myMulter ,fileValidation,HME } from '../../services/multer.js';
import { auth } from '../../middleware/auth.js';
const router = Router();




router.post("/",myMulter(fileValidation.image).single('image'),HME,auth(['Admin']), addbook)

router.get("/",auth(['Admin','User']),allbooks)

router.get("/filter",auth(['Admin','User']), filterbooks)

router.get("/sort", auth(['Admin','User']),sortbooks)

router.get("/search",auth(['Admin','User']),searchBooksByName)

router.get("/:id", auth(['Admin','User']),getbook)

router.patch("/:id", auth(['User']),rateBook)

router.put("/:id",myMulter(fileValidation.image).single('image'),HME, auth(['Admin','User']),updatebook)

router.delete("/:id", auth(['Admin','User']),deletebook)






export default router