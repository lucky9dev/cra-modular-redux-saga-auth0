export default function onRouteChange(callback: any) {
  const { addEventListener, history, location } = window;
  // Observe native navigation
  addEventListener('popstate', () => {
    callback(location.pathname);
  });

  // Observe manual navigation
  const methods = ['push', 'replace'];
  methods.map((type) => {
    // eslint-disable-line
    const state = `${type}State`;
    // @ts-ignore
    const historyState = history[state];
    // @ts-ignore
    history[state] = function () {
      callback(arguments[2]);
      return historyState.apply(history, arguments);
    };

    return null;
  });
}
