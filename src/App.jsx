import { useState } from "react"

function App() {
  const [query, setQuery] = useState('')

  return (
    <div>
      <h1>Dashboard de Llaves</h1>
      <input
        type="text"
        placeholder="Buscar llaves..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

export default App