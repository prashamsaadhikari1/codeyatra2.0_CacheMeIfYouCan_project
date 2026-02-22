// routes/routes.js

import pool from "../config/db.js";


/**
 * POST /routes
 * body: { from: {lat,lng}, to: {lat,lng} }
 */
export const routes = async (req, res) => {
  const { from, to } = req.body;
  if (!from || !to) return res.status(400).json({ error: "Missing coordinates" });

  try {
    // Find all paths that intersect or are near from-to points
    // For MVP: get paths within 50m of start/end points
    const query = `
      SELECT id, ST_AsGeoJSON(line_geom) AS geom, surface_type, incline_percent, width_cm, has_curb_cuts, is_lit_at_night
      FROM paths
      WHERE ST_DWithin(line_geom, ST_SetSRID(ST_MakePoint($1, $2),4326)::geography, 50)
         OR ST_DWithin(line_geom, ST_SetSRID(ST_MakePoint($3, $4),4326)::geography, 50)
    `;
    const params = [from.lng, from.lat, to.lng, to.lat];
    const result = await pool.query(query, params);

    // Simple scoring: wider paths + ramp/curb + lower incline
    const scoredPaths = result.rows.map((p) => {
      let score = 0;
      score += p.width_cm >= 120 ? 1 : 0; // wide enough
      score += p.has_curb_cuts ? 1 : 0;
      score += p.incline_percent <= 5 ? 1 : 0; // gentle slope
      score += p.is_lit_at_night ? 0.5 : 0; // bonus if lit
      return { ...p, accessibility_score: score };
    });

    // Sort descending by accessibility
    scoredPaths.sort((a, b) => b.accessibility_score - a.accessibility_score);

    res.json(scoredPaths);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

