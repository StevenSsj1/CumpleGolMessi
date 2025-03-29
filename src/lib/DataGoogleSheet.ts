import { type Goal, type Goals } from "../types/DataGoals";


const messiUrl= import.meta.env.PUBLIC_URL_MESSI_DATA;
const ronaldoUrl = import.meta.env.PUBLIC_URL_CRISTIANO_DATA;

export default async function getDataGoogleSheet(
  dateBirthday: string
): Promise<Goals> {

  try {
    const [goalsMessi, goalsRonaldo] = await Promise.all([
      fetchDataGoogleSheet(messiUrl),
      fetchDataGoogleSheet(ronaldoUrl),
    ]);

    const birthdayDayMonth = getDateMonthDay(dateBirthday);

    const goalsOnBirthday = [...goalsMessi, ...goalsRonaldo].filter(({ fecha }) => {   
      return getDateMonthDay(fecha) === birthdayDayMonth;
    });

    return goalsOnBirthday.length > 0 ? goalsOnBirthday : [];
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return [];
  }
}

async function fetchDataGoogleSheet(url: string): Promise<Goals> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const csv = await response.text();
    return csv
      .split("\n")
      .slice(1)
      .map((row) => {
        const [fecha, equipo, oponente, scorer] = row.trim().split(",");
        if (!fecha || !equipo || !oponente || !scorer) return null;
        return { fecha, equipo, oponente, scorer } as Goal;
      })
      .filter((goal): goal is Goal => goal !== null);
  } catch (error) {
    console.error(`Error processing CSV from ${url}:`, error);
    return [];
  }
}

function getDateMonthDay(date: string): string {
  const dateParts = date.split("-");
  const day = dateParts[2];
  const month = dateParts[1];
  return `${day}-${month}`; 
}
