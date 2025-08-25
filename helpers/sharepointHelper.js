import dotenv from "dotenv";
dotenv.config();

export async function fetchPricelistFromSharePoint() {
  try {
    const token = await getSharePointAccessToken();
    const file = await getFileFromSharePoint(token);
    return file;
  } catch (err) {
    console.error("Error in fetchPricelistFromSharePoint:", err);
    throw err;
  }
}

async function getSharePointAccessToken() {
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: "https://graph.microsoft.com/.default",
  });

  const resp = await fetch(`https://login.microsoftonline.com/1b6d189e-dc5d-486f-80d1-f5967b009fc8/oauth2/v2.0/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    console.error("Failed to get SharePoint access token:", errorText);
    throw new Error(errorText);
  }

  const data = await resp.json();
  return data.access_token;
}

async function getFileFromSharePoint(token) {
  const resp = await fetch(process.env.FILE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    console.error("Failed to fetch file from SharePoint:", errorText);
    throw new Error(errorText);
  }

  const data = await resp.arrayBuffer();
  return data;
}