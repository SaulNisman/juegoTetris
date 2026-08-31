import { lRotador } from "./lRotador";

export interface Posicion {
  x: number;
  y: number;
}

export abstract class PiezaBase implements lRotador {
  protected nombre: string;
  protected bloques: Posicion[];
  protected pivote: Posicion;

  constructor(nombre: string, bloques: Posicion[], pivote: Posicion) {
    if (bloques.length !== 4) {
      throw new Error("Toda pieza debe estar formada por exactamente 4 bloques.");
    }
    this.nombre = nombre;
    this.bloques = bloques;
    this.pivote = pivote;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getBloques(): Posicion[] {
    return this.bloques;
  }

  
  protected rotarBloques(sentido: "izquierda" | "derecha"): void {
    this.bloques = this.bloques.map(({ x, y }) => {
      const dx = x - this.pivote.x;
      const dy = y - this.pivote.y;
      const [ndx, ndy] = sentido === "derecha" ? [-dy, dx] : [dy, -dx];
      return { x: this.pivote.x + ndx, y: this.pivote.y + ndy };
    });
  }

  public abstract rotarIzquierda(): void;
  public abstract rotarDerecha(): void;
}