import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Conectando ao Supabase com variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [catalogo, setCatalogo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarCatalogo() {
      const { data, error } = await supabase.from("catalogo").select("*");

      if (error) {
        console.error("Erro ao buscar dados:", error.message);
        setErro("Erro ao carregar os dados");
        setLoading(false);
        return;
      }

      setCatalogo(data);
      setLoading(false);
    }

    carregarCatalogo();
  }, []);

  if (loading) return <div className="p-4">Carregando catálogo...</div>;
  if (erro) return <div className="p-4 text-red-500">{erro}</div>;

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold mb-6">Catálogo King Snake</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {catalogo.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={item.imagem_url}
              alt={item.nome}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{item.nome}</h2>
            <p className="text-sm text-gray-700">{item.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

