export interface Login {
    usuario: string,
    password: string
}

export interface ICuenta {
    idUsuario: number,
    idCuenta?: number,
    tamanio: number,
    empresa?: string,
    fechaCreacion?: Date
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

// Definición de los tipos en 'definitions.ts'

export interface IUser {
    idUsuario: number;
    nombre: string;
    apellido: string;
    email: string;
    usuario1: string;
    contrasena: string;
    errorMessage?: string; 
}

export interface IToken {
    token: string;
    user: IUser;
    iat: number;  
    exp: number; 
    jti: string;
}

export interface ISession {
    user: IToken;
}
  

export interface IPnl {
    pnl: number,
    fecha: Date
}