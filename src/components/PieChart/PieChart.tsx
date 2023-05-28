import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartPieChart,
  ResponsiveContainer,
} from "recharts";
import React from "react";

import { CustomPieChartLabel } from "./CustomPieChartLabel";
import CustomPieChartLegend from "./CustomPieChartLegend";

interface PieChartProps {
  data: PieChart[];
  centerText: {
    title: number;
    value: string;
  };
}

const PieChart = ({ data, centerText }: PieChartProps) => (
  <ResponsiveContainer width="100%" height={208}>
    <RechartPieChart>
      <Pie
        data={data}
        startAngle={90}
        endAngle={-360}
        innerRadius={60}
        outerRadius={94}
        dataKey="uv"
        blendStroke={true}
        label={(label) => (
          <CustomPieChartLabel
            centerText={centerText}
            cx={label.cx}
            cy={label.cy}
          />
        )}
        labelLine={false}
      >
        {data.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </RechartPieChart>
  </ResponsiveContainer>
);

export interface PieChart {
  firstLanguage: string;
  secondLanguage: string;
  uv: number;
}

export const COLORS = [
  "#75B726",
  "#002D5C",
  "#33577D",
  "#4D6C8D",
  "#66819D",
  "#8096AD",
  "#99ABBE",
  "#B3C0CE",
  "#CCD5DE",
];

export default PieChart;
