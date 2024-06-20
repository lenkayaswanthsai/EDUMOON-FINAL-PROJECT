// script.js (Frontend JavaScript)

// Function to show student modal
document.getElementById('studentBtn').addEventListener('click', function() {
  document.getElementById('studentModal').style.display = 'flex';
});

// Function to show admin modal
document.getElementById('adminBtn').addEventListener('click', function() {
  document.getElementById('adminModal').style.display = 'flex';
});

// Function to close student modal
document.getElementById('studentClose').addEventListener('click', function() {
  document.getElementById('studentModal').style.display = 'none';
});

// Function to close admin modal
document.getElementById('adminClose').addEventListener('click', function() {
  document.getElementById('adminModal').style.display = 'none';
});

// Function to close modals when clicking outside
window.addEventListener('click', function(event) {
  if (event.target.className === 'modal') {
    document.getElementById('studentModal').style.display = 'none';
    document.getElementById('adminModal').style.display = 'none';
    document.getElementById('studentSignUpModal').style.display = 'none';
    document.getElementById('adminSignUpModal').style.display = 'none';
  }
});

// Function to show student signup modal and hide student signin modal
document.getElementById('studentRegisterLink').addEventListener('click', function() {
  document.getElementById('studentModal').style.display = 'none';
  document.getElementById('studentSignUpModal').style.display = 'flex';
});

// Function to show admin signup modal and hide admin signin modal
document.getElementById('adminRegisterLink').addEventListener('click', function() {
  document.getElementById('adminModal').style.display = 'none';
  document.getElementById('adminSignUpModal').style.display = 'flex';
});

// Function to close student signup modal
document.getElementById('studentSignUpClose').addEventListener('click', function() {
  document.getElementById('studentSignUpModal').style.display = 'none';
});

// Function to close admin signup modal
document.getElementById('adminSignUpClose').addEventListener('click', function() {
  document.getElementById('adminSignUpModal').style.display = 'none';
});

// Handle student sign-in form submission
const signinForm = document.getElementById('studentSignInForm');
signinForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const regNo = document.getElementById('studentRegNo').value.trim();
  const password = document.getElementById('studentPassword').value;
  const responseElement = document.getElementById('response');

  try {
    const response = await fetch('http://localhost:3000/api/student/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ regnumber: regNo, password })
    });

    if (response.ok) {
      console.log('Student sign-in successful');
      responseElement.textContent = 'Sign-in Successful.';
      alert('Sign-in Successful');

      // Save the registration number in localStorage
      localStorage.setItem('studentRegNo', regNo);

      // Redirect to the student page
      window.location.href = 'student.html';
    } else {
      const errorMessage = await response.text();
      console.error('Sign-in failed:', errorMessage);
      responseElement.textContent = 'Sign-in Failed: ' + errorMessage;
      alert('Sign-in failed. enter correct password or reg number');
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    responseElement.textContent = 'An error occurred during sign-in. Please try again later.';
    alert('An error occurred during sign-in. Please try again later.');
  }
});



// Handle admin sign-in form submission
const adminsigninForm = document.getElementById('adminSignInForm');
adminsigninForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const regNo = document.getElementById('adminRegNo').value.trim();
  const password = document.getElementById('adminPassword').value;
  const responseElement = document.getElementById('response');

  try {
    const response = await fetch('http://localhost:3000/api/admin/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ regnumber: regNo, password })
    });

    if (response.ok) {
      console.log('Admin sign-in successful');
      responseElement.textContent = 'Sign-in Successful.';
      alert('Sign-in Successful');
      window.location.href = 'admin_dashboard.html'; // Redirect to admin dashboard
    } else {
      const errorMessage = await response.text();
      console.error('Sign-in failed:', errorMessage);
      alert('Sign-in failed');
      responseElement.textContent = 'Sign-in Failed: ' + errorMessage;
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    responseElement.textContent = 'An error occurred during sign-in. Please try again later.';
    alert('An error occurred during sign-in. Please try again later.');
  }
});


// Student sign-up form submission
document.getElementById('studentRegisterForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('studentName').value;
  const regNo = document.getElementById('studentRegNoSignUp').value;
  const branch = document.getElementById('studentBranch').value;
  const password = document.getElementById('studentPasswordSignUp').value;
  const confirmPassword = document.getElementById('studentConfirmPassword').value;
  const responseElement = document.getElementById('response');

  if (password !== confirmPassword) {
    console.log('Passwords do not match.');
    alert('Passwords do not match.');
    responseElement.textContent = 'Passwords do not match.';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/student/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, regnumber: regNo, branch, password })
    });

    if (response.ok) {
      console.log('Signup successful');
      responseElement.textContent = 'Signup successful. Please log in.';
      
      alert('Signup successful');
    } else {
      const errorMessage = await response.text();
      console.error('Signup failed:', errorMessage);
      responseElement.textContent = 'Signup failed: ' + errorMessage;
      alert('Signup failed');
    }
  } catch (error) {
    console.error('Error during signup:', error);
    responseElement.textContent = 'An error occurred during signup. Please try again later.';
    alert('An error occurred during signup. Please try again later.');
  }
});

// Handle admin sign-up form submission
document.getElementById('adminRegisterForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('adminName').value.trim();
  const regNo = document.getElementById('adminRegNoSignUp').value.trim();
  const branch = document.getElementById('adminBranch').value.trim();
  const password = document.getElementById('adminPasswordSignUp').value;
  const confirmPassword = document.getElementById('adminConfirmPassword').value;
  const responseElement = document.getElementById('response');

  if (password !== confirmPassword) {
    console.log('Passwords do not match.');
    responseElement.textContent = 'Passwords do not match.';
    alert('Passwords do not match.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/admin/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name,  regnumber : regNo, branch, password })
    });

    if (response.ok) {
      console.log('Signup successful');
      responseElement.textContent = 'Signup successful. Please log in.';
      alert('Signup successful');
      form.reset();
    } else {
      const errorMessage = await response.text();
      console.error('Signup failed:', errorMessage);
      responseElement.textContent = 'Signup failed: ' + errorMessage;
      alert('Signup failed');
    }
  } catch (error) {
    console.error('Error during signup:', error);
    responseElement.textContent = 'An error occurred during signup. Please try again later.';
    alert('An error occurred during signup. Please try again later.');
  }
});
