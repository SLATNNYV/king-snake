import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';

export default function AdminPanel() {
  const { user, signOut } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '' });

  useEffect(() => {
    if (!user) return;
    fetchProducts();
  }, [user]);

  async function fetchProducts() {
    const { data } = await supabase.from('produtos').select('*');
    setProducts(data || []);
  }

  async function addProduct(e) {
    e.preventDefault();
    await supabase.from('produtos').insert([form]);
    setForm({ name: '', description: '', price: '', image: '' });
    fetchProducts();
  }

  async function deleteProduct(id) {
    await supabase.from('produtos').delete().eq('id', id);
    fetchProducts();
  }

  if (!user) return <p className="p-4">Acesso restrito. Faça login primeiro.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
      <Button onClick={signOut}>Sair</Button>
      <form onSubmit={addProduct} className="my-4 space-y-2">
        <input className="w-full border p-2" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border p-2" placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="w-full border p-2" placeholder="Preço" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className="w-full border p-2" placeholder="URL da Imagem" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <Button type="submit">Adicionar Produto</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p>{p.description}</p>
            <p className="text-green-600 font-bold">R$ {p.price}</p>
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover my-2" />
            <Button onClick={() => deleteProduct(p.id)}>Excluir</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
