import { PiezaBase, Posicion } from "./PiezaBase";

export type VarianteL = "izquierda" | "derecha";

export class PiezaL extends PiezaBase {
  private variante: VarianteL;

  constructor(variante: VarianteL) {
    const { bloques, pivote } = PiezaL.formaInicial(variante);
    super(`L-${variante}`, bloques, pivote);
    this.variante = variante;
  }

  private static formaInicial(variante: VarianteL): { bloques: Posicion[]; pivote: Posicion } {
    if (variante === "derecha") {
      
      return {
        bloques: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 2 },
        ],
        pivote: { x: 0, y: 1 },
      };
    }
    
    return {
      bloques: [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
      ],
      pivote: { x: 1, y: 1 },
    };
  }

  public getVariante(): VarianteL {
    return this.variante;
  }

  public rotarIzquierda(): void {
    this.rotarBloques("izquierda");
  }

  public rotarDerecha(): void {
    this.rotarBloques("derecha");
  }
}