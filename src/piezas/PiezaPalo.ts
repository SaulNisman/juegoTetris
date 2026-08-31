import { PiezaBase, Posicion } from "./PiezaBase";

export class PiezaPalo extends PiezaBase {
  constructor() {
    
    const bloquesIniciales: Posicion[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ];
    const pivote: Posicion = { x: 1.5, y: 0 };
    super("Palo", bloquesIniciales, pivote);
  }

  public rotarIzquierda(): void {
    this.rotarBloques("izquierda");
  }

  public rotarDerecha(): void {
    this.rotarBloques("derecha");
  }
}