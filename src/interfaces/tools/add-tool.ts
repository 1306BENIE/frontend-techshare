/**
 * Interface pour les données du formulaire d'ajout d'outil
 */
export interface AddToolFormData {
  /** Nom de l'outil */
  name: string;
  /** Description de l'outil */
  description: string;
  /** Prix de location par jour */
  price: number;
  /** Localisation de l'outil */
  location: string;
  /** Catégorie de l'outil */
  category: string;
  /** URL de l'image de l'outil */
  image: string;
  /** Statut de l'outil (disponible/indisponible) */
  status: "available" | "unavailable";
  /** Indique si l'outil est assuré */
  isInsured: boolean;
}

/**
 * Interface pour les props du composant AddTool
 */
export interface AddToolProps {
  /** Fonction appelée lors de la soumission du formulaire */
  onSubmit: (data: AddToolFormData) => void;
  /** État de chargement */
  loading?: boolean;
}
