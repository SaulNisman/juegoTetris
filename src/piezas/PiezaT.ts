import { PiezaBase, Posicion } from "./PiezaBase";

export class PiezaT extends PiezaBase {
  constructor() {
    
    const bloquesIniciales: Posicion[] = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ];
    const pivote: Posicion = { x: 1, y: 1 };
    super("T", bloquesIniciales, pivote);
  }

  public rotarIzquierda(): void {
    this.rotarBloques("izquierda");
  }

  public rotarDerecha(): void {
    this.rotarBloques("derecha");
  }
}