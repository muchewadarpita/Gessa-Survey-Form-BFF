const express = require("express");
const router = express.Router();
const axios = require("axios");

const Headers = {
  " x-tenant-id": "63f72c21f9dfbe6751b887b5",
  "Content-Type": "application/json",
};

//Get Responses By Form  ID....
exports.getResponseById = async (request, response) => {
  var surveyData;
  await axios
    .get("https://api.qa.gessa.io/cms/response/?page=0&size=10", {
      headers: Headers,
    })
    .then((responseObj) => {
      surveyData = responseObj.data.result.data;
    })
    .catch((error) => {
      response.send(error);
    });
  surveyData = surveyData.filter((form) => {
    return form.formId == request.params.formId;
  });
  response.status(200).json(surveyData);
};
