import { describe, expect, it } from "vitest";
import { PiezaBase, Posicion } from "../../src/piezas/PiezaBase";

class PiezaPrueba extends PiezaBase {
  constructor() {
    const bloques: Posicion[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];
    super("Prueba", bloques, { x: 0.5, y: 0.5 });
  }

  public rotarIzquierda(): void {
    this.rotarBloques("izquierda");
  }

  public rotarDerecha(): void {
    this.rotarBloques("derecha");
  }
}

describe("PiezaBase", () => {
  it("guarda nombre y bloques iniciales", () => {
    const pieza = new PiezaPrueba();

    expect(pieza.getNombre()).toBe("Prueba");
    expect(pieza.getBloques()).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]);
  });

  it("lanza error si una pieza no tiene exactamente 4 bloques", () => {
    expect(() => {
      class PiezaInvalida extends PiezaBase {
        constructor() {
          super("Invalida", [{ x: 0, y: 0 }, { x: 1, y: 0 }], { x: 0, y: 0 });
        }

        public rotarIzquierda(): void {}
        public rotarDerecha(): void {}
      }

      return new PiezaInvalida();
    }).toThrow("Toda pieza debe estar formada por exactamente 4 bloques.");
  });

  it("puede rotar en ambos sentidos sin cambiar la cantidad de bloques", () => {
    const pieza = new PiezaPrueba();

    pieza.rotarDerecha();
    expect(pieza.getBloques()).toHaveLength(4);

    pieza.rotarIzquierda();
    expect(pieza.getBloques()).toHaveLength(4);
  });
});
