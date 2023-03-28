import {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale } from "chart.js/auto";

ChartJS.register(CategoryScale)

export default function LineChart({priceData}){
    const [chartData, setChartData] = useState(null)
    
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
                display: true, 
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
                    context.tooltip.labelPointStyles.forEach((point, index) => {
                        if(!point.pointStyle) {
                            // console.log(context);
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

                            bodyLines.forEach(function(body, i) {
                                if(i === index) {
                                    const span = '<span>' + body + '원</span>';
                                    innerHtml += '<tr><td style="font-size: 10px;">' + span + '</td></tr>';
                                }
                            });
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
        })
    }, [priceData])
    return (
        <>
            {chartData && <Line options={options} data={chartData}/>}
        </>
    )
}