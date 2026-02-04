import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://qsyfcbfacxplfbaudvok.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZkOWJjN2Q0LTQzNGEtNDNjYi04MDRiLTM5MDQwZmY4MTM1MyJ9.eyJwcm9qZWN0SWQiOiJxc3lmY2JmYWN4cGxmYmF1ZHZvayIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY4OTg3NzYyLCJleHAiOjIwODQzNDc3NjIsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.GKu2p_p0D7i8EhNIgnRh8mXbQZIPOQFdgXnQNWqWlH0';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };