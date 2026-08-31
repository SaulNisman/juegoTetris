import { PiezaBase, Posicion } from "./PiezaBase";

export class PiezaCuadrado extends PiezaBase {
  constructor() {
    const bloquesIniciales: Posicion[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];
    const pivote: Posicion = { x: 0.2, y: 0.2 };
    super("Cuadrado", bloquesIniciales, pivote);
  }

  public rotarIzquierda(): void {
  }

  public rotarDerecha(): void {
  }
}