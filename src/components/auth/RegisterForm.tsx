import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { RegisterFormValues } from "@/interfaces/auth";
import { useAuth } from "@/store/AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";

const schema = yup.object({
  name: yup.string().required("Le nom est requis"),
  email: yup.string().email("Email invalide").required("L'email est requis"),
  phone: yup
    .string()
    .matches(/^[+]?\d{7,15}$/, "Numéro de téléphone invalide")
    .required("Le téléphone est requis"),
  address: yup
    .string()
    .min(3, "Adresse trop courte")
    .required("L'adresse est requise"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est requis"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("La confirmation est requise"),
  cgu: yup
    .boolean()
    .oneOf(
      [true],
      "Vous devez accepter les CGU et la politique de confidentialité"
    )
    .default(false),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = React.useState<string | null>(null);

  const onSubmit = async (data: RegisterFormValues) => {
    setRegisterError(null);
    try {
      const success = registerUser(data.email, data.password);
      console.log(
        "registerUser called with:",
        data.email,
        data.password,
        "=>",
        success
      );
      if (success) {
        navigate("/auth/login");
      } else {
        setRegisterError("Cet email est déjà utilisé.");
      }
    } catch {
      setRegisterError(
        "Une erreur inattendue est survenue. Veuillez réessayer."
      );
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
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
      <h2 className="text-3xl font-bold text-primary mb-2 text-center">
        Créer un compte
      </h2>
      <p className="text-center text-gray-500 mb-6 text-base font-inter">
        Rejoignez la communauté TechShare en quelques secondes
      </p>
      <Input
        label="Nom"
        placeholder="Votre nom"
        icon={User}
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        placeholder="Votre email"
        icon={Mail}
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Téléphone"
          placeholder="Votre numéro de téléphone"
          icon={Phone}
          type="tel"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Input
          label="Adresse"
          placeholder="Votre adresse, ville ou code postal"
          icon={MapPin}
          {...register("address")}
          error={errors.address?.message}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Mot de passe"
          placeholder="••••••••"
          icon={Lock}
          type="password"
          showPasswordToggle
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          label="Confirmer le mot de passe"
          placeholder="••••••••"
          icon={Lock}
          type="password"
          showPasswordToggle
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="cgu"
          type="checkbox"
          {...register("cgu")}
          className="accent-primary w-4 h-4 rounded focus:ring-2 focus:ring-primary-light border-gray-300"
        />
        <label htmlFor="cgu" className="text-xs text-gray-700 select-none">
          J'accepte les{" "}
          <a href="#" className="text-primary underline">
            CGU
          </a>{" "}
          et la{" "}
          <a href="#" className="text-primary underline">
            politique de confidentialité
          </a>
        </label>
      </div>
      {errors.cgu && (
        <span className="text-danger text-xs block -mt-3 mb-2">
          {errors.cgu.message}
        </span>
      )}
      <div className="flex justify-center">
        <Button
          type="submit"
          variant="ghost"
          size="lg"
          className="mt-2 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-200 hover:scale-[1.03] focus:ring-2 focus:ring-primary/40 bg-gray-100 text-black w-[220px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
        </Button>
      </div>
      {registerError && (
        <span className="text-danger text-xs block mt-2 text-center">
          {registerError}
        </span>
      )}
      <p className="text-center text-sm text-gray-500">
        Vous avez déjà un compte ?{" "}
        <a
          href="/auth/login"
          className="text-primary font-semibold hover:underline"
        >
          Se connecter
        </a>
      </p>
    </motion.form>
  );
}
