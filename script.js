$(document).ready(function () {
    $('input[name="multiply"]').click(function (e) {
      e.preventDefault();
      multiply();
    });
  });
  
  function multiply() {
    const results = $("#results tbody");
    results.html(""); // Clear previous results
  
    const factor1 = parseInt($('input[name="factor1"]').val());
    const factor2 = parseInt($('input[name="factor2"]').val());
    const bitLength = Math.ceil(Math.max(Math.log2(Math.abs(factor1)), Math.log2(Math.abs(factor2)))) + 1;
  
    let a = padZeroes(0, bitLength);
    let q = toTwosComplement(factor2, bitLength);
    let q1 = "0";
    let m = toTwosComplement(factor1, bitLength);
  
    appendRow(results, a, q, q1, m, "Loading Data");
  
    for (let i = 0; i < bitLength; i++) {
      if (q1 === "0" && q.endsWith("1")) {
        a = toTwosComplement(parseInt(a, 2) - parseInt(m, 2), bitLength);
        appendRow(results, a, q, q1, m, "AC = AC - M");
      } else if (q1 === "1" && q.endsWith("0")) {
        a = toTwosComplement(parseInt(a, 2) + parseInt(m, 2), bitLength).slice(-bitLength);
        appendRow(results, a, q, q1, m, "AC = AC + M");
      }
  
      q1 = q.slice(-1);
      q = a.slice(-1) + q.slice(0, -1);
      a = a[0] + a.slice(0, -1);
  
      appendRow(results, a, q, q1, m, "Arithmetic Shift Right");
    }
  }
  
  function toTwosComplement(number, bitLength) {
    if (number < 0) {
      let bin = number.toString(2).slice(1).padStart(bitLength, '0');
      bin = bin.replace(/./g, char => (char === '1' ? '0' : '1'));
      number = parseInt(bin, 2) + 1;
      return padZeroes(number.toString(2), bitLength);
    } else {
      return padZeroes(number.toString(2), bitLength);
    }
  }
  
  function appendRow(table, a, q, q1, m, log) {
    table.append(
      `<tr>
        <td>${a}</td>
        <td>${q}</td>
        <td>${q1}</td>
        <td>${m}</td>
        <td>${log}</td>
      </tr>`
    );
  }
  
  function padZeroes(number, length) {
    return number.toString().padStart(length, '0');
  }
  