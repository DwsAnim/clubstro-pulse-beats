
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

const SectionHeader = ({ title, subtitle, action }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default SectionHeader;
