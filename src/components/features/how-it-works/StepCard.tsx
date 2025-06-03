import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function StepCard({
  icon: Icon,
  title,
  description,
  index,
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
        {index + 1}
      </div>
      <div className="mt-4 mb-6">
        <Icon className="w-12 h-12 text-cyan-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
