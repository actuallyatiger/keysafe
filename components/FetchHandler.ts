const handleRes = async (res: Response) => {
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

const apiFetch = async (url: string, method: string = "GET") => {
  const res = await fetch(`https://api.keysafe.info${url}`, {
    method: method,
    headers: {
      Authorization: localStorage.getItem("token") || "",
    },
  });
  try {
    return handleRes(res);
  } catch (e) {
    throw e;
  }
};

const apiFetchBody = async (url: string, method: string = "GET", body = {}) => {
  const res = await fetch(`https://api.keysafe.info${url}`, {
    method: method,
    headers: {
      Authorization: localStorage.getItem("token") || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  try {
    return handleRes(res);
  } catch (e) {
    throw e;
  }
};

export { apiFetch, apiFetchBody };
