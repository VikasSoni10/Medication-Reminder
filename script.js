const setReminderButton = document.getElementById("set-reminder-btn");
setReminderButton.addEventListener("click", function() {
  const medicationCheckboxes = document.getElementsByName("medication");
  const selectedMedications = [];
  for (let i = 0; i < medicationCheckboxes.length; i++) {
    if (medicationCheckboxes[i].checked) {
      selectedMedications.push(medicationCheckboxes[i].value);
    }
  }
  const reminderTimeInput = document.getElementsByName("reminder-time")[0];
  const reminderTime = reminderTimeInput.value;
  const reminderMessage = document.getElementById("reminder-message");
  if (selectedMedications.length === 0) {
    reminderMessage.innerHTML = "Please select at least one medication";
    return;
  }
  if (reminderTime === "") {
    reminderMessage.innerHTML = "Please select a reminder time";
    return;
  }
  const medicationTableBody = document.getElementById("medication-table").getElementsByTagName("tbody")[0];
  const newRow = medicationTableBody.insertRow();
  const medicationCell = newRow.insertCell(0);
  const reminderTimeCell = newRow.insertCell(1);
  medicationCell.innerHTML = selectedMedications.join(", ");
  reminderTimeCell.innerHTML = reminderTime;
  const intervalId = setInterval(function() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const currentTimeString = `${hours}:${minutes}`;
    if (currentTimeString === reminderTime) {
      clearInterval(intervalId);
      alert(`Time to take your ${selectedMedications.join(", ")}`);
    }
  }, 1000);
  reminderMessage.innerHTML = `Reminder set for ${selectedMedications.join(", ")} at ${reminderTime}`;
});
