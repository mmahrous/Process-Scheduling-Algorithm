/*
 * Process Scheduling Algorithms
 * By: Mohamed Mahrous [https://github.com/mmahrous] to contact me [m.mahrous.94@gmail.com]
 * Version 0.2
 * Last Modified: 12/06/2015
 *
 * Copyright 2015 Mahrous
 * You may use this project under MIT or GPL licenses.
 */

$( document ).ready(function() {
	

	$('.add').click(function(){
		var i = $( ".ps tbody tr" ).length;
		var html = '<tr><td>'+i+'</td><td><input class="arrivalTime" type="text" name="ps['+i+'][arrivalTime]"></td><td><input class="brustTime" type="text" name="ps['+i+'][brustTime]"></td><td><input class="priority" type="text" name="ps['+i+'][priority]"></td><td><input class="x btn btn-default" type="button" value="X"></td></tr>';
		$('.ps tbody').append(html);
	});
	$('.x').click(function(){
		$(this).parent().parent('tr').remove();
	});
	$('.fcfs').click(function(){
		$('.results').html(FCFS(GetData()));
	});
	$('.nsjf').click(function(){
		$('.results').html(SJF(GetData()));
	});
	$('.priority').click(function(){
		$('.results').html(Priority(GetData()));
	});
	$('.RR').click(function(){
		$('.results').html(RR(GetData()), $('.q').val());
	});
	
});
	function GetData(){
		var ps = [];
		var i = 0;
		$( "tbody tr" ).each(function( index ) {
			if(($(this).find('.arrivalTime').val()) && ($(this).find('.arrivalTime').val())){

				var json = {name: 'ps'+i, arrivalTime: $(this).find('.arrivalTime').val(), brustTime: $(this).find('.brustTime').val(), priority: $(this).find('.priority').val()};
				ps.push(json);

			}
			i++;
		});
		return ps;
	}
   function FCFS (ps) {
      var result = {waitingTimeGph:[], waitingTime:[] , AvrgTime:'' , turnaroundTimeGph:[], turnaroundTime: [], AvrgturnTime:''};
      ps.sort(sort_by('arrivalTime', false, parseInt));
      waitingTimeFCFS(ps, result);
      turnaroundTimeFCFS(ps, result);
      return graph(ps,result);
   }
  function SJF(ps){
      var result = {waitingTimeGph:[], waitingTime:[] , AvrgTime:'' , turnaroundTimeGph:[], turnaroundTime: [], AvrgturnTime:''};
      ps.sort(sort_by('brustTime', false, parseInt));
      waitingTimeSJF(ps, result);
      turnaroundTimeSJF(ps, result);
      return graph(ps,result);
   }
   function Priority (ps) {
      var result = {waitingTimeGph:[], waitingTime:[] , AvrgTime:'' , turnaroundTimeGph:[], turnaroundTime: [], AvrgturnTime:''};
      ps.sort(sort_by('priority', false, parseInt));
      waitingTimeFCFS(ps, result);
      turnaroundTimeFCFS(ps, result);
      return graph(ps,result);
   }
	function RR (ps, q) {
	  q = parseInt(q);
      var result = {waitingTimeGph:[], waitingTime:[] , AvrgTime:'' , turnaroundTimeGph:[], turnaroundTime: [], AvrgturnTime:''};
      ps.sort(sort_by('arrivalTime', false, parseInt));
      waitingTimeRR(ps, result, q);
      turnaroundTimeRR(ps, result, q);
      return graph(ps,result);
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
        AvrgTime = parseInt(prePS);
      }else{
        var prePS = prePS + parseInt(ps[i-1].brustTime);
        AvrgTime = AvrgTime + parseInt(prePS);
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
        var prePS = + parseInt(ps[i].brustTime);
        AvrgturnTime = prePS;
      }else{
        var prePS = prePS + parseInt(ps[i].brustTime);
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
        var prePS = prePS + parseInt(ps[i-1].brustTime);
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
        var prePS = + parseInt(ps[i].brustTime);
        AvrgturnTime = prePS;
      }else{
        var prePS = prePS + parseInt(ps[i].brustTime);
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
    psTime.push(parseInt(ps[x].brustTime));
    AvrgTime.push(0);
    ArivalTime.push(parseInt(ps[x].arrivalTime));
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
          ServiceTime[i] = prePS;
          prePS = prePS + q; 
          result.waitingTimeGph.push(prePS);
        }else if((wt <= 0) && (wt != -q)){
          ServiceTime[i] = prePS;
          prePS = prePS + psTime[i];
          result.waitingTimeGph.push(prePS);
          psTime[i] = 0;
          length++;
        }
        AvrgTime[i] =  AvrgTime[i] + (ServiceTime[i] - ArivalTime[i]);
        ArivalTime[i] = ServiceTime[i];
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
    psTime.push(parseInt(ps[x].brustTime));
    ArivalTime.push(parseInt(ps[x].arrivalTime));
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
  result.turnaroundTime = turnTime;
}
// Function to graph the result
function graph(ps, result){
  var graph;
  graph = "<table class='table table-striped ps'><thead><tr><th>Process#</th><th>Waiting Time</th><th>Turnaround Time</th></tr></thead><tbody>";
  for(i in ps){
  	graph = graph + '<tr><td>'+ps[i].name + '</td><td>'+ result.waitingTime[i]+'</td><td>'+result.turnaroundTime[i] +'</td></tr>';
  }
  graph = graph + "</tbody></br>Avrage Waiting Time = "+ result.AvrgTime + "\n";
  graph = graph + "Avrage Turnaround Time = "+ result.AvrgturnTime + "\n";
  return graph;
}

