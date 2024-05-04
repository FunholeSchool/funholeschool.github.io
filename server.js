const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/profiles_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Profile schema and model
const profileSchema = new mongoose.Schema({
  username: String,
  description: String
});

const Profile = mongoose.model('Profile', profileSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profiles' });
  }
});

app.post('/profiles', async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error creating profile' });
  }
});

app.put('/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
});

app.delete('/profiles/:id', async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting profile' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
