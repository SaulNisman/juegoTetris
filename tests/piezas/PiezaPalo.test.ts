import { describe, expect, it } from "vitest";
import { PiezaPalo } from "../../src/piezas/PiezaPalo";

describe("PiezaPalo", () => {
  it("crea un palo de longitud 4 en la fila superior", () => {
    const pieza = new PiezaPalo();

    expect(pieza.getNombre()).toBe("Palo");
    expect(pieza.getBloques()).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ]);
  });

  it("permite rotar sin perder bloques", () => {
    const pieza = new PiezaPalo();

    pieza.rotarDerecha();
    pieza.rotarIzquierda();

    expect(pieza.getBloques()).toHaveLength(4);
  });
});
