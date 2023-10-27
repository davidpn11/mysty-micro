type MountParams = {
  initialPath: string;
  onNavigate(location: unknown): void;
  isStandAlone?: boolean;
};

type MountFn = (
  element: Element | null,
  params?: MountParams
) => {
  onParentNavigate(location: unknown): void;
  unmount(): void;
};

type MFModule = {
  port: number;
  name: string;
};
