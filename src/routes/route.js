// src/routes/route.js

import express from "express";
import { places } from "../controllers/places.js";
import { routes } from "../controllers/routes.js";
import { report } from "../controllers/reports.js";
import upload from "../middleware/upload.js";



const router = express.Router();

router.get("/place", places);
router.post("/route", routes);
router.post("/report", upload.single("photo"),report);

export default router;
    