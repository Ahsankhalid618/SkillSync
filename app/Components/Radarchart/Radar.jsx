"use client";

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
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
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
          className="w-full lg:aspect-square max-h-[280px] "
        >
          <RadarChart
            data={chartData}
            margin={{
              top: -40,
              bottom: -10,
            }}
            className="text-white"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="item" />
            <PolarGrid />
            <Radar
              dataKey="hardSkills"
              fill="var(--color-hardSkills)" // Ensure these variables are defined in your CSS
              fillOpacity={0.6}
            />
            <Radar
              dataKey="softSkills"
              fill="var(--color-softSkills)" // Ensure these variables are defined in your CSS
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
