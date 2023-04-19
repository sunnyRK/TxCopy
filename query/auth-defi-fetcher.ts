export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
): (() => Promise<TData>) => {
  return async () => {
    const res = await fetch(
      "https://api.thegraph.com/subgraphs/name/steegecs/uniswap-v3-polygon",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ...options,
          // "x-access-token": token ? token : "",
          // "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }
    );

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || "Error…");
    }

    return json.data;
  };
};
