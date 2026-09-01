import { describe, expect, it } from "vitest";
import { PiezaT } from "../../src/piezas/PiezaT";

describe("PiezaT", () => {
  it("tiene la forma inicial correcta", () => {
    const pieza = new PiezaT();

    expect(pieza.getNombre()).toBe("T");
    expect(pieza.getBloques()).toEqual([
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ]);
  });

  it("rota a la derecha y conserva 4 bloques", () => {
    const pieza = new PiezaT();

    pieza.rotarDerecha();

    const bloques = pieza
      .getBloques()
      .map(({ x, y }) => `${x},${y}`)
      .sort();

    expect(pieza.getBloques()).toHaveLength(4);
    expect(bloques).toEqual(["1,0", "1,1", "1,2", "2,1"]);
  });

  it("rota a la izquierda y conserva la forma cuadrangular de 4 bloques", () => {
    const pieza = new PiezaT();

    pieza.rotarIzquierda();

    const bloques = pieza
      .getBloques()
      .map(({ x, y }) => `${x},${y}`)
      .sort();

    expect(pieza.getBloques()).toHaveLength(4);
    expect(bloques).toEqual(["0,1", "1,0", "1,1", "1,2"]);
  });
});
