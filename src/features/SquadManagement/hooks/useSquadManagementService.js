import { fetchSquadsAPI } from '../api/squadAPI.js';

export async function fetchSquads() {
  return await fetchSquadsAPI();
}