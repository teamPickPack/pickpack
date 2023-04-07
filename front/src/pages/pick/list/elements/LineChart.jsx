import {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale } from "chart.js/auto";

export default function LineChart({priceData, onCompare, setLineChartPrice}){
    ChartJS.register(CategoryScale, {
        id: 'uniqueId',
        afterDraw: function (chart) {
            if (chart.tooltip._active && chart.tooltip._active.length && onCompare) {
                const activePoint = chart.tooltip._active[0];
                const ctx = chart.ctx;
                const x = activePoint.element.x;
                const topY = chart.scales.y.top;
                const bottomY = chart.scales.y.bottom;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#FF0000';
                ctx.stroke();
                ctx.restore();
            }}
        }
    );
    const [chartData, setChartData] = useState(null);
    const color = ['#FF0013', 'orange', '#1CC500', '#72A2FF', 'purple'];
    const options = {
        responsive: true,
        animation: false,
        plugins: {
            //라벨
            legend: {
                display: false,
            },
            //제목
            title: {
                display: onCompare? false : true, 
                font:{
                    size: 16,
                    weight: 'bold',
                },
                color: 'black',
                text: '항공권 가격 그래프',
            },
            tooltip: {
                enabled: false,
                external: function(context) {
                    if(context === undefined || context.tooltip === undefined || context.tooltip.labelPointStyles === undefined) {
                        return;
                    }
                    context.tooltip.labelPointStyles.forEach((point, index) => {
                        if(!point.pointStyle) {
                            return
                        };
                        // Tooltip Element
                        let tooltipEl = document.getElementById('chartjs-tooltip');
                        // Create element on first render
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.style.position = "relative";
                            tooltipEl.style.marginTop = "6px";
                            tooltipEl.id = 'chartjs-tooltip';
                            tooltipEl.innerHTML = '<table style="margin: 2px auto;"</table>';
                            if(!onCompare){
                                const indicator = document.createElement('div');
                                indicator.style.position = "absolute";
                                indicator.style.top = "-6px";
                                indicator.style.height = "0px";
                                indicator.style.width = "0px";
                                indicator.style.borderBottom = "6px solid black";
                                indicator.style.borderLeft = "6px solid black";
                                indicator.style.borderTop = "6px solid transparent";
                                indicator.style.borderRight = "6px solid transparent";
                                tooltipEl.appendChild(indicator);
                            }
                            document.body.appendChild(tooltipEl);
                        }

                        // Hide if no tooltip
                        const tooltipModel = context.tooltip;
                        if (tooltipModel.opacity === 0) {
                            tooltipEl.style.opacity = 0;
                            return;
                        }

                        // Set caret Position
                        tooltipEl.classList.remove('above', 'below', 'no-transform');
                        if (tooltipModel.yAlign) {
                            tooltipEl.classList.add(tooltipModel.yAlign);
                        } else {
                            tooltipEl.classList.add('no-transform');
                        }

                        function getBody(bodyItem) {
                            return bodyItem.lines;
                        }

                        // Set Text
                        if (tooltipModel.body) {
                            const titleLines = tooltipModel.title || [];
                            const bodyLines = tooltipModel.body.map(getBody);

                            let innerHtml = '<thead>';
                            titleLines.forEach(function(title) {
                                innerHtml += '<tr><th style="font-size: 10px; font-weight: bold;">' + title + '</th></tr>';
                            });
                            innerHtml += '</thead><tbody>';
                            // 얘는 두 개의 길이가 맞을 때...
                            if(bodyLines.length === priceData.length || priceData.length === undefined){
                                bodyLines.forEach(function(body, i) {
                                    if(onCompare){
                                        const span = '<div style="font-size: 10px; margin: -1px 0px 0px 2px;"> ' + body + '원</div>';
                                        const div = `<div style="width: 10px; height: 10px; border-radius: 2px; background-color: ${color[i]}"></div>`
                                        innerHtml += '<tr><td style= "display: flex; align-items: center;">' + div + span + '</td></tr>';
                                    }
                                    if(!onCompare && i === index) {
                                        const span = '<span>' + body + '원</span>';
                                        setLineChartPrice(Number(body[0].replaceAll(",","")));
                                        innerHtml += '<tr><td style="font-size: 10px;">' + span + '</td></tr>';
                                    }
                                });
                            }
                            else{
                                //첫 결과값이 몇 번쨰 priceData인지 알아야 함
                                //=> 타겟 가격이
                                for(let i = 0; i < bodyLines.length; i++){
                                    let targetNumber = Number(bodyLines[i][0].replaceAll(",",""));
                                    for(let j = 0; j < priceData.length; j++){
                                        for(let k = 0; k < priceData[j].info.length; k++){
                                            if(targetNumber === priceData[j].info[k].price && titleLines[0] === priceData[j].info[k].date){
                                                const span = '<div style="font-size: 10px; margin: -1px 0px 0px 2px;"> ' + bodyLines[i][0] + '원</div>';
                                                const div = `<div style="width: 10px; height: 10px; border-radius: 2px; background-color: ${color[j]}"></div>`
                                                innerHtml += '<tr><td style= "display: flex; align-items: center;">' + div + span + '</td></tr>';
                                            }
                                        }
                                    }
                                }
                            }
                            innerHtml += '</tbody>';

                            let tableRoot = tooltipEl.querySelector('table');
                            tableRoot.innerHTML = innerHtml;
                        }

                        const position = context.chart.canvas.getBoundingClientRect();

                        // Display, position, and set styles for font
                        tooltipEl.style.textAlign = 'center';
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.width = '80px';
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                        tooltipEl.style.borderRadius = '5px';
                        tooltipEl.style.backgroundColor = 'black';
                        tooltipEl.style.color = 'white';
                        tooltipEl.style.zIndex = '100';
                        
                        tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                        tooltipEl.style.pointerEvents = 'none';
                    })
                }
            }
        },
        scales: {
            x: {
                axis: 'x',
                title:{
                    display: true,
                    align: 'end',
                    color: '#808080',
                    font: {
                      size: 12,
                      family: "'Noto Sans KR', sans-serif",
                    },
                    text: '일자'
                },
                ticks: {
                    display: false,
                }
            },
            y: {
                axis: 'y',
                afterDataLimits: (scale) => {
                    scale.max = scale.max * 1.2;
                    scale.min = scale.min / 1.2;
                },
                title: { // 이 축의 단위 또는 이름도 title 속성을 이용하여 표시할 수 있습니다.
                    display: true,
                    align: 'end',
                    color: '#808080',
                    font: {
                      size: 12,
                      family: "'Noto Sans KR', sans-serif",
                    },
                    text: '단위: 원'
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(v) {
                        return v.toLocaleString('ko-kr');
                    }
                }
            },
        },
    }
    

    useEffect(() => {
        if(priceData.length === undefined){
            setChartData({
                labels: priceData.info.map((d) => d.date),
                datasets: [
                    {
                        data: priceData.info.map(() => priceData.avg),
                        backgroundColor: 'transparent',
                        borderColor: 'red',
                        borderWidth: 1,
                        pointStyle: false,
                    },
                    {
                        data: priceData.info.map((d) => d.price),
                        backgroundColor: 'transparent',
                        borderColor: '#1A2B88',
                        borderWidth: 2,
                        pointStyle: true,
                    },
                ]
            });
            return;
        }
        //반복문 돌면서
        let longestLabelLength = 0;
        const data = {
            labels: null,
            datasets: [],
        }
        for(let i = 0; i < priceData.length; i++){
            if(priceData[i].info.length > longestLabelLength){
                data.labels = priceData[i].info.map((d) => d.date);
                longestLabelLength = priceData[i].info.length;
            }
        }
        for(let i = 0; i < priceData.length; i++){
            const tmp =  [...priceData[i].info.map((d) => d.price)];
            for(let j = 0; j < longestLabelLength - priceData[i].info.length; j++){
                tmp.unshift(null);
            }
            data.datasets.push({
                data: tmp,
                backgroundColor: 'transparent',
                borderColor: onCompare? color[i] : 'black',
                borderWidth: 2,
                pointStyle: true,
            })
        }
        setChartData(data);
    }, [priceData])
    return (
        <>
            {chartData && <Line options={onCompare? {...options, interaction: {mode: 'index', intersect: false}} : options} data={chartData}/>}
        </>
    )
}