// lib/getQuote.ts
export const getQuote = async () => {
  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    return data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return { content: "Failed to fetch quote", author: "System" };
  }
};
