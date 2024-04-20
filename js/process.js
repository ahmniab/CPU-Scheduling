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

function get_Processes_on_time(processes, time) {
  var processes_on_Time = [];

  processes.forEach(process => {
    if (process.AT <= time) {
      processesAfterTime.push(process);
    }
  });

  return processesAfterTime;
}

// "Apply Of :get_curr_process(extracted_Prss, prss_ontim)."
// const extracted_Prss = ['process1', 'process2', 'process3'];
// const prss_ontim = [
//   { process: 'process1', time: 5 },
//   { process: 'process2', time: 3 },
//   { process: 'process3', time: 7 },
//   { process: 'process4', time: 2 }
// ];

// const leastProcess = get_curr_process(extracted_Prss, prss_ontim);
// console.log(leastProcess); 
// console.log(extracted_Prss);


function get_curr_process(extracted_Prss, prss_ontim) {

  const processes = [];


  for (let i = 0; i < extracted_Prss.length; i++) {
   
    const process = extracted_Prss[i];

  
    for (let j = 0; j < prss_ontim.length; j++) {

      if (prss_ontim[j].process === process) {
       
        processes.push({ process, time: prss_ontim[j].time });

       
        break;
      }
    }
  }

  processes.sort((a, b) => a.time - b.time);
  const leastProcess = processes[0];

  const index = extracted_Prss.indexOf(leastProcess.process);
  if (index > -1) {
    extracted_Prss.splice(index, 1);
  }

  return leastProcess.process;
}


// extract_processes();
// Processes.forEach(element => {
//   console.log(element);
  
// });