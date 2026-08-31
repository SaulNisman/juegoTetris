import { Tablero } from "./Tablero";
import { Reloj } from "./Reloj";
import { PiezaBase } from "./piezas/PiezaBase";
import { PiezaT } from "./piezas/PiezaT";
import { PiezaCuadrado } from "./piezas/PiezaCuadrado";
import { PiezaPalo } from "./piezas/PiezaPalo";
import { PiezaL } from "./piezas/PiezaL";
import { PiezaPerro } from "./piezas/PiezaPerro";

export type EstadoJuego = "SIN_INICIAR" | "EN_JUEGO" | "TERMINADO";

export class Tetris {
  private tablero: Tablero;
  private reloj: Reloj;
  private lineasParaTerminar: number;
  private estadoActual: EstadoJuego;

  constructor(lineasParaTerminar: number = 5) {
    this.reloj = new Reloj();
    this.tablero = new Tablero(this.reloj);
    this.lineasParaTerminar = lineasParaTerminar;
    this.estadoActual = "SIN_INICIAR";
  }

  public iniciar(): void {
    this.estadoActual = "EN_JUEGO";
    this.agregarPiezaAleatoria();
  }

  public estado(): string {
    return this.estadoActual;
  }

  public tick(): void {
    if (this.estadoActual !== "EN_JUEGO") return;

    this.reloj.tick();

    const habiaPiezaActual = this.tablero.getPiezaActual() !== null;
    const pudoDescender = this.tablero.descenderPiezaActual();

    if (habiaPiezaActual && !pudoDescender) {
      this.agregarPiezaAleatoria();
    }

    if (
      this.tablero.estaTerminado() ||
      this.tablero.contarLineas() >= this.lineasParaTerminar
    ) {
      this.estadoActual = "TERMINADO";
    }
  }

  public rotarIzquierda(): void {
    if (this.estadoActual === "EN_JUEGO") {
      this.tablero.rotarPiezaActualIzquierda();
    }
  }

  public rotarDerecha(): void {
    if (this.estadoActual === "EN_JUEGO") {
      this.tablero.rotarPiezaActualDerecha();
    }
  }

  public getTablero(): Tablero {
    return this.tablero;
  }

  public getReloj(): Reloj {
    return this.reloj;
  }

  private agregarPiezaAleatoria(): void {
    const pieza = this.crearPiezaAleatoria();
    const seAgrego = this.tablero.agregarPieza(pieza);
    if (!seAgrego) {
      this.estadoActual = "TERMINADO";
    }
  }

  private crearPiezaAleatoria(): PiezaBase {
    const generadores: Array<() => PiezaBase> = [
      () => new PiezaT(),
      () => new PiezaCuadrado(),
      () => new PiezaPalo(),
      () => new PiezaL(Math.random() < 0.5 ? "izquierda" : "derecha"),
      () => new PiezaPerro(Math.random() < 0.5 ? "izquierda" : "derecha"),
    ];
    const indice = Math.floor(Math.random() * generadores.length);
    return generadores[indice]();
  }
}