console.log("Hello World");

// this is reading the ID from the HTML document
const viz = document.getElementById("tableauViz");

let workbook;
let visActiveSheet;
let dashboard;
let listSheets;

// The sheets we want to filter
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// to make our job easier, we are going to log all the information about the workbook.
function logWorkbookInformation() {
  // Get workbook
  workbook = viz.workboook;
  console.log(`The workbook name is: "${workbook.name}"`);

  // Get the array of dashboards and stand alone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    console.log(`The sheets with index [${index}] is: "${element.name}"`);
  });

  // We are normally only interested in interacting with the active sheet (tab), so lets get that
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet is "${vizActiveSheet.name}"`);

  // List all of the worksheets within the active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    worksheetName = element.name;
    console.log(`The worksheet with index [${index}] is: "${worksheetName}"`);
  });

  // Assign sheets to the variables created at the top of the script
  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

// Log the workbook information once the viz has become interactive
// First looking at viz, then listen for something to happen.
// It's listening for it to become interactive
// Once it has become interactive, read the workbookinformation.
viz.addEventListener("firstinteractive", logWorkbookInformation);

// Let JS find the buttons
const oregonAndWashingtonButton = document.getElementById(
  "oregon_and_washington"
);
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

// Create functions to call when button is clicked
function OandWfunction() {
  //Log what's pressed
  console.log(oregonAndWashingtonButton.value);

  //Apply the filter to all of the sheets
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

// Wait for click of button
oregonAndWashingtonButton.addEventListener("click", OandWfunction);
