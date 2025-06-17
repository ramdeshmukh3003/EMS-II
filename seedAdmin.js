const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Replace with your MongoDB URI
const MONGO_URI = "mongodb+srv://ramdeshmukh3003:3Zit9UaQa5FiYmYH@cluster0.spj4k5e.mongodb.net/teamsync_db"

// Define your user schema (match your existing schema)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  mobile: String,
  password: String,
  type: String,
  status: String,
  image: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
});

const User = mongoose.model('User', userSchema);

async function seedAdmin() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const existingAdmin = await User.findOne({ email: 'admin@admin.com' });
  if (existingAdmin) {
    // console.log('Admin already exists.');
    return process.exit(0);
  }

  const password = '12345678'; // set your admin password here
  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = new User({
    name: 'Ram',
    email: 'ram@admin.com',
    username: 'ram3003admin',
    mobile: '9309818029',
    password: hashedPassword,
    type: 'admin',
    status: 'active',
    image: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg?w=768',
    address: 'Pune',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  await adminUser.save();
  // console.log('✅ Admin seeded successfully.');
  mongoose.disconnect();
}

seedAdmin().catch((err) => {
  // console.error('❌ Failed to seed admin:', err);
  mongoose.disconnect();
});
