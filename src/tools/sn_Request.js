import axios from "axios";

const ReadSNOW = async (url, data = {}, method = "get") => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const requestOptions = {
    url: url,
    method: method,
    headers: headers,
    //data: JSON.stringify(qrValue),
    data: data,
  };

  return await axios(requestOptions)
    .then((data) => {
      return data;
    })
    .catch(function (error) {
      return Promise.reject(error);
    })
    .finally(() => {});
};

export default ReadSNOW;
