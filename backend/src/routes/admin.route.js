import { Router } from "express";
import { createSong,deleteSong,createAlbum,deleteAlbum,checkAdmin} from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);
router.get('/check',checkAdmin)
router.get('/songs',createSong);
router.delete("/songs/:id" ,deleteSong);
router.delete("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);


export default router; 