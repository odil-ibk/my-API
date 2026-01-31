const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const supabaseUrl =
  process.env.SUPABASE_URL || "https://thrfvgftxdkquavcqsoz.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRocmZ2Z2Z0eGRrcXVhdmNxc296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NTY0NTAsImV4cCI6MjA4NTQzMjQ1MH0.4roTMO-v-5cMb8r74T6aU6-hA1MVc4_T0hYNLs0_vxA";

const supabase = createClient(supabaseUrl, supabaseKey);

// Insert a new message
app.post("/messages", async (req, res) => {
  const { text } = req.body;

  const { data, error } = await supabase.from("messages").insert([{ text }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, data });
});

// Read all messages
app.get("/", (req, res) => {
  res.send("API is running ✅ Try /messages");
});

// Read all messages
app.get("/messages", async (req, res) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
