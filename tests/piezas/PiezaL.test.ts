import { describe, expect, it } from "vitest";
import { PiezaL } from "../../src/piezas/PiezaL";

describe("PiezaL", () => {
  it("crea la variante izquierda con la forma esperada", () => {
    const pieza = new PiezaL("izquierda");

    expect(pieza.getNombre()).toBe("L-izquierda");
    expect(pieza.getVariante()).toBe("izquierda");
    expect(pieza.getBloques()).toEqual([
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ]);
  });

  it("crea la variante derecha con la forma esperada", () => {
    const pieza = new PiezaL("derecha");

    expect(pieza.getNombre()).toBe("L-derecha");
    expect(pieza.getVariante()).toBe("derecha");
    expect(pieza.getBloques()).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
    ]);
  });

  it("permite rotaciones en ambos sentidos", () => {
    const pieza = new PiezaL("izquierda");

    pieza.rotarDerecha();
    pieza.rotarIzquierda();

    expect(pieza.getBloques()).toHaveLength(4);
  });
});
