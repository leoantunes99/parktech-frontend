import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/schemas/auth/registerSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/services/auth/register.service";
import { Spinner } from "@/components/ui/spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosError } from "axios";

function RegisterPage() {

    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
        resolver: zodResolver(registerSchema)
    });

    const navigate = useNavigate()

    const onSubmit = async (data: RegisterSchema) => {
        try {
            await registerUser({ role: "ADMIN", ...data });
            toast.success("Conta criada com sucesso!");
            navigate("/");
        } catch (err) {
            
            if (err instanceof AxiosError) {
            const errorMessage = err.response?.data.message;
            toast.error(errorMessage || "Erro ao criar conta");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-gray-800 font-semibold text-[24px] text-center">
                Crie sua conta no Sistema de Estacionamento
            </h1>

            <p className="text-sm text-muted-foreground mb-4">
                Insira seus dados para criar uma nova conta.
            </p>

            <Input
                id="name"
                label="Nome"
                placeholder="Seu nome aqui"
                {...register("name")}
                error={errors.name?.message}
            />

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

            <Button className="w-full mt-4 p-5" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Spinner />
                        Processando...
                    </>
                ) : "Criar conta" }
            </Button>

            <Link to="/" className="text-[14px] text-primary font-medium hover:underline">Já tem uma conta? Faça o Login</Link>
        </form>
    );
}

export default RegisterPage;
