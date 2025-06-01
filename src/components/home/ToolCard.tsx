import { MapPin, CheckCircle } from "lucide-react";

export type Tool = {
  id: number;
  name: string;
  price: string;
  location: string;
  status: string;
  image: string;
  description: string;
};

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden flex flex-col h-full border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <div className="relative h-48">
        <img
          src={tool.image}
          alt={tool.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary font-semibold text-sm px-4 py-1.5 rounded-xl shadow-sm">
          {tool.price}
        </span>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-['Poppins'] font-semibold text-xl text-primary mb-2">
          {tool.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{tool.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-sm text-gray-500 max-w-[60%]">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{tool.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-emerald-600 font-medium text-sm whitespace-nowrap">
              {tool.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
