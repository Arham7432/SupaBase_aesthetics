import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ifzzsotblxyxneozztvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmenpzb3RibHh5eG5lb3p6dHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3OTExMDgsImV4cCI6MjA1MjM2NzEwOH0.TBd80MjgNQw5WPaysnzRDj08ob9QT4EzkfClWJ4FO48';
const supabase = createClient(supabaseUrl, supabaseKey);

const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const signUpBtn = document.querySelector('#signUpBtn');

// 🖖🏻 SignUp Handler 🖖🏻
const handleSignUp = async (event) => {
    var signUpName = name.value;
    event.preventDefault();

    const signUpEmail = email.value;
    const signUpPassword = password.value;

    if (signUpName && signUpEmail && signUpPassword) {
        const { user, error } = await supabase.auth.signUp({
            email: signUpEmail,
            password: signUpPassword
        });

        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
                color: 'gainsboro',
                border: '1px solid red',
                confirmButtonColor: '#006239',
                heightAuto: false,
                focusConfirm: false
            });
        } else {

            //localStorage mai name save karao Babluu 🍗
            localStorage.setItem('displayName', signUpName);

            Swal.fire({
                icon: 'success',
                title: 'Sign Up Successful!',
                text: 'An email has been sent for confirmation. Please check your inbox.',
                color: 'gainsboro',
                border: '1px solid red',
                confirmButtonColor: '#006239',
                heightAuto: false,
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'login.html'; 
                }
            });
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Please fill all fields!',
            text: 'Make sure to complete all fields before submitting.',
            color: 'gainsboro',
            border: '1px solid red',
            confirmButtonColor: '#006239',
            heightAuto: false,
            focusConfirm: false
        });
    }
};

if (signUpBtn) {
    signUpBtn.addEventListener('click', handleSignUp);
}

// 🖖🏻 Login Handler 🖖🏻
const emailTagLoginPage = document.querySelector('#email-new');
const passTagLoginPage = document.querySelector('#password-new');
const loginBtn = document.querySelector('#loginBtn-new');

// Login handler function
const handleLogin = async (event) => {
    event.preventDefault();

    const loginEmail = emailTagLoginPage.value;
    const loginPassword = passTagLoginPage.value;

    if (loginEmail && loginPassword) {
        const { user, error } = await supabase.auth.signInWithPassword({
            email: loginEmail,
            password: loginPassword,
        });

        if (error) {
            if (error.message.includes('Email not confirmed')) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Email Not Confirmed',
                    text: 'Please check your email and confirm your account.',
                    color: 'gainsboro',
                    border: '1px solid red',
                    confirmButtonColor: '#006239',
                    heightAuto: false,
                    focusConfirm: false
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                    color: 'gainsboro',
                    border: '1px solid red',
                    confirmButtonColor: '#006239',
                    heightAuto: false,
                    focusConfirm: false
                });
            }
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome back!',
                color: 'gainsboro',
                border: '1px solid red',
                confirmButtonColor: '#006239',
                heightAuto: false,
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'homePage.html'; // Redirect after login
                }
            });
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Please fill all fields!',
            text: 'Make sure to complete all fields before submitting.',
            color: 'gainsboro',
            border: '1px solid red',
            confirmButtonColor: '#006239',
            heightAuto: false,
            focusConfirm: false
        });
    }
};

if (loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
}

// 🖖🏻 Display Name 🖖🏻
let displayName = document.querySelector('#displayName');

if (displayName) {
    const storedName = localStorage.getItem('displayName');
    if (storedName) {
        displayName.innerHTML = storedName; 
    } else {
        displayName.innerHTML = 'Welcome, Guest'; 
    }
}

