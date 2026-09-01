import { describe, expect, it } from "vitest";
import { Reloj } from "../src/Reloj";
import { PiezaT } from "../src/piezas/PiezaT";

describe("Reloj", () => {
  it("inicia sin contadores ni piezas", () => {
    const reloj = new Reloj();

    expect(reloj.getContador()).toBe(0);
    expect(reloj.getPiezas()).toEqual([]);
    expect(reloj.getPiezaActual()).toBeNull();
  });

  it("incrementa el contador con tick", () => {
    const reloj = new Reloj();

    reloj.tick();
    reloj.tick();

    expect(reloj.getContador()).toBe(2);
  });

  it("guarda la pieza actual y la lista de piezas", () => {
    const reloj = new Reloj();
    const pieza = new PiezaT();

    reloj.agregarPieza(pieza);
    reloj.setPiezaActual(pieza);

    expect(reloj.getPiezas()).toHaveLength(1);
    expect(reloj.getPiezas()[0]).toBe(pieza);
    expect(reloj.getPiezaActual()).toBe(pieza);
  });
});
