import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('produtos').select('*');
      if (error) {
        console.error('Erro ao buscar produtos:', error);
      }
      setProducts(data || []);
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Catálogo King Snake</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              width: '250px',
            }}
          >
            <img
              src={product.imagem}
              alt={product.nome}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <h2 style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{product.nome}</h2>
            <p style={{ fontWeight: 'bold', color: 'green' }}>{product.preco}</p>
            <a
              href={`https://wa.me/5544997668305?text=Olá, gostaria de comprar o produto ${encodeURIComponent(
                product.nome
              )} por ${encodeURIComponent(product.preco)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'blue', textDecoration: 'underline', display: 'block', marginTop: '0.5rem' }}
            >
              Comprar pelo WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}


 