// import functions and grab DOM elements
import { redirectIfLoggedIn, signInUser, signUpUser } from './fetch-utils.js';
const signUpForm = document.getElementById('sign-up');
const signInForm = document.getElementById('sign-in');
// let state

// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(signUpForm);
    await signUpUser({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),  
        email: formData.get('email'),
        password: formData.get('password')
      
    });
});


signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(signInForm);
    await signInUser({
        email: formData.get('email'),
        password: formData.get('password')
    });
});

redirectIfLoggedIn();