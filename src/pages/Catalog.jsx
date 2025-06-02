export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('produtos').select('*');
      if (error) console.error(error);
      console.log('Produtos:', data);
      setProducts(data || []);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Catálogo King Snake</h1>
      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              <strong>{p.nome}</strong> - {p.preco} <br />
              <img src={p.imagem} alt={p.nome} width="200" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


 