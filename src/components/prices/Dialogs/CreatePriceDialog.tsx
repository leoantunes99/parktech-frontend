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
import { createPriceSchema } from "@/schemas/prices/createPriceSchema"
import { createPrice } from "@/services/prices/prices.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface CreatePriceDialogProps {
    onSuccess: () => void;
};

export function CreatePriceDialog({onSuccess}: CreatePriceDialogProps) {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(createPriceSchema),
    });

    const onSubmit = async (data: createPriceSchema) => {
        try {
            await createPrice(data);
            toast.success("Preço criado com sucesso!");
            reset();
            setOpen(false);
            onSuccess();
        } catch (err) {
            if (err instanceof AxiosError) {
                const errorMessage = err.response?.data.message;
                toast.success(errorMessage || "Preço criado com sucesso!");
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-10">
                    <Plus />
                    Adicionar Preço
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Adicione um preço</DialogTitle>
                    <DialogDescription>
                        Preencha os dados necessários para adicionar um novo preço.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 p-4 pt-0">
                        <Input
                            id="firstHourPrice"
                            label="Preço primeira hora"
                            placeholder="ex: 15"
                            error={errors.firstHourPrice?.message}
                            {...register("firstHourPrice", {
                                valueAsNumber: true
                            })} />
                        <Input
                            id="additionalHourPrice"
                            label="Preço horas adicionais"
                            placeholder="ex: 10"
                            error={errors.additionalHourPrice?.message}
                            {...register("additionalHourPrice", {
                                valueAsNumber: true
                            })} />
                    </div>
                    <DialogFooter className="w-full items-center grid grid-cols-2">
                        <DialogClose asChild>
                            <Button className="p-5" variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button className="p-5" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Spinner /> Criando...
                                </>
                            ) : (
                                "Criar Preço"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}