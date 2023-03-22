import {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale } from "chart.js/auto";

ChartJS.register(CategoryScale)

export default function LineChart({data}){
    const [chartData, setChartData] = useState(null)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'right',
            },
            title: {
                display: true,
                font:{
                    size: 16,
                    weight: 'bold',
                },
                color: 'black',
                text: '항공권 가격 그래프',
            },
        }
    }
    

    useEffect(() => { 
        setChartData({
            labels: data.info.map((d) => d.date),
            datasets: [
                {
                    // label: 'Flight',
                    data: data.info.map((d) => d.price),
                    // backgroundColor: 'white',
                    // borderColor: '#1A2B88',
                    // borderWidth: 2,
                    pointStyle: false,
                }
            ]
        })
    }, [])
    return (
        <>
            {chartData && <Line options={options} data={chartData}/>}
        </>
    )
}