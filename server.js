const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

const cors = require('cors');
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Academic_transcript', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Admin Schema
const AdminSchema = new mongoose.Schema({
  name: String,
  regnumber: { type: String, unique: true },
  branch: String,
  password: String
});

// Student Schema
const StudentSchema = new mongoose.Schema({
  name: String,
  regnumber: { type: String, unique: true },
  branch: String,
  password: String
});


const marksSchema = new mongoose.Schema({
  regNumber: {
    type: String,
    required: true,
    unique: true
  },
  subject1: {
    type: Number,
    required: true
  },
  subject2: {
    type: Number,
    required: true
  },
  subject3: {
    type: Number,
    required: true
  },
  subject4: {
    type: Number,
    required: true
  },
  subject5: {
    type: Number,
    required: true
  },
  subject6: {
    type: Number,
    required: true
  }
});

const Marks = mongoose.model('Marks', marksSchema);

const achievementSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  regNumber: { type: String, required: true },
  skills: { type: String, required: true },
  achievements: { type: String, required: true },
  certifications: { type: String, required: true }
});

// Create the model from the schema
const Achievement = mongoose.model('Achievement', achievementSchema);





const Admin = mongoose.model('Admin', AdminSchema);
const Student = mongoose.model('Student', StudentSchema);

//admin signup
app.post('/api/admin/signup', async (req, res) => {
  try {
    const { name, regnumber, branch, password } = req.body;

    // Validate input
    if (!name || !regnumber || !branch || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, regnumber, branch, password: hashedPassword });
    await admin.save();
    console.log('Admin registered successfully:', { name, regnumber, branch });
    res.status(201).send('Admin registered successfully' );
  } catch (error) {
    if (error.code === 11000) {
      console.error('Error registering admin: Duplicate registration number', { regnumber });
      res.status(400).send('Admin with this registration number already exists' );
    } else {
      console.error('Error registering admin:', error);
      res.status(500).send('Error registering admin' );
    }
  }
});


// Admin sign-in route
app.post('/api/admin/signin', async (req, res) => {
  const { regnumber, password } = req.body;
  try {
    const admin = await Admin.findOne({ regnumber });
    if (admin && await bcrypt.compare(password, admin.password)) {
      // Here you can generate and send a JWT token to the client
      res.send('Admin login successful');
    } else {
      res.status(401).send('Login failed');
    }
  } catch (error) {
    res.status(500).send('An error occurred. Please try again later.');
  }
});

// Create first admin route (for manual setup)
app.post('/api/admin/create-first', async (req, res) => {
  try {
    const { name, regnumber, branch, password } = req.body;

    // Validate input
    if (!name || !regnumber || !branch || !password) {
      return res.status(400).send('All fields are required');
    }

    // Check if there are any existing admins
    const existingAdmins = await Admin.countDocuments();
    if (existingAdmins > 0) {
      return res.status(403).send('First admin account already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, regnumber, branch, password: hashedPassword });
    await admin.save();
    console.log('First admin registered successfully:', { name, regnumber, branch });
    res.status(201).send('First admin registered successfully');
  } catch (error) {
    console.error('Error creating first admin:', error);
    res.status(500).send('Error creating first admin');
  }
});

// Student sign-up route
app.post('/api/student/signup', async (req, res) => {
  try {
    const { name, regnumber, branch, password } = req.body;

   // Validate input
if (!name || !regnumber || !branch || !password) {
  return res.status(400).send('All fields are required');
}


    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ name, regnumber, branch, password: hashedPassword });
    await student.save();
    console.log('Student registered successfully:', { name, regnumber, branch });
    res.status(201).send('Student reggistered successfully');
  } catch (error) {
    if (error.code === 11000) {
      console.error('Error registering student: Duplicate registration number', { regnumber });
      res.status(400).send('Student with this registration number already exists');
    } else {
      console.error('Error registering student:', error);
      res.status(500).send('Error registering student');
    }
  }
});

// Student sign-in route
app.post('/api/student/signin', async (req, res) => {
  const { regnumber, password } = req.body;
  try {
    const student = await Student.findOne({ regnumber });
    if (student && await bcrypt.compare(password, student.password)) {
      // Here you can generate and send a JWT token to the client
      res.send('Student login successful');
    } else {
      res.status(401).send('Login failed');
    }
  } catch (error) {
    res.status(500).send('An error occurred. Please try again later.');
  }
});
app.post('/api/addstudent', async (req, res) => {
  try {
      const { studentName, studentRegNo:registeredNumber  , Aadhar  :aadhaarNumber , Branch } = req.body;
      const newStudent = new AddStudent({
          studentName,
          registeredNumber,
          aadhaarNumber,
          branch,
      });
      await newStudent.save();

      res.json({ success: true, message: 'Student data saved successfully' });
  } catch (error) {
      console.error('Error saving student data:', error);
      res.status(500).json({ success: false, message: 'Error saving student data' });
  }
});
app.post('/api/searchstudent', async (req, res) => {
  const { regnumber } = req.body;

  try {
    const student = await Student.findOne({ regnumber }).exec();
    if (student) {
      res.status(200).send({ success: true, student });
    } else {
      res.status(404).send({ success: false, message: 'No student found with given registration number' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Error searching for student' });
  }
});

//register marks
app.post('/api/marks', async (req, res) => {
  try {
    const { regNumber, subject1, subject2, subject3, subject4, subject5, subject6 } = req.body;

    // Check if the registration number already exists
    const existingMarks = await Marks.findOne({ regNumber });
    if (existingMarks) {
      return res.status(400).json({ success: false, message: 'Marks already registered for this registration number' });
    }

    // Create a new marks document
    const newMarks = new Marks({
      regNumber,
      subject1,
      subject2,
      subject3,
      subject4,
      subject5,
      subject6
    });

    // Save the new marks document
    await newMarks.save();

    res.status(201).json({ success: true, message: 'Marks registered successfully' });
  } catch (error) {
    console.error('Error registering marks:', error);
    res.status(500).json({ success: false, message: 'Error registering marks' });
  }
});

const userSchema = new mongoose.Schema({
  regNumber: String,
  fullName: String,
  dob: String,
  phone: String,
  address: String,
  skills: [String],
  courses: [String],
  certificates: [String]
});

const User = mongoose.model('User', userSchema);




// to get display the marks 
app.get('/api/marks/:regNumber', async (req, res) => {
  try {
    const regNumber = req.params.regNumber;
    const marks = await Marks.findOne({ regNumber });
    if (marks) {
      res.json(marks);
    } else {
      res.status(404).send('Marks not found for the given registration number.');
    }
  } catch (error) {
    console.error('Error fetching marks:', error);
    res.status(500).send('An error occurred while fetching marks.');
  }
});

//code to add achievements

app.post('/achievements', async (req, res) => {
  try {
    const { fullName, dob, email, phone, address, regNumber, skills, achievements, certifications } = req.body;

    // Create a new Achievement document
    const newAchievement = new Achievement({
      fullName,
      dob,
      email,
      phone,
      address,
      regNumber,
      skills,
      achievements,
      certifications
    });

    // Save the new Achievement document to the database
    await newAchievement.save();

    res.status(201).json(newAchievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// display achievements in form 
app.get('/api/achievements/:regNumber', async (req, res) => {
  try {
      const achievement = await Achievement.findOne({ regNumber: req.params.regNumber });
      if (!achievement) {
          return res.status(404).json({ error: 'Achievement not found' });
      }
      res.status(200).json(achievement);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});





app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
