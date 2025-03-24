import type { Goals } from "../types/DataGoals";

const URL_MAGIC_LOOPS = import.meta.env.PUBLIC_MAGIC_LOOPS

export default async function fetchMagicLoops( Goals: Goals ) {
    const url = URL_MAGIC_LOOPS;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(Goals.map((goal) => {
        return {
          fecha: goal.fecha,
          equipo: goal.equipo,
          oponente: goal.oponente,
          scorer: goal.scorer
        }
      })),
    });
    
    const responseJson = await response.json();
    return responseJson ;
}

