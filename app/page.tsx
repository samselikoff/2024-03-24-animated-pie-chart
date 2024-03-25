"use client";

import * as d3 from "d3";
import { motion, useSpring, useTransform } from "framer-motion";
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

  return (
    <div>
      <svg
        viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        width={width}
        height={height}
      >
        <Slice pie={pies[0]} fill="#333" />
        <Slice pie={pies[1]} fill="#999" />
      </svg>

      <div className="mt-4">
        <button onClick={handleClick}>Change data</button>
      </div>
    </div>
  );
}

function Slice({ pie, fill }) {
  let { startAngle, endAngle } = pie;
  let animatedStartAngle = useSpring(startAngle);
  let animatedEndAngle = useSpring(endAngle);

  useEffect(() => {
    animatedStartAngle.set(startAngle);
    animatedEndAngle.set(endAngle);
  }, [animatedEndAngle, animatedStartAngle, endAngle, startAngle]);

  let d = useTransform(() => {
    return arc({
      ...pie,
      startAngle: animatedStartAngle.get(),
      endAngle: animatedEndAngle.get(),
    });
  });

  return <motion.path initial={false} style={{ d }} fill={fill} />;
}
