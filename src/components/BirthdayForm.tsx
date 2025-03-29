import { useState } from "preact/hooks"
import { Players } from "../const/players"

export default function BirthdayForm() {
  const [birthday, setBirthday] = useState("")
  const [loading, setLoading] = useState(false)
  const [goalsInfo, setGoalsInfo] = useState("")
  const [scorers, setScorers] = useState<string[]>([])
  const [expanded, setExpanded] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [goals, setGoals] = useState<any[]>([])


  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    setBirthday("")
    setLoading(true)

    try {
      const response = await fetch(`/api/dataBirthday?birthday=${birthday}`)
      const { data } = await response.json();

      if (data.goals && Array.isArray(data.goals)) {
        setGoals(data.goals)
        const scorersList = data.goals.map((goal: any) => goal.scorer)
        setScorers(scorersList)
        setGoalsInfo(data.goalsInfo)
      } else {
        setGoalsInfo("Lo siento, ni Messi ni Ronaldo marcaron gol en tu cumpleaños 😢")
        setScorers([])
        setGoals([])
      }
      setResponseMessage(data.message || "")
    } catch (error) {
      console.error("Error al obtener los datos:", error)
      setGoalsInfo("Ocurrió un error al verificar los datos")
      setScorers([])
      setGoals([])
    }

    const event = new CustomEvent("updateResult", { detail: { result: responseMessage } })
    window.dispatchEvent(event)

    setLoading(false)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">¿Messi o Cristiano hicieron gol en tu cumpleaños?</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} class="w-full max-w-md p-8 rounded-lg shadow-2xl">
        <label htmlFor="dateBirthday" class="block text-lg font-medium text-gray-300 mb-4">
          Selecciona tu fecha de nacimiento: (No importa el año, ya que solo se tomará en cuenta el mes y el día)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="date"
            id="birthday"
            class="flex-1 p-3 rounded-lg bg-black text-white border border-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
            name="birthday"
            required
            value={birthday}
            onInput={(e) => setBirthday((e.target as HTMLInputElement).value)}
          />
          <button
            type="submit"
            disabled={loading}
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verificar
          </button>
        </div>
      </form>

      {scorers.length > 0 && (
        <div id="resultData" class="mt-8 text-center">
          <div class="flex flex-wrap justify-center gap-4">
            {scorers.includes(Players.MESSI) && (
              <img
                src="/messi.webp"
                alt="Messi"
                class="relative w-72 h-96 object-cover bottom-14"
                style="mask-image: linear-gradient(black 80%, transparent);"
              />
            )}
            {scorers.includes(Players.RONALDO) && (
              <img
                src="/ronaldo.webp"
                alt="Ronaldo"
                class="relative w-72 h-96 object-cover bottom-14"
                style="mask-image: linear-gradient(black 90%, transparent);"
              />
            )}
          </div>
        </div>
      )}

      {goals.length > 0 && goalsInfo ? (
        <div id="resultData" class="text-center">
          <p
            class={`text-center text-2xl text-white rounded-md whitespace-pre-line overflow-hidden transition-all duration-300 ${
              expanded ? "max-h-full" : "max-h-[150px] md:max-h-[300px]"
            }`}
            id="result"
          >
            🥳⚽ {goalsInfo} 🎊🎊
          </p>
          <button onClick={() => setExpanded(!expanded)} class="text-white mt-2 hover:underline">
            <span>{expanded ? "Ver menos" : "Ver más"}</span>
          </button>
        </div>
      ) : (
        goalsInfo && (
          <div id="resultData" class="mt-8 text-center">
            <p class="text-center text-2xl mt-4 text-white" id="result">
              {goalsInfo}
            </p>
          </div>
        )
      )}

      {loading && (
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50 transition-opacity duration-300">
          <div class="flex flex-col items-center">
            <div class="h-40 w-40 flex flex-col items-center justify-center bg-white rounded-full shadow-lg relative">
            <img
                src="/balon.svg"
                class="h-24 w-24 animate-bounce animate-spin-slow text-black fill-current"
                alt="Loading animation"
              />
              <p class="text-black font-semibold">Cargando...</p>
            </div>
            <div class="w-24 h-4 bg-black opacity-30 rounded-full blur-md mt-[-10px]"></div>
          </div>
        </div>
      )}
    </div>
  )
}

