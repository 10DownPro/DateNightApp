function addToStorage(i){

    if (!localStorage.schedule) {
        localStorage.setItem("schedule", "[]")
        let schedule = localStorage.schedule;
        console.log(schedule);
        let tempschedule = JSON.parse(schedule);
        console.log(tempschedule);
        tempschedule.push(resultArr[i]);
        localStorage.schedule = JSON.stringify(tempschedule);
    }
    else {
        let schedule = localStorage.schedule;
        console.log(schedule);
        let tempschedule = JSON.parse(schedule);
        console.log(tempschedule);
        tempschedule.push(restArr[i]);
        localStorage.schedule = JSON.stringify(tempschedule);
    }
};


document.getElementsByClassName("timeSlot")

function drop() {
    const target = document.getElementsByClassName("dropZone");
target.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();
}, false);

    
}

target.addEventListener("drop", (event) => {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged element to the selected drop target
    if (event.target.classList.contains("dropzone")) {
      event.target.classList.remove("dragover");
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
    }
  });
// function start(){  
//   row = event.target; 
// }
// function dragover(){
//   let e = event;
//   e.preventDefault(); 
  
//   let children= Array.from(e.target.parentNode.parentNode.children);
  
//   if(children.indexOf(e.target.parentNode)>children.indexOf(row))
//     e.target.parentNode.after(row);
//   else
//     e.target.parentNode.before(row);
// }