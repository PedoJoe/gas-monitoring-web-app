//history chart of Humidity in Node3
var histcharthumid3 = echarts.init(document.querySelector(".humid .chart"));
var arrhistDatenode3humid = [];

//convhisttimenode3humid() is to convert node3 Humid timestamp array into yr/mt/day h:m:s format and store into array for xAxis category show
function convhisttimenode3humid()
{
  var arrDatenode3humid = [];
  //every element in histdateHumid3 needs to *1000 to convert it js recognized timestamp
  for(var i=0; i<histdateHumid3.length; i++)
  {
    arrDatenode3humid[i]=histdateHumid3[i]*1000;
  }
  //let every element of arrDatenode3humid array inherits Date class property
  for(var i=0; i<arrDatenode3humid.length; i++)
  {
    arrDatenode3humid[i]=new Date(arrDatenode3humid[i]);
  }

  var temptime = arrDatenode3humid;
  //console.log("in histHumid3.js, conv histtime=" + temptime);
  //get every element's yr, mt, day, h, m, s of temptime array and store it into arrhisDatenode3humid array(global)
  for(var i=0;i<temptime.length;i++)
  {
    var y = temptime[i].getFullYear();
    var mt = temptime[i].getMonth() + 1;//不加1，五月份返回4
    var day = temptime[i].getDate();
    var h = temptime[i].getHours();
    var m = temptime[i].getMinutes();
    var s = temptime[i].getSeconds();
    arrhistDatenode3humid[i]= y +'/'+ mt + '/' + day + ' ' + (h>=10 ? h:'0'+ h) +':' + (m>=10 ? m:'0'+ m) + ':' + (s>=10 ? s:'0'+ s);
  }
  //console.log("in histHumid3.js, arrhistDatenode3humid="+arrhistDatenode3humid);
  // //console.log("conv histtime h="+h);
  // //console.log("conv histtime m="+m);
  // //console.log("conv histtime s="+s);
}
function refreshhistHumid3() {
  var histnode3humid= posthistHumid3;
  convhisttimenode3humid();
  
  var thColor = ["#e81031", "#5da5b3"];
  
  let histhumid3option = {
      color: thColor[1],
      title: 
      {
        text: 'Humidity - Node 3',
        show:true,
        textStyle: {
          color: '#ffffff',
        }
      },
      //tooltip
      tooltip: {
        trigger: 'axis',
        show:true,
        //tooltip formatter format is: for each point, will display its value, time, index in the array, and unit with auto conversion
        formatter:function(obj)
        {
          var res = "Info: </br>";
          var value = obj[0].value;
          var index = obj[0].dataIndex;
          var unit = "%";
          //console.log("formatter value="+value);
          //console.log("formatter index="+index);
          return res+="value:"+value+' '+ unit+ '</br>'+"index:"+index+'</br>'+"Time:"+arrhistDatenode3humid[index]
        },
        axisPointer: {
          animation: false
        }
      },
      grid: {
        top: "30%",
        left: "5%",
        right: "15%",
        bottom: "3%",
        show: true, // 显示边框
        borderColor: "#012f4a", // 边框颜色
        containLabel: true // 包含刻度文字在内
      },
      //xAxis Setting
      xAxis: {
        type: 'category',
        data:arrhistDatenode3humid,
        // nameLocation: "middle",
        name: "Time",
        splitLine: {
            show: false
        },
        axisLine: {
          show:true,
           lineStyle: {
              color: '#ffffff'
            }
        },
        axisTick: {
        show:false
        },
        axisLabel: {
          color: "#ffffff",
          show: true,
          textStyle:
          {
            color:'white',
            fontSize:8,
          },
        },

        triggerEvent: true
      },
      //yAxis Setting
      yAxis: {
        type: 'value',
        //offset:20,
         name:'RH(%)',
        boundaryGap:true,
        //  boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        },
         min: 0,
         max: 100,
        axisLine: {
             lineStyle: {
              color: "#ffffff",
          },
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#ffffff',
          show: true
        }
      },

      series: {
        name: 'Humidity',
        type: 'line',
        label: 
        {
          show: true, 
          position: 'top',
          //offset:[15,0],
          color: "white",
          fontSize: 8,
          formatter: function (val) 
          {
            return Math.round(val.data) + "°%";
          }
        },
        showSymbol: false,
        hoverAnimation: false,
        data: histnode3humid,
      }
    };
    // 更新echarts图表
    histcharthumid3.setOption(histhumid3option, true);
    window.addEventListener("resize", function () 
    {
      histcharthumid3.resize();
    });
}
