let body = document.getElementById("favoritedStations");

console.log(localStorage);

for (let i = 0; i < localStorage.length; i++) {

    let a = document.createElement("a");
    let stationName = localStorage.key(i);
    let stationId = localStorage.getItem(stationName);
    a.href = `stationmap.php?id=${stationId}`;

    let section = document.createElement("section");

    a.appendChild(section);
    a.classList.add("linkStation");
    section.innerHTML = stationName;
    body.appendChild(a);
}