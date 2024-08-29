function openLiftPage(){
    
    let totalFloor = document.getElementById("totalFloor").value;
    let totalLift = document.getElementById(
        "totalLift"
    ).value;

    if(totalFloor < 1 || totalLift < 1){
        alert("You should have mimimum 1 floor and 1 lift")
        return
    }

    sessionStorage.setItem('totalFloor',  totalFloor);
    sessionStorage.setItem('totalLift',  totalLift);

    window.location.href ="lift.html"
}