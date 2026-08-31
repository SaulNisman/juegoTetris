import { lRotador } from "./lRotador";

export interface Posicion {
  x: number;
  y: number;
}

export abstract class PiezaBase implements lRotador {
  protected nombre: string;
  protected bloques: Posicion[];

  constructor(nombre: string, bloques: Posicion[]) {
    if (bloques.length !== 4) {
      throw new Error("Toda pieza debe estar formada por exactamente 4 bloques.");
    }
    this.nombre = nombre;
    this.bloques = bloques;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getBloques(): Posicion[] {
    return this.bloques;
  }

  public abstract rotarIzquierda(): void;
  public abstract rotarDerecha(): void;
}