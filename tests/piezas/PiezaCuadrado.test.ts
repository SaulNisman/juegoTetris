import { describe, expect, it } from "vitest";
import { PiezaCuadrado } from "../../src/piezas/PiezaCuadrado";

describe("PiezaCuadrado", () => {
  it("tiene la forma de un cuadrado de 2x2", () => {
    const pieza = new PiezaCuadrado();

    expect(pieza.getNombre()).toBe("Cuadrado");
    expect(pieza.getBloques()).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]);
  });

  it("mantiene la misma forma al rotar", () => {
    const pieza = new PiezaCuadrado();

    pieza.rotarDerecha();
    pieza.rotarIzquierda();

    expect(pieza.getBloques()).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]);
  });
});
