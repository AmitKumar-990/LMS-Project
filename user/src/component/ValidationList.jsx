export default function ValidationList({ validations }) {
  const rules = [
    { label: "At least 8 characters", key: "length" },
    { label: "One uppercase letter", key: "uppercase" },
    { label: "One number", key: "number" },
    { label: "One special character", key: "special" },
  ];

  return (
    <ul className="mt-4 space-y-1">
      {rules.map((rule) => (
        <li key={rule.key} className="flex items-center gap-2 text-sm">
          <span
            className={`w-3 h-3 rounded-full ${
              validations[rule.key] ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
          {rule.label}
        </li>
      ))}
    </ul>
  );
}
