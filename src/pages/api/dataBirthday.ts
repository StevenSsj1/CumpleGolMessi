import type { APIRoute } from "astro";

import getDataGoogleSheet from '../../lib/DataGoogleSheet'; 
import FecthMagicLoops from '../../lib/FecthMagicLoops'; 
import { type Goal, type Goals } from '../../types/DataGoals';

export const GET: APIRoute = async ({ url }) => {
const birthday = url.searchParams.get("birthday"); 
let goalsInfo = ''; 
let goals: Goals = []; 
let scorers: string[] = [];

if (!birthday) 
    { return new Response(JSON.stringify({ error: "Falta la fecha de cumpleaños" }), { status: 400 }); }

try { 
    goals = await getDataGoogleSheet(birthday); scorers = goals.map((goal: Goal) => goal.scorer); 
    goalsInfo = goals.length > 0 ? await FecthMagicLoops(goals) : 'Lo siento, ni Messi ni Ronaldo marcaron gol en tu cumpleaños 😢'; 
    } 
catch (error) 
{ console.error('Error al obtener los datos de goles:', error); }

const response = { goals, scorers, goalsInfo, };

return new Response(JSON.stringify({ data: response }), { status: 200 }); };