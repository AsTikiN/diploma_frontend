import React from "react";
import { Text } from "./styled";

interface CustomPieChartLabelProps {
  cx: number;
  cy: number;
  centerText: {
    title: number;
    value: string;
  };
}

const CustomPieChartLabel = ({
  cx,
  cy,
  centerText,
}: CustomPieChartLabelProps) => {
  return (
    <g>
      <Text x={cx} y={cy} textAnchor="middle">
        {centerText.title}
      </Text>
      <Text variant="small" x={cx} y={cy} dy={20} textAnchor="middle">
        {centerText.value}
      </Text>
    </g>
  );
};

export { CustomPieChartLabel };
