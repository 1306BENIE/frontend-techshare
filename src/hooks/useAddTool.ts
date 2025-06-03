import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toolService } from "@/services/toolService";
import type { AddToolFormData } from "@/interfaces/tools/add-tool";

/**
 * Hook personnalisé pour gérer l'ajout d'un outil
 */
export const useAddTool = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const addTool = async (data: AddToolFormData) => {
    try {
      setLoading(true);
      setError(null);

      await toolService.createTool(data);

      // Rediriger vers la liste des outils après création
      navigate("/tools");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addTool,
    loading,
    error,
  };
};
