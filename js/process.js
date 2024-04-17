class Process {
    constructor(pid , AT, BT, WT, TAT, RT) {
      this.pid = pid;
      this.AT = AT;
      this.BT = BT;
      this.WT = WT;
      this.TAT = TAT;
      this.RT = RT;
    }
}
  
var Processes = new Array();

function extract_processes() {
  var table = document.querySelector(".container .inputs .table table");
  var rows = table.querySelectorAll("tr");
  for (let i = 1; i < rows.length; i++) {

    var row  = rows[i].querySelectorAll("td");
    Processes.push(new Process(Number(row[0].innerText),Number(row[1].innerText),Number(row[2].innerText),Number(row[3].innerText),Number(row[4].innerText),Number(row[5].innerText)));
    
  }
  
}

function aval_processes(Processes , time) {
  
}

extract_processes();
Processes.forEach(element => {
  console.log(element);
  
});