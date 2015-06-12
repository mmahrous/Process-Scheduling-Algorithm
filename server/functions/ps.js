module.exports = {    
   FCFS: function FCFS (ps) {
      var result = {waitingTimeGph:[], waitingTime:[] , AvrgTime:'' , turnaroundTimeGph:[], turnaroundTime: [], AvrgturnTime:''};
      ps.sort(sort_by('arrivalTime', false, parseInt));
      waitingTimeFCFS(ps, result);
      turnaroundTimeFCFS(ps, result);
      return graph(ps,result);
   },
   SJF: function SJF(ps){
      var result = {waitingTimeGph:[], waitingTime:[] , AvrgTime:'' , turnaroundTimeGph:[], turnaroundTime: [], AvrgturnTime:''};
      ps.sort(sort_by('brustTime', false, parseInt));
      waitingTimeSJF(ps, result);
      turnaroundTimeSJF(ps, result);
      return graph(ps,result);
   },
   Priority: function Priority (ps) {
      var result = {waitingTimeGph:[], waitingTime:[] , AvrgTime:'' , turnaroundTimeGph:[], turnaroundTime: [], AvrgturnTime:''};
      ps.sort(sort_by('priority', false, parseInt));
      waitingTimeFCFS(ps, result);
      turnaroundTimeFCFS(ps, result);
      return graph(ps,result);
   },
   RR: function RR (ps, q) {
      var result = {waitingTimeGph:[], waitingTime:[] , AvrgTime:'' , turnaroundTimeGph:[], turnaroundTime: [], AvrgturnTime:''};
      ps.sort(sort_by('arrivalTime', false, parseInt));
      waitingTimeRR(ps, result, q);
      turnaroundTimeRR(ps, result, q);
      return graph(ps,result);
   },

}
// Functions
// Sorting Function to sort JSON array acording to one of its attribute 
var sort_by = function(field, reverse, primer){
   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};
   reverse = !reverse ? 1 : -1;
   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}
// Fucntion to calculate the waiting time for FCFS
function waitingTimeFCFS(ps, result){
  var AvrgTime;
  var prePS = 0;
  for(i in ps){
      if(i == 0){
        var prePS = 0;
        AvrgTime = prePS;
      }else{
        var prePS = prePS + ps[i-1].brustTime;
        AvrgTime = AvrgTime + prePS;
      }
      result.waitingTimeGph.push(prePS);
      result.waitingTime.push(prePS);
  }
  AvrgTime = AvrgTime/ps.length;
  result.AvrgTime = AvrgTime;
}

// Fucntion to calculate the turnaround time for FCFS
function turnaroundTimeFCFS(ps, result){
  var AvrgturnTime;
  for(i in ps){
      if(i == 0){
        var prePS = + ps[i].brustTime;
        AvrgturnTime = prePS;
      }else{
        var prePS = prePS + ps[i].brustTime;
        AvrgturnTime = AvrgturnTime + prePS;
      }
      result.turnaroundTimeGph.push(prePS);
      result.turnaroundTime.push(prePS);
  }
  AvrgturnTime = AvrgturnTime/ps.length;
  result.AvrgturnTime = AvrgturnTime;
}
function waitingTimeSJF(ps, result){
  var AvrgTime;
  for(i in ps){
      if(i == 0){
        var prePS = 0;
        AvrgTime = prePS;
      }else{
        var prePS = prePS + ps[i-1].brustTime;
        AvrgTime = AvrgTime + prePS;
      }
      result.waitingTimeGph.push(prePS);
      result.waitingTime.push(prePS);
  }
  AvrgTime = AvrgTime/ps.length;
  result.AvrgTime = AvrgTime;
}
function turnaroundTimeSJF(ps, result){
  var AvrgturnTime;
  for(i in ps){
      if(i == 0){
        var prePS = + ps[i].brustTime;
        AvrgturnTime = prePS;
      }else{
        var prePS = prePS + ps[i].brustTime;
        AvrgturnTime = AvrgturnTime + prePS;
      }
      result.turnaroundTimeGph.push(prePS);
      result.turnaroundTime.push(prePS);
  }
  AvrgturnTime = AvrgturnTime/ps.length;
  result.AvrgturnTime = AvrgturnTime;
}

function waitingTimeRR(ps, result, q){
  var ServiceTime = [];
  var ArivalTime = [];
  var AvrgTime = [];
  var AvrgTimenum = 0;
  var psTime = [];
  var z = 1;
  var length = 0;
  var prePS = 0;
  for(x in ps){
    psTime.push(ps[x].brustTime);
    AvrgTime.push(0);
    ArivalTime.push(ps[x].arrivalTime);
  }
  while(z>0){ 

    for(i in psTime){
      if(psTime[i] != 0){
        if(prePS >= ArivalTime[i]){
          i;
        }else{
          i--;
        }
        var wt = psTime[i]-q;
        if((wt >= q) || ((wt < q) && (wt > 0))){
          psTime[i] = wt;
          console.log(prePS);
          ServiceTime[i] = prePS;
          prePS = prePS + q; 
          result.waitingTimeGph.push(prePS);
        }else if((wt <= 0) && (wt != -q)){
          console.log(prePS);
          ServiceTime[i] = prePS;
          prePS = prePS + psTime[i];
          
          result.waitingTimeGph.push(prePS);
          psTime[i] = 0;
          length++;
        }
        AvrgTime[i] =  AvrgTime[i] + (ServiceTime[i] - ArivalTime[i]);
        ArivalTime[i] = ServiceTime[i];
        console.log(AvrgTime);
      }
      
    }
     if(psTime.length == length){
      for(i in AvrgTime){
        result.waitingTime.push(AvrgTime[i]);
        AvrgTimenum += AvrgTime[i];
      }
      AvrgTimenum = AvrgTimenum/ps.length;
      result.AvrgTime = AvrgTimenum;
      z = 0;
    }
  }
  
  
}
function turnaroundTimeRR(ps, result, q){
  var AvrgturnTime = 0;
  var psTime = [];
  var turnTime = [];
  var ArivalTime = [];
  var z = 1;
  var length =0;
  var prePS = 0;
  var time = 0;
  for(x in ps){
    psTime.push(ps[x].brustTime);
    ArivalTime.push(ps[x].arrivalTime);
  }
  while(z>0){ 
    for(i in psTime){
      i = parseInt(i);
      if(psTime[i] != 0){
        if(prePS >= ArivalTime[i]){
          i;
        }else{
          i--;
        }
        var wt = psTime[i] - q;
        if((wt >= q) || ((wt < q) && (wt > 0))){
          psTime[i] = wt;
          prePS = prePS + q;
          result.turnaroundTimeGph.push(prePS);
        }else if((wt <= 0) && (wt != -q)){
          prePS = prePS + psTime[i]; 
          result.turnaroundTimeGph.push(prePS);
          turnTime[i] = prePS;
          AvrgturnTime = AvrgturnTime + prePS;
          psTime[i] = 0;
          length++;
        }

      }
      
    }

    if(psTime.length == length){
      AvrgturnTime = AvrgturnTime/ps.length;
      result.AvrgturnTime = AvrgturnTime;
      z = 0;
    }
  }
  console.log(result.turnaroundTimeGph);
  result.turnaroundTime = turnTime;
}
// Function to graph the result
function graph(ps, result){
  var graph;
  graph = "=========================================================\n";
  graph = graph + "|\tProcess Name\tWaiting Time\tTurnaround Time\t|\n";
  graph = graph + "=========================================================\n";
  for(i in ps){
    graph = graph + "\t"+ps[i].name + "\t\t" + result.waitingTime[i]+"\t\t" +result.turnaroundTime[i] +"\t\n";  
  }
  graph = graph + "\n\nAvrage Waiting Time = "+ result.AvrgTime + "\n";
  graph = graph + "Avrage Turnaround Time = "+ result.AvrgturnTime + "\n";
  return graph;
}

