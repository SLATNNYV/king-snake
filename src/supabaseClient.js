import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tmrrbryjkplgfvfmpife.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtcnJicnlqa3BsZ2Z2Zm1waWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NDU1MDUsImV4cCI6MjA2NDIyMTUwNX0.34E-dmKmnQOwttKeX9yIxAbvY4w33sGpdYJVN9GCF54'; // sua chave completa

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

