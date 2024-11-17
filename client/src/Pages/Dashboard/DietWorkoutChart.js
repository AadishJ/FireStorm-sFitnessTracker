import
{
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register( BarElement, CategoryScale, LinearScale, Tooltip, Legend );
function DietWorkoutChart ()
{
    const data = {
        labels: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
        datasets: [
            {
                label: "Workout",
                data: [ 30, 60, 90, 40, 50, 70, 80 ],
                backgroundColor: "#FF0080",
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 20, // Add this line

            },
            {
                label: "Calories",
                data: [ 30, 40, 50, 100, 30, 65, 85 ],
                backgroundColor: "cyan",
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 20, // Add this line
                labelBorderRadius: 20,

            },
            {
                label: "Steps",
                data: [ 35, 85, 72, 94, 85, 90, 65 ],
                backgroundColor: "yellow",
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 20, // Add this line

            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 10,
                    callback: function ( value )
                    {
                        return value + '%';
                    },
                    color: 'white' // Set y-axis text color to white
                },
                grid: {
                    display: true,
                    color: 'white' // Set grid lines color to white
                }
            },
            x: {
                ticks: {
                    color: 'white' // Set x-axis text color to white
                },
                grid: {
                    display: true,
                    color: 'white' // Set grid lines color to white
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Goal Progress',
                color: 'white' // Set title text color to white
            },
            legend: {
                labels: {
                    color: 'white', // Set legend text color to white
                    usePointStyle: true, // Use point style for legend
                    pointStyle: 'rectRounded' // Set legend point style to rounded rectangle
                }
            }
        }
    };

    return (
        <div className="w-3/5">
            <h2 className="text-center text-4xl font-bold mb-4 text-white font-outfit">Goal Progress</h2>
            <Bar data={ data } options={ options } className="">
            </Bar>
        </div>
    );
}

export default DietWorkoutChart;