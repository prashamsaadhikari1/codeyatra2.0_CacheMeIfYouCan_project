// routes/places.js
// import express from "express";
import pool from "../config/db.js";



/**
 * GET /places?service=xyz&wheelchair_accessible=true
 */
export const places = async (req, res) => {
  const { service, wheelchair_accessible } = req.query;

  try {
    let query = `SELECT id, name, category, wheelchair_accessible, has_accessible_toilet, has_ramp, avg_score,
                 ST_X(geom) AS lng, ST_Y(geom) AS lat
                 FROM places WHERE 1=1`;
    const params = [];

    if (service) {
      params.push(service);
      query += ` AND category = $${params.length}`;
    }

    if (wheelchair_accessible) {
      const val = wheelchair_accessible === "true";
      params.push(val);
      query += ` AND wheelchair_accessible = $${params.length}`;
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

