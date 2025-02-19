import { squads } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm/expressions';
import db from '../lib/db.js';
import { validateSquadCreation, transformPlayersForDB, transformSquadFromDB } from '../shared/models/squadModel.js';

/**
 * Handles GET requests for squads.
 * @param {Object} user - The authenticated user object.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<Object>} The response with squads data.
 */
export async function handleGet(user, req, res) {
  const result = await db.select().from(squads).where(eq(squads.userId, user.id));
  const squadsData = result.map(row => transformSquadFromDB(row));
  return res.status(200).json(squadsData);
}

/**
 * Handles POST requests to create a new squad.
 * @param {Object} user - The authenticated user object.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<Object>} The response with the created squad.
 */
export async function handlePost(user, req, res) {
  const { name, players } = req.body;
  try {
    validateSquadCreation({ name, players });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  const insertResult = await db.insert(squads).values({
    userId: user.id,
    name,
    players: transformPlayersForDB(players)
  }).returning();
  const insertedSquad = insertResult[0];
  return res.status(200).json(transformSquadFromDB(insertedSquad));
}

/**
 * Handles PUT requests to update an existing squad.
 * @param {Object} user - The authenticated user object.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<Object>} The response with the updated squad.
 */
export async function handlePut(user, req, res) {
  const { id, name, players } = req.body;
  try {
    validateSquadCreation({ name, players });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  const updateResult = await db.update(squads)
    .set({ name, players: transformPlayersForDB(players) })
    .where(eq(squads.id, id))
    .returning();
  const updatedSquad = updateResult[0];
  return res.status(200).json(transformSquadFromDB(updatedSquad));
}