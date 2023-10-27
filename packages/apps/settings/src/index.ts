import("./bootstrap").then(({ mount }) => {
  console.log("This is the Settings standalone mode");
  const root = document.getElementById("settings-mf");
  mount(root!, { initialPath: "/", onNavigate: () => {}, isStandAlone: true });
});
export {};
