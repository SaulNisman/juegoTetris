import { PiezaBase, Posicion } from "./PiezaBase";

export type VariantePerro = "izquierda" | "derecha";

export class PiezaPerro extends PiezaBase {
  private variante: VariantePerro;

  constructor(variante: VariantePerro) {
    const { bloques, pivote } = PiezaPerro.formaInicial(variante);
    super(`Perro-${variante}`, bloques, pivote);
    this.variante = variante;
  }

  private static formaInicial(variante: VariantePerro): { bloques: Posicion[]; pivote: Posicion } {
    if (variante === "derecha") {
      
      return {
        bloques: [
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
        ],
        pivote: { x: 1, y: 1 },
      };
    }
  
    return {
      bloques: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      pivote: { x: 1, y: 1 },
    };
  }

  public getVariante(): VariantePerro {
    return this.variante;
  }

  public rotarIzquierda(): void {
    this.rotarBloques("izquierda");
  }

  public rotarDerecha(): void {
    this.rotarBloques("derecha");
  }
}