import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", earning: 1200 },
  { day: "Tue", earning: 1500 },
  { day: "Wed", earning: 900 },
  { day: "Thu", earning: 2000 },
  { day: "Fri", earning: 1700 },
  { day: "Sat", earning: 2500 },
  { day: "Sun", earning: 2100 },
];

export default function EarningsLast7DaysChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorEarn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="earning"
          stroke="#16a34a"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorEarn)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
