"use client";

import * as d3 from "d3";
import {
  animate,
  animateValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  // let [data, setData] = useState([1, 2]);
  let width = 200;
  let height = 200;

  let data = [useSpring(1), useSpring(2)];
  // const data = [1, 1, 2, 3, 5, 8, 13, 21];
  // const data = [1, 2];

  // const color = d3
  //   .scaleOrdinal()
  //   .domain(data)
  //   .range(
  //     d3
  //       .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
  //       .reverse()
  //   );

  // const arc = d3
  //   .arc()
  //   .innerRadius((width / 2) * 0.67)
  //   .outerRadius(width / 2 - 1);

  // console.log(pies.map((pie) => arc(pie)));

  // return (
  //   <div>
  //     {data.map((value, i) => (
  //       <Slice
  //         allValues={data}
  //         index={i}
  //         fill={i === 0 ? "#eee" : "#333"}
  //         key={i}
  //       />
  //     ))}

  //     <div className="mt-4">
  //       <button onClick={() => setData([2, 5])}>Change data</button>
  //     </div>
  //   </div>
  // );

  function handleClick() {
    data[1].set(3);
  }

  let pies = d3.pie()([data[0].get(), data[1].get()]);
  let animatedDs = [useMotionValue(arc(pies[0])), useMotionValue(arc(pies[1]))];

  useMotionValueEvent(data[1], "change", (latest) => {
    let pies = d3.pie()([data[0].get(), data[1].get()]);

    animatedDs[0].set(arc(pies[0]));
    animatedDs[1].set(arc(pies[1]));
  });

  return (
    <div>
      <svg
        viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        width={width}
        height={height}
      >
        {data.map((value, i) => (
          <motion.path
            initial={false}
            key={i}
            // animate={{ d: arc(pie) }}
            // d={arc(pie)}
            style={{ d: animatedDs[i] }}
            // d={d}
            // fill={color(pie.data)}
            fill={i === 0 ? "#eee" : "#333"}
          />
          // <Slice
          //   allValues={data}
          //   index={i}
          //   fill={i === 0 ? "#eee" : "#333"}
          //   key={i}
          // />
        ))}
      </svg>

      <div className="mt-4">
        <button onClick={handleClick}>Change data</button>
      </div>
    </div>
  );
}

let arc = d3
  .arc()
  .innerRadius((200 / 2) * 0.67)
  .outerRadius(200 / 2 - 1);

function Slice({ allValues, index, fill }) {
  // let animatedValue = useSpring(allValues[index]);
  useEffect(() => {
    let newValue = allValues[index];
    animatedValue.set(newValue);
    // console.log(value);
  }, [allValues, animatedValue, index]);

  let pies = d3.pie()(allValues);
  let d = arc(pies[index]);

  let animatedD = useMotionValue(d);

  // let animatedValue = useSpring(value);

  // useMotionValueEvent(animatedValue, "change", console.log);

  useEffect(() => {
    const pies = d3.pie()(allValues);
    let newD = arc(pies[index]);
    animatedD.set(newD);

    // console.log(value);
    // animatedValue.set(value);
  }, []);
  // useEffect(() => {
  //   const pies = d3.pie()(allValues);
  //   let newD = arc(pies[index]);

  //   animatedD.set(newD);
  // }, [allValues, animatedD, arc, index]);
  // useEffect(() => {
  //   let newD = arc(pie);
  //   console.log(newD);
  //   animate(d, newD);
  // }, [arc, d, pie]);

  // console.log(arc(pie));

  return (
    <motion.path
      initial={false}
      // animate={{ d: arc(pie) }}
      // d={arc(pie)}
      style={{ d: animatedD }}
      // d={d}
      // fill={color(pie.data)}
      // fill={i === 0 ? "#eee" : "#333"}
      fill={fill}
    />
  );
}
