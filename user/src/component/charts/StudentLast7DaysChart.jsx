import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", students: 12 },
  { day: "Tue", students: 18 },
  { day: "Wed", students: 10 },
  { day: "Thu", students: 25 },
  { day: "Fri", students: 15 },
  { day: "Sat", students: 30 },
  { day: "Sun", students: 22 },
];

export default function StudentsLast7DaysChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="students" stroke="#2563eb" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
