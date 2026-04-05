import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'simple-backend' });
});

// Get all users
app.get('/users', async (req, res) => {
  const { data, error } = await supabase
    .from('app_users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Add a new user
app.post('/users', async (req, res) => {
  const { user_name, details } = req.body;

  if (!user_name) {
    return res.status(400).json({ error: 'user_name is required' });
  }

  const { data, error } = await supabase
    .from('app_users')
    .insert([{ user_name, details }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
