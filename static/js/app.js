// from data.js
var tableData = data;

var tbody = d3.select("tbody");
var dateInput = d3.select("#datetime");
var filterButton = d3.select("#filter-btn");
var resetButton = d3.select("#reset-btn");

function clear() {
    var rows = tbody.selectAll("tr");
    rows.remove();
};

function populate(x) {
    clear();
    x.forEach((ufo) => {
        var row = tbody.append("tr");
        Object.values(ufo).forEach(value => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};

function filter() {
    
    var userInput = dateInput.property("value");
    var filteredCopy = data;
    filteredCopy = filteredCopy.filter(filteredCopy => filteredCopy.datetime == userInput);
    clear();

    if (userInput) {
        if (filteredCopy.length != 0) {
            populate(filteredCopy);
        }   else {
            tbody.append("tr").append("td").text("Please Try Another Date, Human.");
        }
    }   else {
        tbody.append("tr").append("td").text("Please Enter A Date, Human.");
    } 

};


populate(tableData);

resetButton.on("click", () => {
    d3.event.preventDefault();
    dateInput.property("value","");
    populate(tableData);
});

filterButton.on("click", () => {
   d3.event.preventDefault();
   filter() 
});

