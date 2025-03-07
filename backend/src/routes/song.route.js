import { Router } from "express";
import { getAllSongs,getFeatuedSongs,getMadeForYou,getTrending } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();


router.get('/',protectRoute,requireAdmin,getAllSongs);
router.get('/featured',getFeatuedSongs);
router.get('/madeForYou',getMadeForYou);
router.get('/trending',getTrending);





export default router;