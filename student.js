// Display student info if signed in
const savedRegNo = localStorage.getItem('studentRegNo');
const studentInfoElement = document.getElementById('studentInfo');

if (savedRegNo) {
    studentInfoElement.textContent = 'Welcome, Student ' + savedRegNo;
    console.log('Saved Registration Number:', savedRegNo);
} else {
    studentInfoElement.textContent = 'No registration number found. User might not be signed in.';
    console.log('No registration number found. User might not be signed in.');
}

// Handle sign-out button click
const signOutButton = document.getElementById('signOutButton');
signOutButton.addEventListener('click', () => {
    // Remove the registration number from localStorage
    localStorage.removeItem('studentRegNo');
    console.log('Student signed out, registration number removed.');
alert('student sign out');
    // Optionally, redirect to the sign-in page
    window.location.href = 'login.html';  // Replace 'index.html' with your sign-in page URL
});


//code to get data 
// Ensure the DOM is fully loaded before attaching event handlers
document.addEventListener('DOMContentLoaded', () => {
    const knowMarksBtn = document.getElementById('knowMarksBtn');
    const regNumberInput = document.getElementById('regNumber');
    const subject1Input = document.getElementById('subject1');
    const subject2Input = document.getElementById('subject2');
    const subject3Input = document.getElementById('subject3');
    const subject4Input = document.getElementById('subject4');
    const subject5Input = document.getElementById('subject5');
    const subject6Input = document.getElementById('subject6');
  
    knowMarksBtn.addEventListener('click', async (event) => {
      event.preventDefault();
  
      // Get the saved registration number from localStorage
      const savedRegNo = localStorage.getItem('studentRegNo');
      if (!savedRegNo) {
        alert('No registration number found. Please sign in first.');
        return;
      }
  
      try {
        // Fetch the student's marks from the backend
        const response = await fetch(`http://localhost:3000/api/marks/${savedRegNo}`);
        if (response.ok) {
          const marks = await response.json();
  
          // Populate the marks form with the fetched data
          regNumberInput.value = marks.regNumber;
          subject1Input.value = marks.subject1;
          subject2Input.value = marks.subject2;
          subject3Input.value = marks.subject3;
          subject4Input.value = marks.subject4;
          subject5Input.value = marks.subject5;
          subject6Input.value = marks.subject6;
  
          console.log('Marks data loaded successfully');
          alert('Marks data loaded successfully');
        } else {
          const errorMessage = await response.text();
          console.error('Failed to load marks:', errorMessage);
          alert('Failed to load marks: ' + errorMessage);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        alert('An error occurred while fetching marks. Please try again later.');
      }
    });
  });
  