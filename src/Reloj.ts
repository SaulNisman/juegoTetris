import { PiezaBase } from "./piezas/PiezaBase";

export class Reloj {
  private contador: number;
  private piezas: PiezaBase[];
  private piezaActual: PiezaBase | null;

  constructor() {
    this.contador = 0;
    this.piezas = [];
    this.piezaActual = null;
  }

  public tick(): void {
    this.contador++;
  }

  public getContador(): number {
    return this.contador;
  }

  public agregarPieza(pieza: PiezaBase): void {
    this.piezas.push(pieza);
  }

  public getPiezas(): PiezaBase[] {
    return this.piezas;
  }

  public setPiezaActual(pieza: PiezaBase): void {
    this.piezaActual = pieza;
  }

  public getPiezaActual(): PiezaBase | null {
    return this.piezaActual;
  }
}