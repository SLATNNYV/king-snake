import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fetchProducts() {
  const { data, error } = await supabase
    .from('produtos')
    .select('*');

  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return;
  }

  console.log('Produtos:', data);
  // Aqui você pode atualizar o estado da sua aplicação com os dados recebidos
}

fetchProducts();

