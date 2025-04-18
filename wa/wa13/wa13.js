// Problem 1
const employeeJSON = {
    employees: [
        {
            firstName: "Sam",
            department: "Tech",
            designation: "Manager",
            salary: 40000,
            raiseEligible: true
        },
        {
            firstName: "Mary",
            department: "Finance",
            designation: "Trainee",
            salary: 18500,
            raiseEligible: true
        },
        {
            firstName: "Bill",
            department: "HR",
            designation: "Executive",
            salary: 21200,
            raiseEligible: false
        }
    ]
};
console.log("Problem 1. Employee JSON: ", employeeJSON);

// Problem 2
const companyJSON = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employeeJSON.employees
};
console.log("Problem 2. Company JSON: ", companyJSON);

// Problem 3
function addNewEmployee(companyJSON, firstName, department, designation, salary, raiseEligible) {
    const newEmployee = {
        firstName: firstName,
        department: department,
        designation: designation,
        salary: salary,
        raiseEligible: raiseEligible
    };
companyJSON.employees.push(newEmployee);
};
addNewEmployee(companyJSON, "Anna", "Tech", "Executive", 25600, false);
console.log("Problem 3. New employee: ", employeeJSON, companyJSON);

// Problem 4
function getTotalSalary(companyJSON) {
    let totalSalary = 0;
    for (let i = 0; i < companyJSON.employees.length; i++) {
        totalSalary += companyJSON.employees[i].salary;
    }
    return totalSalary;
};
console.log("Problem 4. Total salaries of employees: ", getTotalSalary(companyJSON));

// Problem 5
function raise(companyJSON) {
    for(let i = 0; i < companyJSON.employees.length; i++) {
        if(companyJSON.employees[i].raiseEligible) {
            companyJSON.employees[i].salary *= 1.1;
            companyJSON.employees[i].raiseEligible = false;
        }
    }
};
raise(companyJSON);
console.log("Problem 5. Raise-eligible employees and new salaries: ", companyJSON);

// Problem 6
function whoWFh(companyJSON, employeeNames) {
    companyJSON.wfh = employeeNames;
    for(let i = 0; i < companyJSON.employees.length; i++) {
        if(companyJSON.wfh.includes(companyJSON.employees[i].firstName)) {
            companyJSON.employees[i].wfh = true;
        }
        else {
            companyJSON.employees[i].wfh = false;
        }
    }
};
whoWFh(companyJSON, ['Sam', 'Anna']);
console.log("Problem 6. Employees working from home: ", companyJSON);