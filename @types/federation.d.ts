type MountParams = {
  initialPath: string;
  onNavigate(location: unknown): void;
  defaultHistory?: unknown;
  optimizely?: unknown;
};

type MountFn = (
  element: Element | null,
  params?: MountParams
) => {
  onParentNavigate(location: unknown): void;
  unmount(): void;
};

declare module "*/App" {
  export const mount: MountFn;
}

declare module "shared/Components" {
  export * from "@mysty-micro/shared-ui/src/components";
}
