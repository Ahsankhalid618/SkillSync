"use client";
import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "../../lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = {
  light: "",
  dark: ".dark"
}

const ChartContext = React.createContext(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("UseChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
      <ChartContext.Provider value={{ config }}>
        <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          // Use responsive aspect ratios so radar charts have more vertical room on small screens
          // and allow overflow visible so labels placed outside the chart area aren't clipped.
          "flex aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-square justify-center overflow-visible text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}>
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
  );
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color)

  if (!colorConfig.length) return null

  const baseCss = Object.entries(THEMES)
    .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
      .map(([key, itemConfig]) => {
        const color = itemConfig.theme?.[theme] || itemConfig.color
        return color ? `  --color-${key}: ${color};` : null
      })
      .join("\n")}
}
`)
    .join("\n")

  const responsiveTickCss = `
@media (max-width: 640px) {
  [data-chart=${id}] .recharts-polar-angle-axis-tick_text { font-size: 9px; }
}
@media (min-width: 641px) and (max-width: 1024px) {
  [data-chart=${id}] .recharts-polar-angle-axis-tick_text { font-size: 12px; }
}
@media (min-width: 1025px) {
  [data-chart=${id}] .recharts-polar-angle-axis-tick_text { font-size: 14px; }
}
`

  return <style dangerouslySetInnerHTML={{ __html: baseCss + "\n" + responsiveTickCss }} />
}

// Customized axis tick for polar/radar charts.
// Splits multi-word labels into multiple <tspan> lines so long labels wrap and don't get clipped.
function CustomizedAxisTick({ x, y, payload, fill = '#cbd5e1', fontSize = 14, cx, cy, offset = 0 }) {
  // Compute an outward offset from the chart center (cx, cy) towards the
  // tick point (x, y). If cx/cy are available (provided by Recharts), move
  // the label along that radial vector by `offset` pixels.
  let drawX = x
  let drawY = y
  let textAnchor = 'middle'
  let dominantBaseline = 'central'

  const value = payload?.value ?? ''
  const text = String(value)
  const words = text.trim().split(/\s+/)

  if (!text) return null

  // If we have a center (cx, cy) and an offset, move the label outward.
  if (typeof cx === 'number' && typeof cy === 'number' && offset) {
    const dx = x - cx
    const dy = y - cy
    const len = Math.sqrt(dx * dx + dy * dy)
    if (len > 0) {
      const nx = dx / len
      const ny = dy / len
      drawX = x + nx * offset
      drawY = y + ny * offset

      // Choose appropriate text anchor based on horizontal direction
      if (Math.abs(nx) < 0.35) {
        textAnchor = 'middle'
      } else if (nx > 0) {
        textAnchor = 'start'
      } else {
        textAnchor = 'end'
      }

      // Vertical alignment: nudge baseline so multi-line wraps look natural
      if (ny > 0.5) {
        dominantBaseline = 'hanging'
      } else if (ny < -0.5) {
        dominantBaseline = 'baseline'
      } else {
        dominantBaseline = 'central'
      }
    }
  }

  if (words.length <= 1) {
    return (
      <text
        className="recharts-polar-angle-axis-tick_text"
        x={drawX}
        y={drawY}
        fill={fill}
        fontSize={fontSize}
        textAnchor={textAnchor}
        dominantBaseline={dominantBaseline}
      >
        {text}
      </text>
    )
  }

  return (
    <text
      className="recharts-polar-angle-axis-tick_text"
      x={drawX}
      y={drawY}
      fill={fill}
      fontSize={fontSize}
      textAnchor={textAnchor}
      dominantBaseline={dominantBaseline}
    >
      {words.map((w, i) => (
        <tspan key={i} x={drawX} dy={i === 0 ? '0' : '1.4em'}>
          {w}
        </tspan>
      ))}
    </text>
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef((
  {
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey,
  },
  ref
) => {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item.dataKey || item.name || "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? config[label]?.label || label
        : itemConfig?.label

    if (labelFormatter) {
      return (
        (<div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>)
      );
    }

    if (!value) {
      return null
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    (<div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}>
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = color || item.payload.fill || item.color

          return (
            (<div
              key={item.dataKey}
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center"
              )}>
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                          "h-2.5 w-2.5": indicator === "dot",
                          "w-1": indicator === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent":
                            indicator === "dashed",
                          "my-0.5": nestLabel && indicator === "dashed",
                        })}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor
                          }
                        } />
                    )
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    )}>
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="font-mono font-medium tabular-nums text-foreground">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>)
          );
        })}
      </div>
    </div>)
  );
})
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef((
  { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
  ref
) => {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    (<div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}>
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          (<div
            key={item.value}
            className={cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            )}>
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }} />
            )}
            {itemConfig?.label}
          </div>)
        );
      })}
    </div>)
  );
})
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config,
  payload,
  key
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey = key

  if (
    key in payload &&
    typeof payload[key] === "string"
  ) {
    configLabelKey = payload[key]
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === "string"
  ) {
    configLabelKey = payloadPayload[key]
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  CustomizedAxisTick,
}
