import { PiezaBase, Posicion } from "./piezas/PiezaBase";
import { Reloj } from "./Reloj";

export class Tablero {
  public static readonly ANCHO = 10;
  public static readonly ALTO = 20;

  private celdas: boolean[][];
  private reloj: Reloj;
  private piezaActual: PiezaBase | null;
  private posicionActual: Posicion;
  private lineasEliminadas: number;
  private juegoTerminado: boolean;

  constructor(reloj: Reloj) {
    this.reloj = reloj;
    this.celdas = Tablero.crearCeldasVacias();
    this.piezaActual = null;
    this.posicionActual = { x: 0, y: 0 };
    this.lineasEliminadas = 0;
    this.juegoTerminado = false;
  }

  private static crearCeldasVacias(): boolean[][] {
    return Array.from({ length: Tablero.ALTO }, () =>
      Array(Tablero.ANCHO).fill(false)
    );
  }

  public getAncho(): number {
    return Tablero.ANCHO;
  }

  public getAlto(): number {
    return Tablero.ALTO;
  }

  public getCeldas(): boolean[][] {
    return this.celdas;
  }

  public getPiezaActual(): PiezaBase | null {
    return this.piezaActual;
  }

  public estaTerminado(): boolean {
    return this.juegoTerminado;
  }

  public contarLineas(): number {
    return this.lineasEliminadas;
  }

  
  public agregarPieza(pieza: PiezaBase): boolean {
    if (this.juegoTerminado) return false;

    const rotaciones = Math.floor(Math.random() * 4);
    for (let i = 0; i < rotaciones; i++) {
      pieza.rotarDerecha();
    }

    const anchoPieza = this.anchoDePieza(pieza);
    const maxColumna = Tablero.ANCHO - anchoPieza;
    const columna = maxColumna > 0 ? Math.floor(Math.random() * (maxColumna + 1)) : 0;
    const posicionInicial: Posicion = { x: columna, y: 0 };

    if (!this.cabe(pieza, posicionInicial)) {
      this.juegoTerminado = true;
      return false;
    }

    this.piezaActual = pieza;
    this.posicionActual = posicionInicial;
    this.reloj.setPiezaActual(pieza);
    this.reloj.agregarPieza(pieza);
    return true;
  }

  private anchoDePieza(pieza: PiezaBase): number {
    const xs = pieza.getBloques().map((b) => b.x);
    return Math.max(...xs) - Math.min(...xs) + 1;
  }

  private bloquesAbsolutos(pieza: PiezaBase, posicion: Posicion): Posicion[] {
    return pieza.getBloques().map((b) => ({
      x: Math.round(b.x + posicion.x),
      y: Math.round(b.y + posicion.y),
    }));
  }

  private cabe(pieza: PiezaBase, posicion: Posicion): boolean {
    return this.bloquesAbsolutos(pieza, posicion).every(({ x, y }) => {
      if (x < 0 || x >= Tablero.ANCHO || y < 0 || y >= Tablero.ALTO) return false;
      return !this.celdas[y][x];
    });
  }

  
  public descenderPiezaActual(): boolean {
    if (!this.piezaActual || this.juegoTerminado) return false;

    const siguiente: Posicion = {
      x: this.posicionActual.x,
      y: this.posicionActual.y + 1,
    };

    if (this.cabe(this.piezaActual, siguiente)) {
      this.posicionActual = siguiente;
      return true;
    }

    this.fijarPiezaActual();
    return false;
  }

  private fijarPiezaActual(): void {
    if (!this.piezaActual) return;
    this.bloquesAbsolutos(this.piezaActual, this.posicionActual).forEach(({ x, y }) => {
      if (y >= 0 && y < Tablero.ALTO && x >= 0 && x < Tablero.ANCHO) {
        this.celdas[y][x] = true;
      }
    });
    this.piezaActual = null;
    this.eliminarLineasCompletas();
  }

  private eliminarLineasCompletas(): void {
    const filasRestantes = this.celdas.filter((fila) => !fila.every((c) => c === true));
    const eliminadas = Tablero.ALTO - filasRestantes.length;

    if (eliminadas > 0) {
      this.lineasEliminadas += eliminadas;
      const filasNuevas = Array.from({ length: eliminadas }, () =>
        Array(Tablero.ANCHO).fill(false)
      );
      // El tablero conserva la misma cantidad total de casillas (Req. 5)
      this.celdas = [...filasNuevas, ...filasRestantes];
    }
  }

  public rotarPiezaActualIzquierda(): boolean {
    return this.intentarRotar("izquierda");
  }

  public rotarPiezaActualDerecha(): boolean {
    return this.intentarRotar("derecha");
  }

  private intentarRotar(sentido: "izquierda" | "derecha"): boolean {
    if (!this.piezaActual) return false;

    if (sentido === "derecha") {
      this.piezaActual.rotarDerecha();
      if (this.cabe(this.piezaActual, this.posicionActual)) return true;
      this.piezaActual.rotarIzquierda(); // revertir (rotación inversa exacta)
      return false;
    }

    this.piezaActual.rotarIzquierda();
    if (this.cabe(this.piezaActual, this.posicionActual)) return true;
    this.piezaActual.rotarDerecha(); // revertir
    return false;
  }
}