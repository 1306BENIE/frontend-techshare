import type { AddToolFormData } from "@/interfaces/tools/add-tool";
import type { Tool } from "@/interfaces/tools/tool";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Service pour gérer les opérations liées aux outils
 */
export const toolService = {
  /**
   * Crée un nouvel outil
   */
  createTool: async (data: AddToolFormData): Promise<Tool> => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Non authentifié");
    }

    const response = await fetch(`${API_URL}/tools`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la création de l'outil");
    }

    return response.json();
  },

  /**
   * Récupère la liste des outils
   */
  getTools: async (): Promise<Tool[]> => {
    const response = await fetch(`${API_URL}/tools`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des outils");
    }
    return response.json();
  },

  /**
   * Récupère un outil par son ID
   */
  getToolById: async (id: string): Promise<Tool> => {
    const response = await fetch(`${API_URL}/tools/${id}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de l'outil");
    }
    return response.json();
  },

  /**
   * Met à jour un outil
   */
  updateTool: async (
    id: string,
    data: Partial<AddToolFormData>
  ): Promise<Tool> => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Non authentifié");
    }

    const response = await fetch(`${API_URL}/tools/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || "Erreur lors de la mise à jour de l'outil"
      );
    }

    return response.json();
  },

  /**
   * Supprime un outil
   */
  deleteTool: async (id: string): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Non authentifié");
    }

    const response = await fetch(`${API_URL}/tools/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || "Erreur lors de la suppression de l'outil"
      );
    }
  },
};
