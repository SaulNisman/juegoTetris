import { describe, expect, it } from "vitest";
import { PiezaPerro } from "../../src/piezas/PiezaPerro";

describe("PiezaPerro", () => {
  it("crea la variante izquierda con la forma esperada", () => {
    const pieza = new PiezaPerro("izquierda");

    expect(pieza.getNombre()).toBe("Perro-izquierda");
    expect(pieza.getVariante()).toBe("izquierda");
    expect(pieza.getBloques()).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ]);
  });

  it("crea la variante derecha con la forma esperada", () => {
    const pieza = new PiezaPerro("derecha");

    expect(pieza.getNombre()).toBe("Perro-derecha");
    expect(pieza.getVariante()).toBe("derecha");
    expect(pieza.getBloques()).toEqual([
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]);
  });

  it("permite rotar en ambos sentidos", () => {
    const pieza = new PiezaPerro("derecha");

    pieza.rotarDerecha();
    pieza.rotarIzquierda();

    expect(pieza.getBloques()).toHaveLength(4);
  });
});
