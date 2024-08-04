// Your code here
// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Function to create multiple employee records
function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord);
}

// Function to add a time-in event to an employee record
function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  });
  return employeeRecord;
}

// Function to add a time-out event to an employee record
function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  });
  return employeeRecord;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
  const hours = hoursWorkedOnDate(employeeRecord, date);
  return hours * employeeRecord.payPerHour;
}

// Function to calculate total wages earned for all dates
function allWagesFor(employeeRecord) {
  const dates = employeeRecord.timeInEvents.map(event => event.date);
  return dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
}

// Function to calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
}

// Testing the implementation
if (require.main === module) {
  const employeeRecords = createEmployeeRecords([
    ["John", "Doe", "Manager", 25],
    ["Jane", "Smith", "Developer", 30]
  ]);

  createTimeInEvent(employeeRecords[0], "2024-08-01 0900");
  createTimeOutEvent(employeeRecords[0], "2024-08-01 1700");
  createTimeInEvent(employeeRecords[1], "2024-08-01 1000");
  createTimeOutEvent(employeeRecords[1], "2024-08-01 1800");

  console.log("John Doe's wages for 2024-08-01:", wagesEarnedOnDate(employeeRecords[0], "2024-08-01"));
  console.log("Jane Smith's wages for 2024-08-01:", wagesEarnedOnDate(employeeRecords[1], "2024-08-01"));
  console.log("Total payroll:", calculatePayroll(employeeRecords));
}

module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  calculatePayroll
};
