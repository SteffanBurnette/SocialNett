// script.js

document.getElementById('preferencesForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get selected values
    var age = document.getElementById('age').value;
    // Get other selected values similarly for weight, height, gender, smokes, and drinks
    
    // Perform further processing or send data to backend
    console.log('Age:', age);
});
