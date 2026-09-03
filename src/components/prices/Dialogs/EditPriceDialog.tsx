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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { editPriceSchema, type EditPriceSchema } from "@/schemas/prices/editPriceSchema"
import { editPrice } from "@/services/prices/prices.service"
import type { Price } from "@/types/prices.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { Edit } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

interface EditPriceDialogProps {
    editingPrice: Price
    onSuccess: () => void;
}

export function EditPriceDialog({ editingPrice, onSuccess }: EditPriceDialogProps) {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(editPriceSchema),
        defaultValues: {
            additionalHourPrice: editingPrice.additionalHourPrice,
            firstHourPrice: editingPrice.firstHourPrice,
            isActive: editingPrice.isActive.toString()
        }
    });

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            reset({
                additionalHourPrice: editingPrice.additionalHourPrice,
                firstHourPrice: editingPrice.firstHourPrice,
                isActive: editingPrice.isActive.toString()
            });
        }
        setOpen(isOpen);
    };

    const onSubmit = async (data: EditPriceSchema) => {
        try {
            await editPrice({ id: editingPrice.id, ...data });
            toast.success("Preço editado com sucesso!");
            reset();
            setOpen(false);
            onSuccess();
        } catch (err) {
            if (err instanceof AxiosError) {
                const errorMessage = err.response?.data.message;
                toast.success(errorMessage || "Preço editado com sucesso!");
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button size="icon-sm" variant="outline">
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Edite o preço</DialogTitle>
                    <DialogDescription>
                        Preencha os dados abaixo para alterar um preço.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 pl-4 pr-4 pb-1">
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
                    <Controller
                        name="isActive"
                        control={control}
                        render={({ field }) => {
                            return (
                                <>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value?.toString()}
                                    >
                                        <SelectGroup>
                                            <SelectLabel className="mt-2">Status</SelectLabel>
                                            <SelectTrigger className="w-98 h-11! ml-3 mb-4">
                                                <SelectValue className="text-black" placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Ativo</SelectItem>
                                                <SelectItem value="false">Inativo</SelectItem>
                                            </SelectContent>
                                        </SelectGroup>
                                    </Select>
                                    {errors && errors.isActive?.message && (
                                        <p className="text-red-500 text-[12px]">
                                            {errors.isActive?.message}
                                        </p>
                                    )}
                                </>
                            );
                        }}
                    />

                    <DialogFooter className="w-full items-center grid grid-cols-2">
                        <DialogClose asChild>
                            <Button className="p-5" variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button className="p-5" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Spinner /> Editando...
                                </>
                            ) : (
                                "Editar Preço"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}