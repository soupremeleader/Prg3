let main = document.getElementById("main");

console.log(localStorage);
for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === "randid") {
        localStorage.removeItem("randid");
    }

    let div = document.createElement("div");
    let stationFrom = localStorage.key(i);
    let stationTo = localStorage.getItem(stationFrom);

    div.innerHTML = `<span class="from_text">van:</span> ${stationFrom} <br/> <span class="to_text">naar:</span> ${stationTo}`;
    div.classList.add("favourite_text");
    if (i % 2 === 0) {
        div.classList.add("purple");
    }
    main.appendChild(div);
}
