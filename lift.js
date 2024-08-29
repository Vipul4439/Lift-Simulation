

var totalFloor = sessionStorage.getItem("totalFloor");
var totalLift = sessionStorage.getItem("totalLift");


const lifts = Array.from({ length: totalLift }, (_, index) => ({
  id: `lift-${index}`,
  currentFloor: 0,       
  direction: null,       
  isMoving: false,
  busy: false        
}));

function render() {
  let mainDiv = document.getElementById("liftMainDiv");
  mainDiv.style.width = 38.9 * totalLift * 3.5 + "px";

  for (let i = totalFloor; i >= 0; i--) {
    let createFloors = document.createElement("div");
    createFloors.innerHTML = `Floor-${i}`;
    mainDiv.append(createFloors);
    createFloors.setAttribute("id", `floor-${i}`);
    createFloors.setAttribute("class", "allfloors");
    createFloors.style.marginTop = 10 + "px";
    createFloors.style.borderBottom = "5px solid #F88C00";
    createFloors.style.boxSizing = "border-box";
    createFloors.style.background = "yellow";
    createFloors.style.height = "90px";
    createFloors.style.width = "100%";
    createFloors.style.display = "flex";
    createFloors.style.position = "relative";
    createFloors.style.justifyContent = "space-between";

    if (i === 0) {
      for (let j = 0; j < totalLift; j++) {
        let liftDiv = document.createElement("div");
        liftDiv.setAttribute("id", `lift-${j}`);
        liftDiv.setAttribute("class", "allLifts");
        liftDiv.style.position = "absolute";
        liftDiv.style.width = "80px";
        liftDiv.style.height = "85px";
        liftDiv.style.left = j * (80 + 20) + "px"; // Adjust position
        liftDiv.style.background = "transparent"; // Transparent background for the lift container
        liftDiv.style.bottom = "0px"; 

        
        let leftDoor = document.createElement("div");
        leftDoor.setAttribute("class", "door left");
        let rightDoor = document.createElement("div");
        rightDoor.setAttribute("class", "door right");
        let innerDoorLeft = document.createElement("div")
        innerDoorLeft.setAttribute("class", "door-inner")
        let innerDoorRight = document.createElement("div")
        innerDoorRight.setAttribute("class", "door-inner")
      
        leftDoor.append(innerDoorLeft)
        rightDoor.append(innerDoorRight)

        liftDiv.appendChild(leftDoor);
        
        liftDiv.appendChild(rightDoor);
        createFloors.appendChild(liftDiv);
      }
    }

    let buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", "btndiv");
    createFloors.append(buttonDiv);

    if (i !== totalFloor) { // Don't add the "Up" button on the top floor
      let createUpButton = document.createElement("button");
      createUpButton.innerHTML = "Up";
      createUpButton.setAttribute("class", "UpBtn");
      createUpButton.setAttribute("id", `upbtn-${i}`);
      buttonDiv.append(createUpButton);
    }

    if (i !== 0) { // Don't add the "Down" button on the ground floor
      let createDownButton = document.createElement("button");
      createDownButton.innerHTML = "Down";
      createDownButton.setAttribute("class", "DownBtn");
      createDownButton.setAttribute("id", `downbtn-${i}`);
      buttonDiv.append(createDownButton);
    }
  }

  const btns = document.querySelectorAll(".UpBtn");
  const downBtns = document.querySelectorAll(".DownBtn");

  for (let i = btns.length - 1; i >= 0; i--) {
    const btn = btns[i];

    btn.addEventListener("click", (event) => {
      const clickedId = event.currentTarget.id;
      const currentFloor = clickedId.split("-")[1];
      handleButtonPress(currentFloor, 'up')
    });
  }

  for (let i = downBtns.length - 1; i >= 0; i--) {
    const down = downBtns[i];

    down.addEventListener("click", (event) => {
      const clickedId = event.currentTarget.id;
      const currentFloor = clickedId.split("-")[1];
      handleButtonPress(currentFloor, 'up')
    });
  }
}

function isLiftGoingToStopBeforeTarget(lift, targetFloor) {
  
  if (lift.direction === 'up' && lift.currentFloor < targetFloor) {
      return true;
  }
  if (lift.direction === 'down' && lift.currentFloor > targetFloor) {
      return true;
  }
  return false;
}

function getNearestAvailableLift(targetFloor, direction) {
  let nearestLift = null;
  let minimumDistance = Infinity;

  lifts.forEach(lift => {
    const distance = Math.abs(lift.currentFloor - targetFloor);
    
    if ((!lift.isMoving && !lift.busy && lift.currentFloor !== targetFloor) ||
        (lift.direction === direction && isLiftGoingToStopBeforeTarget(lift, targetFloor))) {
      if (distance < minimumDistance) {
        minimumDistance = distance;
        nearestLift = lift;
      }
    }
  });

  return nearestLift;
};




function handleButtonPress(targetFloor, direction) {
  const nearestLift = getNearestAvailableLift(targetFloor, direction);
  if (nearestLift) {
      moveLiftToFloor(nearestLift, targetFloor);
  } else {
      console.log('No available lift found.');
  }
}

function moveLiftToFloor(lift, targetFloor) {
  lift.isMoving = true;
  lift.busy = true;
  lift.direction = targetFloor > lift.currentFloor ? 'up' : 'down';

  const liftElement = document.getElementById(lift.id);
  const floorHeight = 100; 
  
  liftElement.style.transition = `bottom 2s`; 
  liftElement.style.bottom = targetFloor * floorHeight + "px";

  const moveDuration = 2000 * Math.abs(lift.currentFloor - targetFloor); // Move duration (2 seconds per floor)


  setTimeout(() => {
    
    lift.currentFloor = targetFloor;
    lift.isMoving = false;
    lift.direction = null;
    
   
    const leftDoorInner = liftElement.querySelector('.door.left .door-inner');
    const rightDoorInner = liftElement.querySelector('.door.right .door-inner');
    
    leftDoorInner.style.transition = 'transform 2.5s'; 
    rightDoorInner.style.transition = 'transform 2.5s'; 
    
    leftDoorInner.style.transform = 'translateX(-100%)'; 
    rightDoorInner.style.transform = 'translateX(100%)'; 
    
    
    
    setTimeout(() => {
      leftDoorInner.style.transition = 'transform 2.5s'; 
      rightDoorInner.style.transition = 'transform 2.5s'; 
      
      leftDoorInner.style.transform = 'translateX(0)'; 
      rightDoorInner.style.transform = 'translateX(0)';
      lift.busy = false;
     
    }, 2500); 

  }, moveDuration); 

 
}


