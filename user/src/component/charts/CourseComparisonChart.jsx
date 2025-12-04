import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { course: "React", students: 80, earning: 12000 },
  { course: "Node.js", students: 60, earning: 9500 },
  { course: "Python", students: 100, earning: 18000 },
  { course: "Java", students: 50, earning: 7000 },
];

export default function CourseComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="course" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="students" fill="#2563eb" name="Students" />
        <Bar dataKey="earning" fill="#16a34a" name="Earnings" />
      </BarChart>
    </ResponsiveContainer>
  );
}
