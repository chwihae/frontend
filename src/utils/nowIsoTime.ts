const nowIsoTime = (closeAt: string) => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const now = new Date(Date.now() - timezoneOffset);

  if (closeAt === '30분') {
    now.setMinutes(now.getMinutes() + 30);
  } else if (closeAt === '3시간') {
    now.setHours(now.getHours() + 3);
  } else if (closeAt === '3일') {
    now.setDate(now.getDate() + 3);
  }

  return now.toISOString().slice(0, -5);
};

export default nowIsoTime;
