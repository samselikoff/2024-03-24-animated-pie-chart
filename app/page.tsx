"use client";

import * as d3 from "d3";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

let arc = d3
  .arc()
  .innerRadius((200 / 2) * 0.67)
  .outerRadius(200 / 2 - 1);

export default function Home() {
  let width = 200;
  let height = 200;
  let [data, setData] = useState([1, 3]);

  function handleClick() {
    setData([2, 3]);
  }

  let pies = d3.pie()(data);

  let firstDataStartAngleRaw = pies[0].startAngle;
  let firstDataStartAngle = useSpring(firstDataStartAngleRaw);

  useEffect(() => {
    firstDataStartAngle.set(firstDataStartAngleRaw);
  }, [firstDataStartAngle, firstDataStartAngleRaw]);

  let firstPie = useTransform(() => {
    return arc({ ...pies[0], startAngle: firstDataStartAngle.get() });
  });

  // let firstData = data[0];
  // let firstPieData = useSpring(data[0]);

  // useEffect(() => {
  //   firstPieData.set(firstData);
  // }, [firstData, firstPieData]);

  // let firstPie = useTransform(firstPieData, (latest) => {
  //   return arc(d3.pie()([latest, 3])[0]);
  // });

  return (
    <div>
      <svg
        viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        width={width}
        height={height}
      >
        <motion.path
          initial={false}
          // style={{ d: animatedDs[0] }}
          style={{ d: firstPie }}
          fill={"#333"}
        />
        {/* {data.map((value, i) => (
          <motion.path
            initial={false}
            key={i}
            d={animatedDs[i]}
            fill={i === 0 ? "#eee" : "#333"}
          />
        ))} */}
      </svg>

      <div className="mt-4">
        <button onClick={handleClick}>Change data</button>
      </div>
    </div>
  );
}

// function Slice({value}) {
//   let animatedValue = useSpring(value);

//   useEffect(() => {
//     animatedValue.set(value);
//   }, [animatedValue, value]);

//   let d = useTransform(animatedValue, (latest) => {
//     return arc(d3.pie()([latest, 3])[0]);
//   });

//   return (
//     <motion.path
//       initial={false}
//       // style={{ d: animatedDs[0] }}
//       style={{ d }}
//       fill={"#333"}
//     />
//   );
// }
