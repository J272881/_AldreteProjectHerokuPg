// // Function to display results
// const displayResults = (result) => {
//   const divElement = document.getElementById("output");
//   // Reset output at each call
//   divElement.innerHTML = "";

//   if (result.trans === "Error") {
//     // Create h2 and paragraph elements and add to div
//     const h2Elem = document.createElement("h2");
//     h2Elem.innerText = "Application Error";
//     const paraElement = document.createElement("p");
//     paraElement.innerText = result.result;
//     // Add elements
//     divElement.appendChild(h2Elem);
//     divElement.appendChild(paraElement);
//   } else {
//     if (result.result.length === 0) {
//       // Create h3 and add to div
//       const h3Elem = document.createElement("h3");
//       h3Elem.innerText = "No Records found!";
//       divElement.appendChild(h3Elem);
//     } else {
//       // Create a table element and table header row
//       const tblElement = document.createElement("table");
//       const theadElement = document.createElement("thead");
//       const thRowElement = document.createElement("tr");
//       const thIdElement = document.createElement("td");
//       thIdElement.innerText = "ID";
//       const thFNameElement = document.createElement("td");
//       thFNameElement.innerText = "First Name";
//       const thLNameElement = document.createElement("td");
//       thLNameElement.innerText = "Last Name";
//       const thStateElement = document.createElement("td");
//       thStateElement.innerText = "State";
//       const thSalesElement = document.createElement("td");
//       thSalesElement.innerText = "Price";
//       const thPrevSalesElement = document.createElement("td");
//       thPrevSalesElement.innerText = "Price";
//       // Add elements
//       thRowElement.appendChild(thIdElement);
//       thRowElement.appendChild(thFNameElement);
//       thRowElement.appendChild(thLNameElement);
//       thRowElement.appendChild(thStateElement);
//       thRowElement.appendChild(thSalesElement);
//       thRowElement.appendChild(thPrevSalesElement);
//       //
//       theadElement.appendChild(thRowElement);
//       //
//       tblElement.appendChild(theadElement);

//       // Loop
//       result.result.forEach(customer => {
//         // Create table rows
//         const trElement = document.createElement("tr");
//         const tdIdElement = document.createElement("td");
//         tdIdElement.innerText = customer.cusId;
//         const tdFNameElement = document.createElement("td");
//         tdFNameElement.innerText = customer.cusFname;
//         const tdLNameElement = document.createElement("td");
//         tdLNameElement.innerText = customer.cusLname;
//         const tdStateElement = document.createElement("td");
//         tdStateElement.innerText = customer.cusState;
//         const tdSalesElement = document.createElement("td");
//         tdSalesElement.innerText = customer.custSalesYTD;
//         const tdPrevElement = document.createElement("td");
//         tdPrevElement.innerText = customer.cusSalesPrev;
//         // Add elements
//         trElement.appendChild(tdIdElement);
//         trElement.appendChild(tdFNameElement);
//         trElement.appendChild(tdLNameElement);
//         trElement.appendChild(tdStateElement);
//         trElement.appendChild(tdSalesElement);
//         trElement.appendChild(tdPrevElement);

//         //
//         tblElement.appendChild(trElement);
//       });
//       // Add table to div
//       divElement.appendChild(tblElement);
//     };
//   };
// };

// // Handle form submission
// document.querySelector("form").addEventListener("submit", e => {
//   // Cancel default behavior of sending a synchronous POST request
//   e.preventDefault();
//   // Create a FormData object, passing the form as a parameter
//   const formData = new FormData(e.target);
//   fetch("/", {
//     method: "POST",
//     body: formData
//   })
//     .then(response => response.json())
//     .then(result => {
//       displayResults(result);
//     })
//     .catch(err => {
//       console.error(err.message);
//     });
// });