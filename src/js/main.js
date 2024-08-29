function openLiftPage(){
    
    let totalFloor = document.getElementById("totalFloor").value;
    let totalLift = document.getElementById(
        "totalLift"
    ).value;

    sessionStorage.setItem('totalFloor',  totalFloor);
    sessionStorage.setItem('totalLift',  totalLift);

    window.location.href ="lift.html"
}