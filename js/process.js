class Process {
  constructor(pid, AT, BT, WT, TAT, RT,index) {
    this.pid = pid;
    this.AT = AT;
    this.BT = BT;
    this.WT = WT;
    this.TAT = TAT;
    this.RT = RT;
    this.ind = index;
    this.is_done = false;

  }
  
}

var Processes = new Array();

function extract_processes() {
  var table = document.getElementById("table");
  var rows = table.querySelectorAll("tr");
  for (let i = 1; i < rows.length; i++) {

    var row = rows[i].querySelectorAll("td");
    Processes.push(new Process(
                      row[0].innerText,
                      Number(row[1].innerText), 
                      Number(row[2].innerText), 
                      Number(row[3].innerText), 
                      Number(row[4].innerText), 
                      Number(row[5].innerText),i)
                      );
    

  }

}

function get_Processes_on_time(processes, time) {
  var processes_on_time = [];

  processes.forEach(process => {
    if (process.AT <= time && !process.is_done) {
      processes_on_time.push(process);
    }
  });

  return processes_on_time;
}

// "Apply Of :get_curr_process(extracted_Prss, prss_ontim)."

// const leastProcess = get_curr_process(extracted_Prss, prss_ontim);
// console.log(leastProcess); 

function get_curr_process(time) {
  prss_ontim = get_Processes_on_time(Processes , time);
  if (prss_ontim.length == 0) {
    return null;
  }
  prss_ontim.sort((a, b) => a.BT - b.BT);
  let curr = prss_ontim[0];
  // extracted_Prss.splice(extracted_Prss.indexOf(curr), 1);
  curr.is_done = true;
  return curr;

}
// var extracted_Prss = [new Process(1, 1, 2, 0, 0, 0), new Process(2, 2, 3, 0, 0, 0), new Process(3, 2, 2, 0, 0, 0), new Process(4, 2, 2, 0, 0, 0),];
// console.log('extracted_Prss');
// console.log(extracted_Prss);

// var prss_ontime = get_Processes_on_time(extracted_Prss, 3);

// console.log(pc(extracted_Prss, prss_ontime));
// console.log(extracted_Prss);


/*function get_curr_process(extracted_Prss, prss_ontime) {

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
}*/

pid = 1;
function insert_to_table(AT, BT) {
  let table = document.getElementById("table");
  let new_p_tr = document.createElement("tr");

  new_p_tr.innerHTML = `
  <td>P${pid++}</td>
  <td>${AT}</td>
  <td>${BT}</td>
  <td></td>
  <td></td>
  <td></td>`;

  table.appendChild(new_p_tr);
}

function addData() {
  let AT = document.getElementById('arrivalTime');
  let BT = document.getElementById('burstTime');
  if (isNaN(AT.value) || isNaN(BT.value)) {
    alert("Only numbers allowed");
  }
  else if(AT.value === "" || BT.value === "")
  {
    alert("There is no input")
  }
  else if(Number(AT.value) < 0){
    alert("The time starts from 0");
    
  }else if(Number(BT.value) < 1){
    alert("The smallest value of burst time can be 1");
  }
  else{
    insert_to_table(AT.value,BT.value);
  }
  AT.value="";
  BT.value="";
}

let sel = 0;
function add_to_chart(end_time , pid , BT) {
  let colors = ["#1da80d" , "#9c0da8" , "#5550e3" , "#e39550","#c3e350","#8ce350","#a850e3","#9f5894","#ecd62782"];
  let processes = document.getElementById("processes");
  let new_p_block = document.createElement("div");
  new_p_block.classList.add("process");
  // new_p_block.style.width = `${BT*60}px`;
  // new_p_block.style.background = colors[sel%colors.length];
  new_p_block.innerHTML = `
  <div class="Time">${end_time}</div>
  ${pid}
  `
  new_p_block.setAttribute("style" , `background-color: ${colors[sel++%colors.length]};width: ${BT*60}px;`)
  processes.appendChild(new_p_block);
  
}

// for (let index = 1 ; index < 5; index++ ) {
//   add_to_chart((index-1)+index*2 , index+1,index);
  
// }

function all_time() {
  let time = 0;
  Processes.forEach((p)=>{
    time += p.BT;
    console.log(p);
  })
  return time;
}

function insert_times(index , WT , TAT , RT) {
  let p_rows = document.querySelectorAll('.table tr')[index].querySelectorAll('td');
  p_rows[3].innerHTML = WT;
  p_rows[4].innerHTML = TAT;
  p_rows[5].innerHTML = RT;
}

function play(){
  extract_processes();
  if (Processes.length < 1) {
    alert("you must add at least 1 process");
    return;
  }
  let total_BT = all_time();
  console.log(total_BT);
  for (let time = 0 , i = 0; time < total_BT; i++) {
    let p = get_curr_process(time);
    console.log(p);
    let end_time =time + p.BT;
    add_to_chart(end_time,p.pid,p.BT);
    p.TAT = end_time - p.AT;
    p.WT = p.TAT - p.BT;
    p.RT = (end_time - p.BT) - p.AT;
    insert_times(p.index , p.WT , p.TAT ,p.RT);
    time+= p.BT;
  }
}

