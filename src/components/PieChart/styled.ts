import { styled } from "@mui/material";

export const Text = styled("text")<{ variant?: string }>(
  ({ theme, variant }) => ({
    fontWeight: 500,
    fontSize: "40px",
    lineHeight: "49px",
    fill: "#66819D",

    ...(variant === "small" && {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "14px",
      fill: "#4D6C8D",
    }),
  })
);

export const LegendWrapper = styled("table")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const Legend = styled("tr")({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
});

export const Row = styled("tr")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const Index = styled("td")(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
  lineHeight: theme.typography.body1.lineHeight,
  color: "#1A426C",
  marginRight: "14px",
}));

export const Value = styled("td")(({ theme }) => ({
  color: "#1A426C",
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
  lineHeight: theme.typography.body1.lineHeight,
  // marginRight: "35px",
  width: "165px",
}));

export const Percent = styled("td")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.body2.fontSize,
  lineHeight: theme.typography.body2.lineHeight,
  color: "#B2B7BC",
}));
