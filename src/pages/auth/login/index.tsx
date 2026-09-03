import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "@/schemas/auth/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/services/auth/login.service";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/providers/AuthProvider";

function LoginPage() {

    const { register ,handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const navigate = useNavigate()
    const { saveUser } = useAuth()

    const onSubmit = async (data: LoginSchema) => {
        try {
            const loginData = await login(data);
            saveUser(loginData);
            toast.success("Login realizado com sucesso!");
            navigate("/vehicles");
        } catch (err) {
            
            if (err instanceof AxiosError) {
            const errorMessage = err.response?.data.message;
            toast.error(errorMessage || "Erro ao realizar login");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-gray-800 font-semibold text-[24px] text-center">
                Acesso ao Sistema de Estacionamento
            </h1>

            <p className="text-sm text-muted-foreground mb-4">
                Insira suas credenciais para continuar.
            </p>

            <Input
                id="email"
                label="E-mail"
                placeholder="seu@email.com"
                {...register("email")}
                error={errors.email?.message}
            />

            <Input
                id="password"
                type="password" 
                label="Senha"
                placeholder="*********"
                {...register("password")}
                error={errors.password?.message}
            />

            <Button className="w-full mt-4 p-5" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                    <Spinner />
                    Autenticando...
                    </>
                ) : "Entrar"}
            </Button>

            <Link to="/register" className="text-[14px] text-primary font-medium hover:underline">Não tem uma conta? Crie agora</Link>
        </form>
    );
}

export default LoginPage;
