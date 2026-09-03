import type { VehicleStatus } from "@/types/vehicles.types";

export function formatDate(dateParam: string | Date) {

    const date = typeof dateParam === "string" ? new Date(dateParam) : dateParam;

    const formater = new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);

    return formater;
};

export function getStayTime(entryTime: string | Date) {

    const now = new Date();
    const entry = typeof entryTime === "string" ? new Date(entryTime) : entryTime;

    const totalTime = now.getTime() - entry.getTime();

    const totalMinutes = Math.floor(totalTime / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}min`;
};

export function getVehiclesStatus(status: VehicleStatus) {
    const options = {
        ["ACTIVE"]: "Estacionado",
        ["FINISHED"]: "Saída Registrada"
    }

    return options[status]
}

export function formatDateToDMY(dateParam: string | Date) {
    const date = typeof dateParam === "string" ? new Date(dateParam) : dateParam;

    const formater = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).format(date);

    return formater;
}

export function formatCurrency(value?: string | number) {

    const formater = new Intl.NumberFormat('pt-BR', {
        style: "currency",
        currency: "BRL"
    }).format(Number(value));

    return formater;
};