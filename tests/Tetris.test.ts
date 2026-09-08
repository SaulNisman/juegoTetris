import { afterEach, describe, expect, it, vi } from "vitest";
import { Tetris } from "../src/Tetris";
import { Tablero } from "../src/Tablero";
import { PiezaPalo } from "../src/piezas/PiezaPalo";
import { PiezaCuadrado } from "../src/piezas/PiezaCuadrado";

describe("Tetris", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // INICIO
  it("inicia un juego y genera una pieza inicial", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const juego = new Tetris();

    expect(juego.estado()).toBe("SIN_INICIAR");

    juego.iniciar();

    expect(juego.estado()).toBe("EN_JUEGO");
    expect(juego.getTablero().getPiezaActual()).not.toBeNull();
    expect(juego.getReloj().getPiezas().length).toBeGreaterThan(0);
  });

  // RELOJ
  it("incrementa el reloj en cada tick cuando está en juego", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const juego = new Tetris();
    juego.iniciar();

    const antes = juego.getReloj().getContador();
    juego.tick();

    expect(juego.getReloj().getContador()).toBe(antes + 1);
  });

  // ROTACIONES
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

  // ESTRUCTURA
  it("devuelve el tablero y el reloj correctos", () => {
    const juego = new Tetris();

    expect(juego.getTablero()).toBeDefined();
    expect(juego.getReloj()).toBeDefined();
    expect(juego.getTablero().getAncho()).toBe(10);
    expect(juego.getReloj().getContador()).toBe(0);
  });

  // BLOQUES
  it("agrega una pieza real al tablero y la fija en la grilla", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const juego = new Tetris();
    juego.iniciar();

    const tablero = juego.getTablero();
    const pieza = new PiezaPalo();

    tablero.agregarPieza(pieza);
    expect(tablero.getPiezaActual()).toBe(pieza);

    while (tablero.descenderPiezaActual()) {}

    const celdasOcupadas = tablero
      .getCeldas()
      .some((fila) => fila.some((celda) => celda === true));

    expect(celdasOcupadas).toBe(true);
  });

  // CONTADOR
  it("cuenta correctamente las lineas horizontales completadas al 100% por bloques", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const juego = new Tetris();
    juego.iniciar();

    const tablero = juego.getTablero();
    const celdas = tablero.getCeldas();

    expect(tablero.contarLineas()).toBe(0);

    const filaInferior1 = Tablero.ALTO - 1;
    const filaInferior2 = Tablero.ALTO - 2;

    for (let col = 0; col < Tablero.ANCHO; col++) {
      celdas[filaInferior1][col] = true;
      celdas[filaInferior2][col] = true;
    }

    while (tablero.descenderPiezaActual()) {}

    expect(tablero.contarLineas()).toBe(2);
  });

  // GANAR
  it("acomoda piezas completando la linea requerida para ganar el juego", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const lineasParaGanar = 1;
    const juego = new Tetris(lineasParaGanar);
    juego.iniciar();

    const tablero = juego.getTablero();
    const celdas = tablero.getCeldas();
    const filaInferior = Tablero.ALTO - 1;

    for (let col = 0; col < Tablero.ANCHO; col++) {
      celdas[filaInferior][col] = true;
    }

    while (tablero.descenderPiezaActual()) {}

    expect(tablero.contarLineas()).toBe(1);

    juego.tick();

    expect(juego.estado()).toBe("TERMINADO");
  });

  // PERDER
  it("acomoda mal las piezas hasta llenar el tablero por completo", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const lineasParaGanar = 100;
    const juego = new Tetris(lineasParaGanar);
    juego.iniciar();

    const tablero = juego.getTablero();

    let pudoAgregar = true;
    while (pudoAgregar) {
      while (tablero.descenderPiezaActual()) {
        // Baja la pieza actual hasta que impacte con la base o con otra pieza
      }
      pudoAgregar = tablero.agregarPieza(new PiezaCuadrado());
    }

    juego.tick();

    expect(tablero.estaTerminado()).toBe(true);
    expect(juego.estado()).toBe("TERMINADO");
    expect(tablero.contarLineas()).toBeLessThan(lineasParaGanar);
  });
});
