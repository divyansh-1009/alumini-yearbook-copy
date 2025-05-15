declare module 'canvas-confetti' {
  function confetti(options?: {
    particleCount?: number;
    spread?: number;
    origin?: {
      x?: number;
      y?: number;
    };
  }): Promise<null>;
  
  export default confetti;
}