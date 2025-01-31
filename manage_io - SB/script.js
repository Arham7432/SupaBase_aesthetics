// Import Supabase library
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize Supabase client
const supabaseUrl = "https://ifzzsotblxyxneozztvy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmenpzb3RibHh5eG5lb3p6dHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3OTExMDgsImV4cCI6MjA1MjM2NzEwOH0.TBd80MjgNQw5WPaysnzRDj08ob9QT4EzkfClWJ4FO48";
const supabase = createClient(supabaseUrl, supabaseKey);




document.addEventListener('DOMContentLoaded', () => {
    const newDataBtn = document.querySelector('#new-data-btn');
    const submitData = document.querySelector('#add_Data');
    const crudFormCont = document.querySelector('#crud-form-cont');
    const theCrudForm = document.querySelector('#crud-form');
    const resultPage = document.querySelector('#result-cont');
    const shield = document.querySelector('#shield');
    const cross = document.querySelector('#cross');
    const nameBar = document.querySelector('#crud-name');
    const emailBar = document.querySelector('#crud-email');
    const rollBar = document.querySelector('#roll-no');
    const wtrmrkCont = document.querySelector('#wtrmrk-cont');
    const submitEditedData = document.querySelector('#edit_Data');

    let reveal = document.querySelector('#reveal')
    let load = document.querySelector('#load')

    submitEditedData.style.display = 'none';


    newDataBtn.addEventListener('click', () => {
        setTimeout(() => {
            submitEditedData.style.display = 'none';
            submitData.style.display = 'block';
            crudFormCont.style.position = "absolute";
            crudFormCont.style.display = "flex";
            resultPage.style.filter = "blur(6px)";
            shield.style.display = "block";
        }, 100);

        nameBar.value = "";
        emailBar.value = "";
        rollBar.value = "";
    });

    cross.addEventListener('click', () => {
        crudFormCont.style.display = 'none';
        resultPage.style.filter = "blur(0px)";
        shield.style.display = "none";

        // setTimeout(() => {
        nameBar.value = "";
        emailBar.value = "";
        rollBar.value = "";
        // }, 2000);
    });

    submitData.addEventListener('click', async (event) => {
        event.preventDefault();

        if (nameBar.value != "" && emailBar.value != "" && rollBar.value != "") {
            reveal.style.display = 'none'
            load.classList.remove('none')
    }

        if (wtrmrkCont) {
            wtrmrkCont.style.display = 'none';
        }

        if (rollBar.value.length === 5) {
            setTimeout(() => {
                crudFormCont.style.display = 'none';
                resultPage.style.filter = "blur(0px)";
                shield.style.display = "none";
                location.reload()
            }, 2000);

            const { data, error } = await supabase
                .from('students')
                .insert([{ name: nameBar.value, email: emailBar.value, roll_no: rollBar.value }]);

            if (error) {
                console.error('Error inserting data:', error);
            } else {
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Student Added!',
                        text: 'Student has been added successfully.',
                        color: 'gainsboro',
                        confirmButtonColor: '#006239',
                        heightAuto: false,
                        focusConfirm: false
                    });
                }, 3000);
                displayStudentData();
            }

            // setTimeout(() => {
            // nameBar.value = "";
            // emailBar.value = "";
            // rollBar.value = "";
            // }, 800);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: "Roll Number's length must be 5",
                color: 'gainsboro',
                confirmButtonColor: '#006239',
                heightAuto: false,
                focusConfirm: false
            });
        }
    });

    document.querySelector('#each-data-cont').addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('delete-btn')) {
            const rollNo = e.target.closest('.each-data').querySelector('.roll-no').textContent;
            deleteData(rollNo);
        }

        if (e.target && e.target.classList.contains('edit')) {
            let studentCard = e.target.closest('.each-data');
            let name = studentCard.querySelector('.name').textContent;
            let email = studentCard.querySelector('.email').textContent;
            let rollNo = studentCard.querySelector('.roll-no').textContent;

            nameBar.value = name;
            emailBar.value = email;
            rollBar.value = rollNo;
            rollBar.setAttribute('data-original-roll', rollNo);

            crudFormCont.style.position = "absolute";
            crudFormCont.style.display = "flex";
            resultPage.style.filter = "blur(6px)";
            shield.style.display = "block";

            submitData.style.display = "none";
            submitEditedData.style.display = "block";
        }
    });

    submitEditedData.addEventListener('click', async (event) => {
        event.preventDefault();
        let updatedName = nameBar.value;
        let updatedEmail = emailBar.value;
        let updatedRollNo = rollBar.value;
        let originalRollNo = rollBar.getAttribute('data-original-roll');

        if (updatedRollNo.length === 5) {
            const { data, error } = await supabase
                .from('students')
                .update({ name: updatedName, email: updatedEmail, roll_no: updatedRollNo })
                .eq('roll_no', originalRollNo);

            if (error) {
                console.error('Error updating student:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: "Failed to update student",
                    color: 'gainsboro',
                    confirmButtonColor: '#006239',
                    heightAuto: false,
                    focusConfirm: false
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Changes made',
                    text: 'Details updated successfully!',
                    color: 'gainsboro',
                    confirmButtonColor: '#006239',
                    heightAuto: false,
                    focusConfirm: false
                });
                crudFormCont.style.display = 'none';
                resultPage.style.filter = "blur(0px)";
                shield.style.display = "none";
                displayStudentData();
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: `Roll Number's length must be 5`,
                icon: 'error',
                background: '#111',
                color: '#fff',
                confirmButtonColor: 'rgb(0 98 57)',
                backdrop: false,
            });
        }
    });

    async function displayStudentData() {
        const { data, error } = await supabase
            .from('students')
            .select('*');

        if (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Failed to load student data",
                color: 'gainsboro',
                confirmButtonColor: '#006239',
                heightAuto: false,
                focusConfirm: false
            });
        } else {
            const studentContainer = document.querySelector('#each-data-cont');
            studentContainer.innerHTML = '';

            data.forEach(student => {
                const studentHTML = `
                    <div class="each-data">
                        <div class="name">${student.name}</div>
                        <div class="line"></div>
                        <div class="email">${student.email}</div>
                        <div class="line"></div>
                        <div class="roll-no">${student.roll_no}</div>
                        <div class="line"></div>
                        <div class="edit">Edit</div>
                        <div class="line"></div>
                        <div class="delete delete-btn">Delete</div>
                    </div>
                `;
                studentContainer.innerHTML += studentHTML;
            });
        }
    }

    async function deleteData(rollNo) {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this student?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "crimson",
            cancelButtonColor: "transparent",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            heightAuto: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data, error } = await supabase
                    .from("students")
                    .delete()
                    .eq("roll_no", rollNo);

                if (error) {
                    console.error("Error deleting student:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to delete account",
                        color: "gainsboro",
                        confirmButtonColor: "#006239",
                        heightAuto: false,
                        focusConfirm: false
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Deletion Success",
                        text: "Entry deleted successfully!",
                        color: "gainsboro",
                        confirmButtonColor: "#006239",
                        heightAuto: false,
                        focusConfirm: false
                    });

                 
                    displayStudentData();
                }
            }
        });
    }


    displayStudentData();
    
});
