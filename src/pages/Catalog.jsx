import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Card, CardContent } from '../components/ui/card';

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('produtos').select('*');
      setProducts(data || []);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-2" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-sm text-green-600 font-bold mt-1">R$ {product.price}</p>
            <a
              href={`https://wa.me/55SEUNUMERO?text=Gostaria%20de%20comprar%20o%20produto%20${encodeURIComponent(product.name)}`}
              className="text-blue-600 underline mt-2 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar pelo WhatsApp
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
