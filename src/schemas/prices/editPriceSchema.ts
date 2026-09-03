import z from "zod";

export const editPriceSchema = z.object({
    additionalHourPrice: z.number().min(5, "O preço é obrigatório").optional(),
    firstHourPrice: z.number().min(5, "O preço é obrigatório").optional(),
    isActive: z
        .string()
        .optional()
        .transform((data) => data === "true")
});

export type EditPriceSchema = z.infer<typeof editPriceSchema>;