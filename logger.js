const axios = require("axios");


const LOG_API = "http://20.207.122.201/evaluation-service/logs";


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzazAyOTNAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNDI2MCwiaWF0IjoxNzc3NzAzMzYwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOGI0YmU2NjEtOTkxMi00MmQ1LWE5ZGItYTQ4ZWFjYzc1ZjRjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2h1YmhhbSBrdW1hciIsInN1YiI6IjU2OTJlZjNjLTFhMGUtNDZlNS04MjRlLWEwMTMwMWY0NTg4NCJ9LCJlbWFpbCI6InNrMDI5M0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6InNodWJoYW0ga3VtYXIiLCJyb2xsTm8iOiJyYTIzMTEwMjgwMTAxNDQiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI1NjkyZWYzYy0xYTBlLTQ2ZTUtODI0ZS1hMDEzMDFmNDU4ODQiLCJjbGllbnRTZWNyZXQiOiJqQnB4UUpRV3VRV0toZ1dQIn0.2NC_o9tAkUt-OnoFLVb393mFbfwvB2tEYGkK9foGERs";

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    console.log("Log success:", response.data);
  } catch (error) {
    console.error("Log failed:", error.message);
  }
}

module.exports = Log;