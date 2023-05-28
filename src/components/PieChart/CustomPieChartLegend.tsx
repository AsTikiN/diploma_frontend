import React from "react";
import { Index, Legend, LegendWrapper, Percent, Value } from "./styled";

const CustomPieChartLegend = (props: any) => {
  const percent = props.payload
    .filter((p: any, index: number) => index >= 5)
    .reduce((prev: any, next: any, index: number) => {
      return prev + next.payload.percent;
    }, 0);

  return (
    <LegendWrapper>
      {props.payload
        .filter((p: any, index: number) => index <= 5)
        .map((entry: any, index: number) => (
          <Legend key={`item-${index}`}>
            <Index>{index + 1}.</Index>
            {index < 5 ? (
              <Value>
                {entry.payload.firstLanguage} <ArrowLegend />{" "}
                {entry.payload.secondLanguage}
              </Value>
            ) : (
              <Value>{"Other"}</Value>
            )}
            <Percent>
              {parseFloat(
                (index < 5
                  ? entry.payload.percent * 100
                  : percent * 100
                ).toString()
              ).toFixed(1)}
              %
            </Percent>
          </Legend>
        ))}
    </LegendWrapper>
  );
};

export const ArrowLegend = () => (
  <svg
    width="17"
    height="10"
    viewBox="0 0 17 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4243 5.42426C16.6586 5.18995 16.6586 4.81005 16.4243 4.57574L12.6059 0.757359C12.3716 0.523045 11.9917 0.523045 11.7574 0.757359C11.523 0.991674 11.523 1.37157 11.7574 1.60589L15.1515 5L11.7574 8.39411C11.523 8.62843 11.523 9.00833 11.7574 9.24264C11.9917 9.47696 12.3716 9.47696 12.6059 9.24264L16.4243 5.42426ZM0 5.6L16 5.6V4.4L0 4.4L0 5.6Z"
      fill="#395776"
    />
  </svg>
);

export default CustomPieChartLegend;
