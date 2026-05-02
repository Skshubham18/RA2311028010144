const axios = require("axios");
const Log = require("./logger");


const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzazAyOTNAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNDI2MCwiaWF0IjoxNzc3NzAzMzYwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOGI0YmU2NjEtOTkxMi00MmQ1LWE5ZGItYTQ4ZWFjYzc1ZjRjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2h1YmhhbSBrdW1hciIsInN1YiI6IjU2OTJlZjNjLTFhMGUtNDZlNS04MjRlLWEwMTMwMWY0NTg4NCJ9LCJlbWFpbCI6InNrMDI5M0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6InNodWJoYW0ga3VtYXIiLCJyb2xsTm8iOiJyYTIzMTEwMjgwMTAxNDQiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI1NjkyZWYzYy0xYTBlLTQ2ZTUtODI0ZS1hMDEzMDFmNDU4ODQiLCJjbGllbnRTZWNyZXQiOiJqQnB4UUpRV3VRV0toZ1dQIn0.2NC_o9tAkUt-OnoFLVb393mFbfwvB2tEYGkK9foGERs";


async function fetchNotifications() {
  try {
    await Log("backend", "info", "controller", "Fetching notifications");

    const res = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    return res.data.notifications;
  } catch (err) {
    await Log("backend", "error", "controller", err.message);
    console.error("Error fetching notifications:", err.message);
    return [];
  }
}


function getPriority(notification) {
  let typeScore = 0;

  if (notification.Type === "Placement") typeScore = 3;
  else if (notification.Type === "Result") typeScore = 2;
  else if (notification.Type === "Event") typeScore = 1;


  const timeScore = new Date(notification.Timestamp).getTime();

  return typeScore * 1000000000000 + timeScore;
}


function getTopNotifications(notifications, n = 10) {
  return notifications
    .sort((a, b) => getPriority(b) - getPriority(a))
    .slice(0, n);
}


async function main() {
  const notifications = await fetchNotifications();

  const topNotifications = getTopNotifications(notifications, 10);

console.log("\n🔥 TOP 10 PRIORITY NOTIFICATIONS:\n");

topNotifications.forEach((n, index) => {
  console.log(
    `${index + 1}. [${n.Type}] ${n.Message} (${n.Timestamp})`
  );
});

  await Log("backend", "info", "service", "Top notifications calculated");
}


main();