export interface Login {
    usuario: string,
    password: string
}

export interface User {
    id: number,
    username: string,
    email: string
}

export interface ICuenta {
    idUsuario: number,
    idCuenta: number,
    tamanio: number,
    empresa: string,
    fechaCreacion: Date
}

export interface CustomJwtPayload {
    unique_name?: string;
    nameid?: string;
    email?: string;
}

export interface ITrades {
    idTrade?: number,
    idCuenta: number,
    idTipoTrade: number,
    fechaEntrada: Date,
    fechaSalida?: Date,
    divisa: string,
    riesgo: number,
    margin: number,
    precioEntrada: number,
    precioSalida: number,
    takeProfit?: number,
    stopLoss?: number,
    tradePips: number,
    porcentajePnl: number,
    dineroPnl: number,
    nota?: string
}

export interface IUser {
    idUsuario?: number,
    nombre: string,
    apellido: string,
    email: string,
    usuario1: string,
    contrasena: string
}

export interface IPnl {
    pnl: number,
    fecha: Date
}