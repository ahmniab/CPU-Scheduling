class Process {
    constructor(pid, AT, BT, WT, TAT, RT) {
      this.pid = pid;
      this.AT = AT;
      this.BT = BT;
      this.WT = WT;
      this.TAT = TAT;
      this.RT = RT;
    }
  }
  
  const tableData = [
    {
      pid: 10,
      AT: 10,
      BT: 10,
      WT: 10,
      TAT: 10, 
      RT: 10,
    },
  ];
  
  const processArray = tableData.map((data) => new Process(data.pid, data.AT, data.BT, data.WT, data.TAT, data.RT));
  
  console.log(processArray);