frontend only authentication system built using React + Vite , javascript

styled using Material UI (MUI) along with Tailwind CSS for custom UI enhancements

No backend or API integration  authentication is handled completely on the client-side

A utils folder is created inside src containing an auth.js file with all authentication helper functions

LocalStorage is used to store

a randomly generated token upon login

includes functions for: setting, getting, and clearing auth token , Storing & retrieving user detailsChecking login authentication status authFetch() helper for authenticated API calls in future (attaches Bearer token)

authentication Features ;-

client-side authentication using LocalStorage (no server interaction).

Random token generation using Math.random().toString(36).slice(2).

Protected routes implemented using isAuthenticated() to prevent access without login.

Clears token & user data from LocalStorage for logout

Validation Features

Username Validation;-

Must be 3–8 characters only

Must be alphanumeric (A–Z, a–z, 0–9 only)


Password Validation ;-

Password must include all of the following:

Minimum 8 characters

At least 1 uppercase letter (A–Z)

At least 1 lowercase letter (a–z)

At least 1 number (0–9)

At least 1 special character (!@#$% etc)

Confirm Password

UI/UX Features :-


Used Material UI components for form UI & styling

Password Eye Toggle Button for both Login & Signup to show/hide password

Error feedback using react-toastify for clean popup notifications

Clean & centered form UI with MUI + Tailwind styling
# login-singup
