// routes/reports.js
// import express from "express";
// import upload from "../middleware/upload.js";
import pool from "../config/db.js";



 export const report = async (req, res) => {
  const { user_id, issue_type, description, lat, lng } = req.body;
  // const photo_url = req.file ? /uploads/${req.file.filename} : null;
  const photo_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      `INSERT INTO reports (user_id, issue_type, description, photo_url, location, is_active, created_at, expires_at)
       VALUES ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($5, $6), 4326), TRUE, NOW(), NOW() + INTERVAL '48 hours')
       RETURNING *`,
      [user_id, issue_type, description, photo_url, lng, lat] // Note: lng, lat order
    );

    res.json({ report: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};
