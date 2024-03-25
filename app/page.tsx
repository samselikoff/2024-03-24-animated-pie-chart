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
  // let data = [1, 2];
  let [data, setData] = useState([1, 3]);
  // let data = [useSpring(1), useSpring(2)];

  // let progress = useMotionValue(1);
  function handleClick() {
    setData([2, 3]);
    // animate(progress, [0, 1]);

    // data[1].set(3);
  }

  let pies = d3.pie()(data);

  // let animatedDs = [useMotionValue(arc(pies[0])), useMotionValue(arc(pies[1]))];

  // let x = d3.interpolate(arc(pies[0]), arc(pies[1]));
  // let int = d3.interpolate(animatedDs[0].get(), arc(pies[0]));
  // let firstPie = useTransform(progress, (latest) => {
  //   return int(latest);
  // });
  let firstData = data[0];
  let firstPieData = useSpring(data[0]);
  useEffect(() => {
    firstPieData.set(firstData);
  }, [firstData, firstPieData]);

  let firstPie = useTransform(firstPieData, (latest) => {
    return arc(d3.pie()([latest, 3])[0]);
  });

  // let firstPieStartAngleState = pies[0].startAngle;
  // let firstPieStartAngle = useSpring(pies[0].startAngle);

  // useEffect(() => {
  //   firstPieStartAngle.set(firstPieStartAngleState);
  // }, [firstPieStartAngle, firstPieStartAngleState]);

  // let firstPie = useTransform(firstPieStartAngle, (latest) => {
  //   return arc({ ...pies[0], startAngle: latest });
  // });
  // let firstPie = arc
  // let firstPie = useTransform(
  //   progress,
  //   [0, 1],
  //   [animatedDs[0].get(), arc(pies[0])],
  //   {
  //     mixer: (a, b) => {
  //       // console.log("a", a);
  //       // console.log("b", b);
  //       let interpolator = d3.interpolate(a, b);
  //       return (x) => {
  //         return interpolator(x);
  //         // console.log(x);
  //       };
  //     },
  //   }
  //   // { mixer: d3.interpolate }
  // );
  // animate(ds[0], 2, )
  // let animatedDs = [arc(pies[0]), arc(pies[1])];
  // let animatedDs = [
  // useTransform(ds[0], [], [1], {mixer: d3.interpolate})

  // let pies = d3.pie()([data[0].get(), data[1].get()]);
  // let x = d3.interpolate(arc(pies[0]), arc(pies[1]));
  // // console.log(x);
  // // debugger;
  // let animatedDs = [useMotionValue(arc(pies[0])), useMotionValue(arc(pies[1]))];

  // useMotionValueEvent(data[1], "change", (latest) => {
  //   let pies = d3.pie()([data[0].get(), data[1].get()]);

  //   animatedDs[0].set(arc(pies[0]));
  //   animatedDs[1].set(arc(pies[1]));
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
