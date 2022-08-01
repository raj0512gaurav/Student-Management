// 2. Local Storage
// 5. Add a scroll bar to the view
// 6. 2 pages site

class Student {
    constructor(registrationNumber, name, dob, emailId, department, cgpa) {
        this.name = name;
        this.dob = dob;
        this.emailId = emailId;
        this.department = department;
        this.registrationNumber = registrationNumber;
        this.cgpa = cgpa;
    }
}

class Display {
    validate(student) {
        if (student.name.length < 3 || !student.dob || student.emailId.length < 3 || student.registrationNumber.length < 3) {
            return false;
        }
        else {
            return true;
        }
    }

    add(student) {
        let tableBody = document.getElementById('tbody');
        let tableString = ` <tr class="tableRow">
                                <td>${student.registrationNumber}</td>
                                <td>${student.name}</td>
                                <td>${student.dob}</td>
                                <td>${student.emailId}</td>
                                <td>${student.department}</td>
                                <td>${student.cgpa}</td>
                                <td>
                                    <button type="button" class="delete btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                                </td>
                            </tr>`;
        tableBody.innerHTML += tableString;
    }

    showAlert(type, message) {
        let msg = document.getElementById('alertMsg');
        msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${message}.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`

        setTimeout(() => {
            msg.innerHTML = '';
        }, 4000);
    }
}

//Add student event listener
let studentForm = document.getElementById('studentForm');
studentForm.addEventListener('submit', addStudent);

function addStudent(e) {
    e.preventDefault();

    let name = document.getElementById('studentName').value;
    let dob = document.getElementById('dob').value;
    let emailId = document.getElementById('emailId').value;
    let computerScience = document.getElementById('computerScience');
    let electricalEngineering = document.getElementById('electricalEngineering');
    let metallurgicalEngineering = document.getElementById('metallurgicalEngineering');
    let department;
    if (computerScience.checked) {
        department = computerScience.value;
    }
    else if (electricalEngineering.checked) {
        department = electricalEngineering.value;
    }
    else if (metallurgicalEngineering.checked) {
        department = metallurgicalEngineering.value;
    }
    let registrationNumber = document.getElementById('registrationNumber').value;
    let cgpa = document.getElementById('cgpa').value;

    let student = new Student(registrationNumber, name, dob, emailId, department, cgpa);

    let display = new Display();
    if (display.validate(student)) {
        display.showAlert('success', 'Student has been added successfully');
        display.add(student);
        studentForm.reset();
    }
    else {
        display.showAlert('danger', `Student can't be added`);
    }

}

//Edit or delete option
let tableBody = document.getElementById('tbody');
tableBody.addEventListener('click', editDelete);
function editDelete(e) {
    const item = e.target;
    if (item.classList[0] === 'delete') {
        item.parentElement.parentElement.remove();
    }
}

//Search Student
let searchName = document.getElementById('searchName');
let tableRow = document.getElementsByClassName('tableRow');
searchName.addEventListener('input', () => {
    Array.from(tableRow).forEach(function (element) {
        let text = element.getElementsByTagName('td')[1].innerText;
        if(text.toLowerCase().includes(searchName.value.toLowerCase())){
            element.style.display = "";
        }
        else{
            element.style.display = "none";
        }
    });
})

let searchReg = document.getElementById('searchReg');
searchReg.addEventListener('input', () => {
    Array.from(tableRow).forEach(function (element) {
        let text = element.getElementsByTagName('td')[0].innerText;
        if(text.toLowerCase().includes(searchReg.value.toLowerCase())){
            element.style.display = "";
        }
        else{
            element.style.display = "none";
        }
    });
})

let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
})