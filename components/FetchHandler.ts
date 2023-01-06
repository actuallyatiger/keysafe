const apiFetch = async (url: string, method: string = "GET") => {
  const res = await fetch(`https://api.keysafe.info${url}`, {
    method: method,
    headers: {
      Authorization: localStorage.getItem("token") || "",
    },
  });

  // If the response was successful, return it
  if (res.ok) {
    let data = await res.json();
    localStorage.setItem("token", data["token"]);
    delete data["token"];
    return data;
  }

  switch (res.status) {
    case 401:
      localStorage.removeItem("token");
      throw new Error("Unauthorized");
    case 404:
      throw new Error("Not found");
    case 400:
      throw new Error("Request error");
  }
};

export default apiFetch;
