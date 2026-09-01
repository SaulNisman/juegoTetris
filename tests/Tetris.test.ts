import { afterEach, describe, expect, it, vi } from "vitest";
import { Tetris } from "../src/Tetris";

describe("Tetris", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("inicia un juego y genera una pieza inicial", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const juego = new Tetris();

    expect(juego.estado()).toBe("SIN_INICIAR");

    juego.iniciar();

    expect(juego.estado()).toBe("EN_JUEGO");
    expect(juego.getTablero().getPiezaActual()).not.toBeNull();
    expect(juego.getReloj().getPiezas().length).toBeGreaterThan(0);
  });

  it("incrementa el reloj en cada tick cuando está en juego", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const juego = new Tetris();
    juego.iniciar();

    const antes = juego.getReloj().getContador();
    juego.tick();

    expect(juego.getReloj().getContador()).toBe(antes + 1);
  });

  it("las rotaciones solo se aplican en estado EN_JUEGO", () => {
    const juego = new Tetris();

    juego.rotarIzquierda();
    juego.rotarDerecha();
    expect(juego.estado()).toBe("SIN_INICIAR");

    vi.spyOn(Math, "random").mockReturnValue(0);
    juego.iniciar();
    expect(() => {
      juego.rotarIzquierda();
      juego.rotarDerecha();
    }).not.toThrow();
  });

  it("devuelve el tablero y el reloj correctos", () => {
    const juego = new Tetris();

    expect(juego.getTablero()).toBeDefined();
    expect(juego.getReloj()).toBeDefined();
    expect(juego.getTablero().getAncho()).toBe(10);
    expect(juego.getReloj().getContador()).toBe(0);
  });
});
