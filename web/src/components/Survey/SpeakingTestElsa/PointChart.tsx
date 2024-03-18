// 'use client'
// import EChartsReact from "echarts-for-react"
// import React from "react"

// export interface props {
//     data: any
// }

// const PointChart = (prop: props) => {
//     let dataProp: any
//     let color: any

//     prop.data?.utterance.map((item: any) => {
//         dataProp = item
//     })

//     const score = Math.floor(dataProp?.nativeness_score)
//     score < 45
//         ? (color = "#d10c12")
//         : score < 65 && score >= 45
//         ? (color = "#fa7919")
//         : score >= 65 && score < 85
//         ? (color = "#0fa0dd")
//         : score >= 85
//         ? (color = "#005e12")
//         : null

//     const gaugeData = [
//         {
//             value: score,
//             name: "Perfect",
//             title: {
//                 offsetCenter: ["0%", "-10%"],
//             },
//             detail: {
//                 valueAnimation: true,
//                 offsetCenter: ["0%", "10%"],
//             },
//         },
//     ]
//     const option = {
//         series: [
//             {
//                 type: "gauge",
//                 startAngle: 90,
//                 endAngle: -270,
//                 pointer: {
//                     show: false,
//                 },
//                 progress: {
//                     show: true,
//                     overlap: false,
//                     roundCap: true,
//                     clip: false,
//                     itemStyle: {
//                         borderWidth: 1,
//                         color: color,
//                     },
//                 },
//                 axisLine: {
//                     lineStyle: {
//                         width: 20,
//                     },
//                 },
//                 splitLine: {
//                     show: false,
//                     distance: 0,
//                     length: 5,
//                 },
//                 axisTick: {
//                     show: false,
//                 },
//                 axisLabel: {
//                     show: false,
//                     distance: 60,
//                 },
//                 data: gaugeData,
//                 title: {
//                     fontSize: 20,
//                 },
//                 detail: {
//                     width: 60,
//                     height: 14,
//                     fontSize: 14,
//                     color: "inherit",
//                     borderColor: "inherit",
//                     borderRadius: 20,
//                     borderWidth: 1,
//                     formatter: "{value}%",
//                 },
//             },
//         ],
//     }
//     return (
//         <React.Fragment>
//             {/* {prop.data?.utterance.map((item: any, index: any) => (
//                 <div key={index}>{item.nativeness_score}</div>
//             ))} */}
//             {prop !== undefined ? <EChartsReact option={option} /> : <></>}
//         </React.Fragment>
//     )
// }

// export default PointChart
