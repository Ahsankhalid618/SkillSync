"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  CustomizedAxisTick,
} from "../../../@/components/ui/chart";
import pulse from "../../../public/pulse.png";
import Image from "next/image";

// Updated sample data for the radar chart
const chartData = [
  { item: "Problem Solving", hardSkills: 90, softSkills: 70 },
  { item: "API Integrations", hardSkills: 80, softSkills: 60 },
  { item: "Data Handling", hardSkills: 85, softSkills: 75 },
  { item: "Development", hardSkills: 95, softSkills: 80 },
  { item: "Data Management", hardSkills: 70, softSkills: 65 },
  { item: "Technology", hardSkills: 75, softSkills: 70 },
];

// Updated configuration for the radar chart
const chartConfig = {
  hardSkills: {
    label: "Hard SKills",
    color: "hsl(var(--chart-1))",
  },
  softSkills: {
    label: "Soft Skills",
    color: "hsl(var(--chart-2))",
  },
};

export function RadarChartComponent() {
  const containerRef = React.useRef(null);
  const [outerRadius, setOuterRadius] = React.useState(100);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    function update() {
      const rect = el.getBoundingClientRect();
  // compute radius as a smaller percentage so radar size remains compact
  // while labels can be moved outward via tick offset.
  const smaller = Math.min(rect.width, rect.height);
  // Use 18% of the smaller dimension with reasonable min/max caps.
  const radius = Math.max(40, Math.floor(smaller * 0.18));
      setOuterRadius(radius);
    }
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  return (
    <Card className="p-4  bg-[#0C0C0C] rounded-lg border-slate-600 w-full ">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-white flex gap-2">
          <Image src={pulse} width={20} height={10} alt="project-png" />
          Profile Skills Assessment
          </CardTitle>
        <CardDescription className="text-white">
          Assessing various skill sets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          // Provide an explicit height so Recharts' ResponsiveContainer can calculate sizes
          // and allow overflow so labels outside the radar aren't clipped.
          className="w-full h-[320px] md:h-[360px] lg:h-[380px] overflow-visible"
          ref={containerRef}
        >
          <RadarChart
            data={chartData}
            // Give extra margins so labels have room around the chart
            margin={{ top: 29, right: 29, left: 20, bottom: 29 }}
            className="text-white"
            outerRadius={outerRadius}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey="item"
              // Use our custom tick component to wrap long labels across lines
              // and provide an outward offset in pixels. We pass a function so
              // Recharts will call it with props that include cx/cy which we
              // forward to our component.
                tick={(props) => <CustomizedAxisTick {...props} offset={18} />}
              // remove lines for a cleaner look
              axisLine={false}
              tickLine={false}
            />
            <PolarGrid />
            <Radar
              dataKey="hardSkills"
              fill="var(--color-hardSkills)" // Ensure these variables are defined in your CSS
              fillOpacity={0.6}
              outerRadius={outerRadius}
            />
            <Radar
              dataKey="softSkills"
              fill="var(--color-softSkills)" // Ensure these variables are defined in your CSS
              outerRadius={outerRadius}
            />
            <ChartLegend className="mt-8" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4 text-xs lg:text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-white">
          Higher skills leads to higher growth <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground text-white">
          Assessing skills performance
        </div>
      </CardFooter>
    </Card>
  );
}
