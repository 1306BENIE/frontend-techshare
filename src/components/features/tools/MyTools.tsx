import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, AlertCircle } from "lucide-react";
import { Tool } from "@/interfaces/tools/tool";
import { toolService } from "@/services/toolService";
import { useNavigate } from "react-router-dom";

export default function MyTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      setLoading(true);
      const userTools = await toolService.getUserTools();
      setTools(userTools);
    } catch (err) {
      setError("Erreur lors du chargement de vos outils");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet outil ?")) {
      try {
        await toolService.deleteTool(id);
        setTools(tools.filter((tool) => String(tool.id) !== id));
      } catch (err) {
        setError("Erreur lors de la suppression de l'outil");
        console.error(err);
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/tools/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Vous n'avez pas encore d'outils
        </h2>
        <button
          onClick={() => navigate("/tools/add")}
          className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Ajouter un outil
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mes outils</h1>
        <button
          onClick={() => navigate("/tools/add")}
          className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Ajouter un outil
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative aspect-video">
              <img
                src={tool.image}
                alt={tool.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(String(tool.id))}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Edit className="w-5 h-5 text-cyan-500" />
                </button>
                <button
                  onClick={() => handleDelete(String(tool.id))}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {tool.name}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {tool.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-cyan-600 font-semibold">
                  {tool.price}
                </span>
                <span className="text-sm text-gray-500">{tool.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
