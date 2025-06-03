import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { LoginFormValues } from "@/interfaces/auth";

const schema = yup.object({
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup.string().required("Le mot de passe est requis"),
});

export default function LoginForm({
  onSubmit: onSubmitProp,
}: {
  onSubmit?: (data: LoginFormValues) => Promise<void>;
}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormValues) => {
    if (onSubmitProp) {
      await onSubmitProp(data);
      // Récupérer l'URL de redirection
      const redirectPath =
        localStorage.getItem("redirectAfterLogin") || "/dashboard";
      // Supprimer l'URL de redirection
      localStorage.removeItem("redirectAfterLogin");
      // Rediriger vers l'URL sauvegardée
      navigate(redirectPath);
    } else {
      await new Promise((r) => setTimeout(r, 1000));
      reset();
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl px-8 py-10 space-y-7"
      autoComplete="off"
    >
      <a
        href="/"
        className="flex items-center justify-center gap-2 mb-4 text-primary font-semibold hover:underline text-base"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Retour à l'accueil
      </a>
      <h2 className="text-3xl font-extrabold font-poppins text-primary mb-2 text-center tracking-tight">
        Connexion à TechShare
      </h2>
      <p className="text-center text-gray-500 mb-6 text-base font-inter">
        Accédez à votre espace en toute sécurité
      </p>
      <div className="space-y-4">
        <div className="relative">
          <Input
            label="Email"
            placeholder="Votre email"
            icon={Mail}
            type="email"
            {...register("email")}
            error={errors.email?.message}
            className="input-premium"
          />
        </div>
        <div className="relative">
          <Input
            label="Mot de passe"
            placeholder="••••••••"
            icon={Lock}
            type="password"
            showPasswordToggle
            {...register("password")}
            error={errors.password?.message}
            className="input-premium"
          />
        </div>
      </div>
      <Button
        type="submit"
        variant="ghost"
        size="lg"
        className="mx-auto block mt-2 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-200 hover:scale-[1.03] focus:ring-2 focus:ring-primary/40 bg-gray-100 text-black w-[220px]"
        isLoading={isSubmitting}
        rightIcon={
          isSubmitSuccessful ? (
            <CheckCircle2 className="ml-2 w-5 h-5 text-green-500" />
          ) : undefined
        }
        disabled={isSubmitting}
      >
        {isSubmitting ? "Connexion en cours..." : "Se connecter"}
      </Button>
      {isSubmitSuccessful && (
        <div className="flex items-center justify-center gap-2 text-green-600 font-medium mt-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5" /> Connexion réussie !
        </div>
      )}
      <div className="flex flex-col items-center gap-2 mt-4">
        <a
          href="#"
          className="text-xs text-primary hover:underline font-medium"
        >
          Mot de passe oublié ?
        </a>
        <span className="text-xs text-gray-500">
          Pas encore de compte ?{" "}
          <a
            href="/auth/register"
            className="text-primary font-semibold hover:underline"
          >
            S'inscrire
          </a>
        </span>
      </div>
    </motion.form>
  );
}
