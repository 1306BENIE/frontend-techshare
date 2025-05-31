import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { RegisterFormValues } from "@/interfaces/auth";

const schema = yup.object({
  name: yup.string().required("Le nom est requis"),
  email: yup.string().email("Email invalide").required("L'email est requis"),
  phone: yup
    .string()
    .matches(/^\+?\d{7,15}$/, "Numéro de téléphone invalide")
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

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    // TODO: Appel API d'inscription
    await new Promise((r) => setTimeout(r, 1200));
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-light">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-2xl shadow-waouh p-8 space-y-6"
        autoComplete="off"
      >
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">
          Créer un compte
        </h2>
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
        <Input
          label="Mot de passe"
          placeholder="••••••••"
          icon={Lock}
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          label="Confirmer le mot de passe"
          placeholder="••••••••"
          icon={Lock}
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
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
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
        >
          S'inscrire
        </Button>
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
    </div>
  );
}
