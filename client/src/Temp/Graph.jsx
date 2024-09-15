import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const RADIAN = Math.PI / 180;
//
//     const radiusPercent = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const xPercent = cx + radiusPercent * Math.cos(-midAngle * RADIAN);
//     const yPercent = cy + radiusPercent * Math.sin(-midAngle * RADIAN);
//
//     const radiusName = outerRadius + 15;
//     const xName = cx + radiusName * Math.cos(-midAngle * RADIAN);
//     const yName = cy + radiusName * Math.sin(-midAngle * RADIAN);
//     return (
//         <>
//             <text x={xPercent} y={yPercent} fill="white" textAnchor={xPercent > cx ? 'start' : 'end'} dominantBaseline="central">
//                 {`${(percent * 100).toFixed()}%`}
//             </text>
//
//             <text x={xName} y={yName} fill="black" textAnchor={xPercent > cx ? 'start' : 'end'} dominantBaseline="central">
//                 { data[index].name }
//             </text>
//         </>
//
//     );
// };

export default function Graph() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    return (
        <div>
            <PieChart width={400} height={400}>
                <Tooltip/>
                <Pie
                    data={data}
                    dataKey="value"
                    outerRadius={100}
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                        const RADIAN = Math.PI / 180;

                        const radiusPercent = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const xPercent = cx + radiusPercent * Math.cos(-midAngle * RADIAN);
                        const yPercent = cy + radiusPercent * Math.sin(-midAngle * RADIAN);

                        const radiusName = outerRadius + 15;
                        const xName = cx + radiusName * Math.cos(-midAngle * RADIAN);
                        const yName = cy + radiusName * Math.sin(-midAngle * RADIAN);
                        return (
                            <>
                                <text x={xPercent} y={yPercent} fill="white" textAnchor={xPercent > cx ? 'start' : 'end'} dominantBaseline="central">
                                    {`${(percent * 100).toFixed()}%`}
                                </text>

                                <text x={xName} y={yName} fill="black" textAnchor={xPercent > cx ? 'start' : 'end'} dominantBaseline="central">
                                    { data[index].name }
                                </text>
                            </>

                        );
                    }}

                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={'red'} />
                    ))}
                </Pie>
            </PieChart>

            <PieChart width={400} height={400}>
                <Tooltip/>
                <Pie
                    data={data}
                    dataKey="value"
                    outerRadius={100}
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                        const RADIAN = Math.PI / 180;

                        const radiusPercent = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const xPercent = cx + radiusPercent * Math.cos(-midAngle * RADIAN);
                        const yPercent = cy + radiusPercent * Math.sin(-midAngle * RADIAN);

                        const radiusName = outerRadius + 15;
                        const xName = cx + radiusName * Math.cos(-midAngle * RADIAN);
                        const yName = cy + radiusName * Math.sin(-midAngle * RADIAN);
                        return (
                            <>
                                <text x={xPercent} y={yPercent} fill="white" textAnchor={xPercent > cx ? 'start' : 'end'} dominantBaseline="central">
                                    {`${(percent * 100).toFixed()}%`}
                                </text>

                                <text x={xName} y={yName} fill="black" textAnchor={xPercent > cx ? 'start' : 'end'} dominantBaseline="central">
                                    { data[index].name }
                                </text>
                            </>

                        );
                    }}

                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
  );
}
