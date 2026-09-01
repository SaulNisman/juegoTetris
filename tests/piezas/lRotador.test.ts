import { describe, expect, it } from "vitest";
import { PiezaCuadrado } from "../../src/piezas/PiezaCuadrado";
import { PiezaL } from "../../src/piezas/PiezaL";
import { PiezaPalo } from "../../src/piezas/PiezaPalo";
import { PiezaPerro } from "../../src/piezas/PiezaPerro";
import { PiezaT } from "../../src/piezas/PiezaT";
import type { lRotador } from "../../src/piezas/lRotador";

describe("lRotador", () => {
  it("las piezas implementan rotación izquierda y derecha", () => {
    const piezas: lRotador[] = [
      new PiezaT(),
      new PiezaCuadrado(),
      new PiezaPalo(),
      new PiezaL("izquierda"),
      new PiezaPerro("derecha"),
    ];

    for (const pieza of piezas) {
      expect(typeof pieza.rotarIzquierda).toBe("function");
      expect(typeof pieza.rotarDerecha).toBe("function");
    }
  });
});
