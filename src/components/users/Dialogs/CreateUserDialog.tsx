import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { createUserSchema } from "@/schemas/users/createUserSchema"
import { createUser } from "@/services/users/users.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface CreateUserDialogProps {
    onSuccess: () => void;
}

export function CreateUserDialog({ onSuccess }: CreateUserDialogProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(createUserSchema),
    });

    const [open, setOpen] = useState(false);

    const onSubmit = async (data: createUserSchema) => {
        try {
            await createUser(data);
            toast.success("Usuário criado com sucesso!");
            setOpen(false);
            onSuccess();
            reset();
        } catch (err) {
            if (err instanceof AxiosError) {
                const errorMessage = err.response?.data.message;
                toast.success(errorMessage || "Usuário criado com sucesso!");
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-10">
                    <Plus />
                    Adicionar Usuário
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Adicione um usuário</DialogTitle>
                    <DialogDescription>
                        Preencha os dados necessários para adicionar um novo usuário.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 p-4 pt-0">
                        <Input
                            id="name"
                            label="Nome"
                            placeholder="João"
                            error={errors.name?.message}
                            {...register("name")} />
                        <Input
                            id="email"
                            label="E-mail"
                            placeholder="ex: joao@email.com"
                            error={errors.email?.message}
                            {...register("email")} />
                        <Input
                            id="password"
                            label="Senha"
                            placeholder="********"
                            error={errors.password?.message}
                            {...register("password")} />
                    </div>
                    <DialogFooter className="w-full items-center grid grid-cols-2">
                        <DialogClose asChild>
                            <Button className="p-5" variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button className="p-5" type="submit" disabled={isSubmitting}> {
                            isSubmitting ? (
                                <>
                                    <Spinner />
                                    Criando...
                                </>
                            ) : (
                                "Criar Usuário"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}