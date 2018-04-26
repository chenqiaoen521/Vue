/**
 * Created by user on 2017/12/26.
 */
// 环形图----------------------------------------
function rollPie(data, id, type) {
  var myChartsOne = document.getElementById(id);
  var myChart = echarts.init(myChartsOne, {width: 'auto', height: 'auto'});
    var itemStyleTop = {normal: {color: '#1F88D7'}, emphasis: {color: '#1F88D7'}}
    var itemStyleBottom = {normal: {color: '#B7DEF4'}, emphasis: {color: '#B7DEF4'}}
    var labelTop = {
        normal: {
            formatter: function (e) {
                var  str = '';
                str = e.value + (data.topTextFormatter === undefined ? '件': data.topTextFormatter);
                return str
            },
            position: 'center',
            show: data.showTopText === undefined ? true: data.showTopText,
            textStyle: {
                fontSize: data.topTextSize === undefined ? '25': data.topTextSize,
                fontWeight: 'bold',
                padding: [0,0,0,0],
                color: '#1F88D7'
            }
        }
    }
    var labelBottom = {normal: {formatter: function (e) {var  str = '';str = e.value + (data.bottomTextFormatter === undefined ? '人': data.bottomTextFormatter);return str}, position: 'center', show: false, textStyle: {fontSize: data.bottomTextSize === undefined ? '16': data.bottomTextSize, fontWeight: 'bold', color: '#E16D1D'}}}
    option = {
        tooltip: {
            trigger: 'item'
            // formatter: function(params, ticket, callback) {
            //     var res = params.seriesName;
            //     res += '<br/>' + params.name + ' : ' + params.percent + '%';
            //     return res;
            // }
        },
        yAxis: [{
            show: false
        }],
        series: data.seriesData
    };
    for (var i = 0; i< option.series.length; i++) {
        option.series[i].radius = data.radius
        option.series[i].type = 'pie'
        option.series[i].x = '0%'
        option.series[i].labelLine  = {normal: {show: false}}
        option.series[i].data[0].itemStyle = itemStyleTop
        option.series[i].data[1].itemStyle = itemStyleBottom
        option.series[i].data[0].label = labelTop
        option.series[i].data[1].label = labelBottom
    }
  if(type == 'statisticAnalysis'){
    data.seriesData[0].center = ['20%', '40%']
    data.seriesData[1].center = ['50%', '40%']
    data.seriesData[2].center = ['80%', '40%']
    data.seriesData.forEach(function(v,index){
      v.markPoint = {
        data: [{
          symbol: 'triangle',
          symbolSize: 15,
          symbolRotate: 0,
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          name: v.title,
          value: v.title,
          x: myChartsOne.clientWidth * (index + 0.2) / 3,
          y: myChartsOne.clientHeight * 0.45 + 50,
          label: {
            normal: {
              show: true,
              position: 'center',
              formatter: function(params) {
                return params.value;
              },
              textStyle: {
                color: '#1F88D7'
              }
            }
          },
        }]
      }
    })
  }else if(type == 'sueLink'){
    data.seriesData[0].center = ['20%', '40%']
    data.seriesData[1].center = ['50%', '40%']
    data.seriesData[2].center = ['80%', '40%']
    data.seriesData.forEach(function(v,index){
      v.markPoint = {
        data: [{
          symbol: 'triangle',
          symbolSize: 15,
          symbolRotate: 0,
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          name: v.title,
          value: v.title,
          x: myChartsOne.clientWidth * (index + 0.35) / 3,
          y: myChartsOne.clientHeight * 0.8,
          label: {
            normal: {
              show: true,
              position: 'center',
              formatter: function(params) {
                return params.value;
              },
              textStyle: {
                color: '#1F88D7'
              }
            }
          },
        }]
      }
    })
  }else if(type == 'judgmentInterface'){
    data.seriesData.forEach(function(v,index){
      if(index == 0 || index == 1 || index == 2 || index == 3){
        v.markPoint = {
          data: [{
            symbol: 'triangle',
            symbolSize: 15,
            symbolRotate: 0,
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },
            name: v.title,
            value: v.title,
            x: myChartsOne.clientWidth * (index + 0.3) / 4,
            y: myChartsOne.clientHeight * 0.5,
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: function(params) {
                  return params.value;
                },
                textStyle: {
                  color: '#1F88D7'
                }
              }
            },
          }]
        }
      }else{
        v.markPoint = {
          data: [{
            symbol: 'triangle',
            symbolSize: 15,
            symbolRotate: 0,
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },
            name: v.title,
            value: v.title,
            x: myChartsOne.clientWidth * (index-4 + 0.3) / 4,
            y: myChartsOne.clientHeight - 10,
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: function(params) {
                  return params.value;
                },
                textStyle: {
                  color: '#1F88D7'
                }
              }
            },
          }]
        }
      }
    })
  }else if(type == 'examineLink'){
    data.seriesData.forEach(function(v,index){
      if(index == 0 || index == 1 || index == 2 || index == 3){
        v.markPoint = {
          data: [{
            symbol: 'triangle',
            symbolSize: 15,
            symbolRotate: 0,
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },
            name: v.title,
            value: v.title,
            x: myChartsOne.clientWidth * (index + 0.3) / 4,
            y: myChartsOne.clientHeight * 0.5,
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: function(params) {
                  return params.value;
                },
                textStyle: {
                  color: '#1F88D7'
                }
              }
            },
          }]
        }
      }else{
        v.markPoint = {
          data: [{
            symbol: 'triangle',
            symbolSize: 15,
            symbolRotate: 0,
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },
            name: v.title,
            value: v.title,
            x: myChartsOne.clientWidth * (index-4 + 0.3) / 4,
            y: myChartsOne.clientHeight - 10,
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: function(params) {
                  return params.value;
                },
                textStyle: {
                  color: '#1F88D7'
                }
              }
            },
          }]
        }
      }
    })
    data.seriesData[0].center = ['9%', '30%'];
    data.seriesData[1].center = ['25%', '30%'];
    data.seriesData[2].center = ['41%', '30%'];
    data.seriesData[3].center = ['58%', '30%'];
    data.seriesData[4].center = ['74%', '30%'];
    data.seriesData[5].center = ['91%', '30%'];
    data.seriesData.forEach(function(v,index){
      v.markPoint = {
        data: [{
          symbol: 'triangle',
          symbolSize: 15,
          symbolRotate: 0,
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          name: v.name,
          value: v.name,
          x: myChartsOne.clientWidth * (index + 0.1) / 6,
          y: myChartsOne.clientHeight * 0.45 + 70,
          label: {
            normal: {
              show: true,
              position: 'center',
              formatter: function(params) {
                return params.value;
              },
              textStyle: {
                color: '#1F88D7'
              }
            }
          },
        }]
      }
    })
  }
    myChart.setOption(option);
    myChart.resize()
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// 柱状图---------------------------------------
function barPLT(data, id, fun) {
    option = {
        color: ['#1D86D4', '#FE7C5D'],
        barWidth: '20px',
        title : {
            text: '',
            subtext: ''
        },
        textStyle:{
            color: '#26739F',
            fontSize: '14px'
        },
        tooltip : {
            trigger: 'axis',
            // backgroundColor: 'rgba(255,255,255,0.7)',
            axisPointer: {
                type: 'shadow',
                shadowStyle : {                       // 阴影指示器样式设置
                    width: 1,                   // 阴影大小
                    color: 'rgba(150,150,150,0.3)'  // 阴影颜色
                }
            }
        },
        legend: {
            show: data.lengedShow === undefined ? true : data.lengedShow,
            data: data.legendData,
            x: 'right'
        },
        grid: {
            left: '10%',
            bottom: '30%'
        },
        xAxis : [
            {
                axisTick : {show: false},
                axisLine: {
                    show: false,
                    lineStyle:{
                        color:'#333',
                    }
                },
                type : 'category',
                data : data.xAxisData,
                axisLabel: {
                    interval: '0',
                    textStyle:{
                        color: '#666',
                    },
                    formatter: fun.xAxisFormatter
                    // rotate: 40,
                    // formatter: function (value) {
                    //     return value.split('').join('\n')
                    //     // var ret = ''
                    //     // var maxLength = 2
                    //     // var valLength = value.length
                    //     // var rowN = Math.ceil(valLength/maxLength)
                    //     // if (rowN > 1) {
                    //     //     for(var i =0;i< rowN;i++) {
                    //     //         var temp = ''
                    //     //         var start = i * maxLength
                    //     //         var end = start + maxLength
                    //     //         temp = value.substring(start, end) + '\n'
                    //     //         ret += temp
                    //     //     }
                    //     //     return ret
                    //     // } else {
                    //     //     return value
                    //     // }
                    // }
                }
            }
        ],
        yAxis : [
            {
                type: 'value',
                axisTick : {show: false},
                position: data.yaxisPosition,
                axisLabel: {
                    textStyle: {
                        color: '#333',
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle:{
                        color:'#333',
                    }
                }
            }
        ],
        series : data.seriesData
    };
    for (var i = 0; i< option.series.length; i++) {
        option.series[i].type = 'bar'
        option.series[i].markLine = { data : data.MarkLineData}
        option.series[i].itemStyle = {normal: {
            label: {
                show: data.showLabel === undefined ? true: data.showLabel, position: 'top'
            }},
            emphasis: {color: '#3CD2A5'}}
    }
    option.yAxis[0].min = data.min === undefined ? null : 0
    option.yAxis[0].max = data.max === undefined ? null : 100
    // option.xAxis[0].axisLabel.label.formatter = fun.xAxisFormatter === undefined ? null : fun.xAxisFormatter
    var myChartsOne = document.getElementById(id);
    var myChart = echarts.init(myChartsOne, {width: 'auto', height: 'auto'});
    myChart.setOption(option);
    myChart.resize()
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// 饼图----------------------------------------

function fullPie(data, id) {
    option = {
        color: ['#EF5E32', '#16AAD1', '#1270B5', '#3CD2A5','#FDCA0E', '#92C6E4'],
        title : {
            text: data.titleText,
            subtext: '',
            x:'center'
        },
        textStyle:{
            color: '#333',
            fontSize: '14'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        itemStyle: {
            normal: {
              // color: '#333'
            },
            label: {
                textStyle: {
                color: '#333',
                fontSize: '14px'
              }
            }
        },
        legend: {
            // orient : 'vertical',
            x : data.legendX === undefined ? 'right' : data.legendX,
            itemWidth: 20,             // 图例图形宽度
            itemHeight: 14,
            orient: data.legendOrient === undefined ? 'horizontal' : data.legendOrient,
            show: data.lengedShow === undefined ? true : data.lengedShow,
            data: data.legendData
        },
        calculable : true,
        series : [
            {
                name: data.Title,
                type:'pie',
                labelLine:{
                    normal:{
                      length: data.labelLineLength === undefined ? 5 : data.labelLineLength,
                    }
                },
                radius : data.radius === undefined ? '50%' : data.radius,
                center: ['50%', '50%'],
                itemStyle: {
                    normal: {
                    },
                    label: {
                        textStyle: {
                            color: '#333',
                            fontSize: '14px'
                        },
                        formatter: data.labelFomatter
                    }
                },
                data: data.seriesDataOne
            }
        ]
    };
    var myChartsOne = document.getElementById(id);
    var myChart = echarts.init(myChartsOne, {width: 'auto', height: 'auto'});
    myChart.setOption(option);
    myChart.resize()
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// 嵌套饼环图 双饼图

function doublePie(data, id) {
    option = {
        color: ['#33ADF6', '#23709C', '#EC5E35', '#92C6E4', '#30AAF8'],
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['一次延长审查起诉期限件数','二次延长审查起诉期限件数','三次延长审查起诉期限件数']
        },
        tooltip : {
            trigger: 'axis',
            // backgroundColor: 'rgba(255,255,255,0.7)',
            axisPointer: {
                type: 'shadow',
                shadowStyle : {                       // 阴影指示器样式设置
                    width: 1,                   // 阴影大小
                    color: 'rgba(150,150,150,0.3)'  // 阴影颜色
                }
            }
        },
        calculable : false,
        series : [
            {
                name: data.seriesName,
                type:'pie',
                selectedMode: 'single',
                radius : data.radiousInner,
                x: '20%',
                width: '40%',
                funnelAlign: 'right',
                max: 1548,
                itemStyle : {
                    normal : {
                        label : {
                            position : 'inner'
                        },
                        labelLine : {
                            show : false
                        }
                    }
                },
                data: data.dataInner
            },
            {
                name: data.seriesName,
                type:'pie',
                radius : data.radiousOuter,

                x: '60%',
                width: '35%',
                funnelAlign: 'left',
                max: 1048,
                itemStyle : {
                    normal : {
                        label : {
                            show: false,
                            position : 'inner'
                        },
                        labelLine : {
                            show : false
                        }
                    }
                },
                data: data.dataOuter
            }
        ]
    };
    // var ecConfig = require('echarts/config');
    // myChart.on(ecConfig.EVENT.PIE_SELECTED, function (param){
    //     var selected = param.selected;
    //     var serie;
    //     var str = '当前选择： ';
    //     for (var idx in selected) {
    //         serie = option.series[idx];
    //         for (var i = 0, l = serie.data.length; i < l; i++) {
    //             if (selected[idx][i]) {
    //                 str += '【系列' + idx + '】' + serie.name + ' : ' +
    //                     '【数据' + i + '】' + serie.data[i].name + ' ';
    //             }
    //         }
    //     }
    //     document.getElementById('wrong-message').innerHTML = str;
    // })
    var myChartsOne = document.getElementById(id);
    var myChart = echarts.init(myChartsOne, {width: 'auto', height: 'auto'});
    myChart.setOption(option);
    myChart.resize()
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// 进度条------------------------------------

function loadBar(data, id, fun) {
    option = {
        color: ['#3CD2A5', '#2186D1'],
        legend: {
            x: 'right',
            textStyle:{
                color:'#333',
            },
            show: data.lengedShow === undefined ? true : data.lengedShow,
            data: data.legendData
        },
        textStyle:{
            color: '#333',
            fontSize: '14px'
        },
        barWidth: '15px',
        grid: {
            left: '3%',
            right: '8%',
            top: data.gardTop,
            bottom: data.gridBottom,
            containLabel: true
        },
        tooltip: {
            show:"true",
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis:  {
            show: false,
            type: 'value',
            axisTick : {show: false},
            axisLine: {
                show: false,
                lineStyle:{
                    color:'#333',
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
                splitArea: {
                    show: false
                },
                type: 'category',
                axisTick : {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle:{
                        color:'#333',
                    }
                },
                data: data.yAxisData
        },
        series: data.seriesData
    };
    for (var i = 0; i< option.series.length; i++) {
        option.series[i].type = 'bar'
        option.series[i].itemStyle = {
            normal: {
                    show: true,
                    label: {
                    show: data.showLabel === undefined ? true: data.showLabel,
                    position: 'right'
                }
            }
        }
    }
    option.series[0].itemStyle.normal.label.formatter = fun.formatter1
    option.series[1].itemStyle.normal.label.formatter = fun.formatter2
    var myChartsOne = document.getElementById(id);
    var myChart = echarts.init(myChartsOne, {width: 'auto', height: 'auto'});
    myChart.setOption(option);
    myChart.resize()
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// 折线图

function lineCharts(data, id) {
    option = {
        color: ['#E35250', '#F8D63C', '#538DAE', '#919191', '#932ECD', '#F69B81', '#5460C3', '#AAD2E4', '#65DAB8'],
        tooltip : {
            trigger: 'axis',
            show: true,
            type: 'line',
            lineStyle : {          // 直线指示器样式设置
                color: '#48b',
                width: 50,
                type: 'solid'
            }
        },
        legend: {
            x: 'right',
            show: data.lengedShow === undefined ? true : data.lengedShow,
            data: data.lengedData
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : ['10%', '10%'],
                axisTick : {show: false},
                axisLine: {
                    show: false,
                    lineStyle:{
                        color:'#333',
                    }
                },
                data : data.xAxisData
            }
        ],
        yAxis : [
            {
              type : 'value',
              position: 'left',
              axisTick : {show: false},
              axisLine: {
                show: false,
                lineStyle:{
                    color:'#333'
                }
              }
            },
            {
              min: 0,
              max: 100,
              show: data.yAxisRightShow === undefined ? false : data.yAxisRightShow,
              type : 'value',
              position: 'right',
              axisLabel: {
                formatter: '{value}%'
              },
              axisTick : {show: false},
              axisLine: {
                show: false,
                lineStyle:{
                  color:'#333'
                }
              }
            }
        ],
        series : data.seriesData
    };
    for (var i = 0; i< option.series.length; i++) {
        option.series[i].symbol = 'none'
        option.series[i].smooth = true
        option.series[i].type = 'line'
    }
    var myChartsOne = document.getElementById(id);
    var myChart = echarts.init(myChartsOne, {width: 'auto', height: 'auto'});
    myChart.setOption(option);
    myChart.resize()
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// 散点图
function showSandian(id, data) {
    option  = {
        xAxis : [
            {
              min:1,
              max:12,
              type : 'value',
              axisTick : {show: false},
              data: data.xAxisData,
              boundaryGap : ['10%', '10%'],
              axisLabel : {
                formatter: '{value}月'
              }
            }
        ],
        yAxis : [
            {
              min:0,
              max:24,
              interval: 1,
              type : 'value',
              scale:true,
              axisLabel : {
                  formatter: '{value}：00'
              }
            }
        ],
        series : [
            {
                name:'女性',
                type:'scatter',
                itemStyle: {
                    normal: {
                        color: '#FF4D15'
                    }
                },
                data: data.seriesData
            }
        ]
    };
    var myChart = echarts.init(document.getElementById(id));
    myChart.resize()
    myChart.setOption(option)
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// 横向柱状图
function loadBar2(data, id) {
    option = {
        color: ['#3CD2A5', '#2186D1'],
        legend: {
            x: 'right',
            textStyle:{
                color:'#333',
            },
            show: data.lengedShow === undefined ? true : data.lengedShow,
            data: data.legendData
        },
        textStyle:{
            color: '#333',
            fontSize: '14px'
        },
        barWidth: '10px',
        grid: {
            left: '3%',
            right: '8%',
            top: data.gardTop,
            bottom: data.gridBottom,
            containLabel: true
        },
        tooltip: {
            show:"true",
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis:  {
            show: false,
            type: 'value',
            axisTick : {show: false},
            axisLine: {
                show: false,
                lineStyle:{
                    color:'#333',
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            splitArea: {
                show: false
            },
            type: 'category',
            axisTick : {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle:{
                    color:'#333',
                }
            },
            data: data.yAxisData
        },
        series: data.seriesData
    };
    for (var i = 0; i< option.series.length; i++) {
        option.series[i].type = 'bar'
        option.series[i].itemStyle = {
            normal: {
                show: true,
                color: function(params) {
                    var colorList = [
                        '#FE7C5D','#2FA9F7','#13AAD0','#247198','#FB7C5C',
                        '#2EABF8','#16AAD1','#24719A','#F3A43B','#60C0DD',
                        '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                    ];
                    return colorList[params.dataIndex]
                },
                label: {
                    show: data.showLabel === undefined ? true: data.showLabel,
                    position: 'right'
                }
            }
        }
    }
    option.series[0].itemStyle.normal.label.formatter = data.formatter1
    var myChartsOne = document.getElementById(id);
    var myChart = echarts.init(myChartsOne, {width: 'auto', height: 'auto'});
    myChart.setOption(option);
    myChart.resize()
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// 雷达图

function radida(data, id) {
    option = {
        title : {
            text: '',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            orient : 'vertical',
            x : 'right',
            y : 'bottom',
            data: data.legendData
        },
        polar : [
            {
                name: {
                  color:'#333'
                },
                indicator : [
                    { text: '危险驾驶罪', max: 100},
                    { text: '交通肇事罪', max: 100},
                    { text: '盗窃罪', max: 100},
                    { text: '抢劫罪', max: 100},
                    { text: '抢夺罪', max: 100},
                    { text: '故意杀人罪', max: 100},
                    { text: '故意伤害罪', max: 100},
                    { text: '毒品类犯罪', max: 100},
                    { text: '其他', max: 100}
                ]
            }
        ],
        calculable : true,
        series : [
            {
                name: '',
                type: 'radar',
                itemStyle: {
                    normal: {
                        color: '#2D6eBB',
                        textStyle: {
                            color: '#333'
                        },
                        areaStyle: {
                            type: 'default',
                            color: '#deeffd'
                        }
                    }
                },
                data : [
                    {value : [93, 75, 88, 35, 50, 19, 22, 14, 61]}
                ]
            }
        ]
    };
    var myChartsOne = document.getElementById(id);
    var myChart = echarts.init(myChartsOne, {width: 'auto', height: 'auto'});
    myChart.setOption(option);
    myChart.resize()
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// 字符云

function textCloud(data, id) {
    option = {
        title: {
            text: "",
            link: '',
            subtext: '',
            sublink: '',
        },
        tooltip: {},
        series: [{
            type: 'wordCloud',
            gridSize: 20,
            sizeRange: [12, 50],
            rotationRange: [0, 0],
            shape: 'circle',
            textStyle: {
                normal: {
                    color: function() {
                        return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: data.cloundData
        }]
    };
    var myChartsOne = document.getElementById(id);
    var myChart = echarts.init(myChartsOne, {width: 'auto', height: 'auto'});
    myChart.setOption(option);
    myChart.resize()
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}
