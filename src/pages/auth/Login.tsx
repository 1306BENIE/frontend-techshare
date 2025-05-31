import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import type { LoginFormValues } from "@/interfaces/auth";

const schema = yup.object({
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup.string().required("Le mot de passe est requis"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormValues) => {
    // TODO: Appel API de connexion
    await new Promise((r) => setTimeout(r, 1000));
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
          Connexion
        </h2>
        <Input
          label="Email"
          placeholder="Votre email"
          icon={Mail}
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Mot de passe"
          placeholder="••••••••"
          icon={Lock}
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
        >
          Se connecter
        </Button>
        <div className="flex flex-col items-center gap-2 mt-2">
          <a href="#" className="text-xs text-primary hover:underline">
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
    </div>
  );
}
