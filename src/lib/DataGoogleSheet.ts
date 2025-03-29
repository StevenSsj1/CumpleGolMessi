import { type Goals } from "../types/DataGoals";

const messiUrl = import.meta.env.PUBLIC_URL_MESSI_DATA;
const ronaldoUrl = import.meta.env.PUBLIC_URL_CRISTIANO_DATA;

export default async function getDataGoogleSheet(
  dateBirthday: string
): Promise<Goals> {
  const birthdayDayMonth = getDateMonthDay(dateBirthday);
  try {
    const [goalsMessi, goalsRonaldo] = await Promise.all([
      fetchAndFilterData(messiUrl, birthdayDayMonth),
      fetchAndFilterData(ronaldoUrl, birthdayDayMonth),
    ]);
    return [...goalsMessi, ...goalsRonaldo];
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return [];
  }
}

async function fetchAndFilterData(url: string, filterDate: string): Promise<Goals> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const csv = await response.text();
    const lines = csv.split("\n").slice(1);
    const filteredGoals: Goals = [];
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;
      const [fecha, equipo, oponente, scorer] = trimmedLine.split(",");
      if (getDateMonthDay(fecha) === filterDate) {
        filteredGoals.push({ fecha, equipo, oponente, scorer });
      }
    }
    return filteredGoals;
  } catch (error) {
    console.error(`Error processing CSV from ${url}:`, error);
    return [];
  }
}

function getDateMonthDay(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}-${month}`;
}
