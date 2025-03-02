declare module 'fs' {
  const fs: {
    existsSync: (path: string) => boolean;
    mkdirSync: (path: string, options?: { recursive?: boolean }) => void;
    readdirSync: (path: string) => string[];
    unlinkSync: (path: string) => void;
    writeFileSync: (path: string, data: any) => void;
  };
  export default fs;
}

declare module 'path' {
  const path: {
    join: (...paths: string[]) => string;
  };
  export default path;
}

declare module 'canvas' {
  export function createCanvas(width: number, height: number): any;
  export function loadImage(path: string): Promise<any>;
  export function registerFont(path: string, options: { family: string }): void;
} 