"use client";

import * as d3 from "d3";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

let arc = d3.arc();
let pie = d3.pie().sort(null);

let width = 200;
let height = 200;

let colors = ["#333", "#999", "#ccc"];

export default function Home() {
  let [data, setData] = useState([1, 2, 5]);

  function handleClick() {
    if (data[0] === 1) {
      setData([2, 5, 4]);
    } else {
      setData([1, 2, 5]);
    }
  }

  let pies = pie(data);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <svg
        viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        width={width}
        height={height}
      >
        {pies.map((pie, i) => (
          <Slice key={i} pie={pie} fill={colors[i]} />
        ))}
      </svg>

      <div className="mt-8">
        <button
          className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={handleClick}
        >
          Change data
        </button>
      </div>
    </div>
  );
}

function Slice({ pie, fill }: { pie: d3.PieArcDatum<number>; fill: string }) {
  let { startAngle, endAngle } = pie;
  let animatedStartAngle = useSpring(startAngle, { bounce: 0 });
  let animatedEndAngle = useSpring(endAngle, { bounce: 0 });

  useEffect(() => {
    animatedStartAngle.set(startAngle);
    animatedEndAngle.set(endAngle);
  }, [animatedEndAngle, animatedStartAngle, endAngle, startAngle]);

  let d = useTransform(() =>
    arc({
      startAngle: animatedStartAngle.get(),
      endAngle: animatedEndAngle.get(),
      innerRadius: (200 / 2) * 0.67,
      outerRadius: 200 / 2 - 1,
    })
  );

  return <motion.path initial={false} style={{ d }} fill={fill} />;
}
