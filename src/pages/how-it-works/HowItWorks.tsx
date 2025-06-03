import {
  Search,
  ShieldCheck,
  Clock,
  CreditCard,
  Star,
  Users,
} from "lucide-react";
import StepCard from "@/components/features/how-it-works/StepCard";
import FeatureCard from "@/components/features/how-it-works/FeatureCard";

const steps = [
  {
    icon: Search,
    title: "Trouvez l'outil idéal",
    description:
      "Parcourez notre catalogue d'outils technologiques et trouvez celui qui correspond à vos besoins.",
  },
  {
    icon: Clock,
    title: "Réservez en quelques clics",
    description:
      "Choisissez vos dates de location et réservez instantanément l'outil de votre choix.",
  },
  {
    icon: CreditCard,
    title: "Paiement sécurisé",
    description:
      "Effectuez votre paiement en toute sécurité via notre plateforme de paiement intégrée.",
  },
  {
    icon: Users,
    title: "Récupérez l'outil",
    description:
      "Récupérez l'outil auprès du propriétaire aux dates convenues.",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Assurance incluse",
    description:
      "Tous nos outils sont assurés pour une tranquillité d'esprit totale.",
  },
  {
    icon: Star,
    title: "Qualité garantie",
    description:
      "Nous vérifions chaque outil pour garantir son bon fonctionnement.",
  },
  {
    icon: Users,
    title: "Communauté fiable",
    description:
      "Notre système de notation permet de s'assurer de la fiabilité des utilisateurs.",
  },
  {
    icon: Clock,
    title: "Flexibilité",
    description:
      "Choisissez la durée de location qui vous convient, de quelques heures à plusieurs semaines.",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Comment ça marche ?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TechShare simplifie la location d'outils technologiques. Découvrez
              comment notre plateforme peut vous aider à accéder aux équipements
              dont vous avez besoin.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Le processus en 4 étapes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StepCard key={index} {...step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Pourquoi choisir TechShare ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Rejoignez notre communauté et commencez à louer ou à partager vos
            outils technologiques dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tools"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-colors"
            >
              Explorer les outils
            </a>
            <a
              href="/auth/register"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-cyan-600 bg-cyan-50 hover:bg-cyan-100 transition-colors"
            >
              Créer un compte
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
