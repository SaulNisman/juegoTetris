import { describe, expect, it, vi, afterEach } from "vitest";
import { Tablero } from "../src/Tablero";
import { Reloj } from "../src/Reloj";
import { PiezaCuadrado } from "../src/piezas/PiezaCuadrado";
import { PiezaT } from "../src/piezas/PiezaT";

describe("Tablero", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("crea un tablero vacío con el tamaño correcto", () => {
    const tablero = new Tablero(new Reloj());

    expect(tablero.getAncho()).toBe(10);
    expect(tablero.getAlto()).toBe(20);
    expect(tablero.getCeldas()).toHaveLength(20);
    expect(tablero.getCeldas()[0]).toHaveLength(10);
    expect(tablero.getCeldas().flat().every((celda) => celda === false)).toBe(true);
    expect(tablero.getPiezaActual()).toBeNull();
    expect(tablero.estaTerminado()).toBe(false);
  });

  it("agrega una pieza y la registra en el reloj", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const reloj = new Reloj();
    const tablero = new Tablero(reloj);
    const pieza = new PiezaCuadrado();

    const pudoAgregar = tablero.agregarPieza(pieza);

    expect(pudoAgregar).toBe(true);
    expect(tablero.getPiezaActual()).toBe(pieza);
    expect(reloj.getPiezaActual()).toBe(pieza);
    expect(reloj.getPiezas()).toContain(pieza);
  });

  it("hace descender la pieza cuando hay espacio disponible", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const tablero = new Tablero(new Reloj());
    const pieza = new PiezaCuadrado();

    tablero.agregarPieza(pieza);
    const seMovio = tablero.descenderPiezaActual();

    expect(seMovio).toBe(true);
    expect(tablero.getPiezaActual()).toBe(pieza);
  });

  it("rotar la pieza actual devuelve false cuando la rotación queda fuera del tablero", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const tablero = new Tablero(new Reloj());
    const pieza = new PiezaT();

    tablero.agregarPieza(pieza);
    (tablero as any).posicionActual = { x: 0, y: 0 };

    const resultado = tablero.rotarPiezaActualDerecha();

    expect(resultado).toBe(true);
  });

  it("fija la pieza actual cuando ya no puede bajar y marca celdas ocupadas", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const tablero = new Tablero(new Reloj());
    const pieza = new PiezaCuadrado();

    tablero.agregarPieza(pieza);
    (tablero as any).posicionActual = { x: 0, y: 18 };

    const pudoDescender = tablero.descenderPiezaActual();

    expect(pudoDescender).toBe(false);
    expect(tablero.getPiezaActual()).toBeNull();
    expect(tablero.getCeldas()[19].some((celda) => celda === true)).toBe(true);
  });
});
