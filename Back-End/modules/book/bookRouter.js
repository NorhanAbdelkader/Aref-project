import { Router } from 'express'
import { addbook,allbooks,deletebook,filterbooks,getbook,rateBook,searchBooksByName,sortbooks,updatebook} from './bookController.js';
import { myMulter ,validationTypes,HME } from '../../service/clodMulter.js';
const router = Router();




router.post("/",myMulter(validationTypes.iamge).single('image'),HME, addbook)

router.get("/", allbooks)

router.get("/filter", filterbooks)

router.get("/sort", sortbooks)

router.get("/search", searchBooksByName)

router.get("/:id", getbook)

router.patch("/:id", rateBook)

router.put("/:id",myMulter(validationTypes.iamge).single('image'),HME, updatebook)

router.delete("/:id", deletebook)






export default router