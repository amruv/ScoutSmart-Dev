
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
}

const StatCard = ({ title, value, change }: StatCardProps) => (
  <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-gray-200/10">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
    {change && (
      <p className="text-sm text-emerald-500 mt-1">
        {change}
      </p>
    )}
  </div>
);

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <StatCard 
        title="Goals" 
        value="23" 
        change="+2 vs last season"
      />
      <StatCard 
        title="Assists" 
        value="12" 
        change="+5 vs last season"
      />
      <StatCard 
        title="Minutes Played" 
        value="2,160" 
      />
    </div>
  );
};
