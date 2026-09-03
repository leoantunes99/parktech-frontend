import z from "zod";

export const createPriceSchema = z.object({
    additionalHourPrice: z.number().min(5, "O preço é obrigatório"),
    firstHourPrice: z.number().min(5, "O preço é obrigatório"),
});

export type createPriceSchema = z.infer<typeof createPriceSchema>;