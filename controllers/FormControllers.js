const express = require("express");
const router = express.Router();
const axios = require("axios");

const Headers = {
  " x-tenant-id": "63f72c21f9dfbe6751b887b5",
  "Content-Type": "application/json",
};

//Create new Form
exports.createForm = async (request, response) => {
  var surveyData;
  await axios
    .post("https://api.qa.gessa.io/cms/survey", request.body, {
      headers: Headers,
    })
    .then((responseObj) => {
      surveyData = responseObj.data;
      console.log("Survey Created Successfully...");
    })
    .catch((error) => {
      response.send(error);
    });

  response.status(200).json(surveyData);
};

//Get Form By ID....
exports.getFormById = async (request, response) => {
  var surveyData;
  await axios
    .get("https://api.qa.gessa.io/cms/survey/?page=0&size=10", {
      headers: Headers,
    })
    .then((responseObj) => {
      surveyData = responseObj.data.result.data;
    })
    .catch((error) => {
      response.send(error);
    });
  surveyData = surveyData.filter((form) => {
    return form._id == request.params.id;
  });
  response.status(200).json(surveyData);
};

//Get All survey form By Email Address..
exports.formByEmail = async (request, response) => {
  var surveyData;
  await axios
    .get("https://api.qa.gessa.io/cms/survey/?page=0&size=10", {
      headers: Headers,
    })
    .then((responseObj) => {
      surveyData = responseObj.data.result.data;
    })
    .catch((error) => {
      response.send(error);
    });

  completedForm = await total_Completed(surveyData, request.params.email);
  totalForm = await total_Survey(surveyData, request.params.email);
  draftForm = await total_Draft(surveyData, request.params.email);
  ongoingForm = await total_Ongoing(surveyData, request.params.email);

  response.status(200).json({
    totalForm: totalForm.length,
    totalOngoingForm: ongoingForm.length,
    totalDraftForm: draftForm.length,
    totalCompletedForm: completedForm.length,

    survey: totalForm,
  });
};

//Get No of Survey form of a user by its email
exports.formCount = async (request, response) => {
  var surveyData;
  await axios
    .get("https://api.qa.gessa.io/cms/survey/?page=0&size=10", {
      headers: Headers,
    })
    .then((responseObj) => {
      surveyData = responseObj.data.result.data;
    })
    .catch((error) => {
      response.send(error);
    });
  surveyData = surveyData.filter((form) => {
    return form.creator == request.params.email;
  });
  response.status(200).json({ totalform: surveyData.length });
};

//Get Total No of Completed Survey By Email
exports.formCompleted = async (request, response) => {
  var surveyData;
  await axios
    .get("https://api.qa.gessa.io/cms/survey/?page=0&size=10", {
      headers: Headers,
    })
    .then((responseObj) => {
      surveyData = responseObj.data.result.data;
    })
    .catch((error) => {
      response.send(error);
    });

  completedForm = await total_Completed(surveyData, request.params.email);
  totalForm = await total_Survey(surveyData, request.params.email);
  draftForm = await total_Draft(surveyData, request.params.email);
  ongoingForm = await total_Ongoing(surveyData, request.params.email);

  response.status(200).json({
    totalForm: totalForm.length,
    totalOngoingForm: ongoingForm.length,
    totalDraftForm: draftForm.length,
    totalCompletedForm: completedForm.length,

    survey: completedForm,
  });
};

//Get Total No of Ongoing Survey form By Email
exports.formOngoing = async (request, response) => {
  var surveyData;
  await axios
    .get("https://api.qa.gessa.io/cms/survey/?page=0&size=10", {
      headers: Headers,
    })
    .then((responseObj) => {
      surveyData = responseObj.data.result.data;
    })
    .catch((error) => {
      response.send(error);
    });

  completedForm = await total_Completed(surveyData, request.params.email);
  totalForm = await total_Survey(surveyData, request.params.email);
  draftForm = await total_Draft(surveyData, request.params.email);
  ongoingForm = await total_Ongoing(surveyData, request.params.email);

  response.status(200).json({
    totalForm: totalForm.length,
    totalOngoingForm: ongoingForm.length,
    totalDraftForm: draftForm.length,
    totalCompletedForm: completedForm.length,

    survey: ongoingForm,
  });
};

//Get Total No of Draft Survey form By Email
exports.formDraft = async (request, response) => {
  var surveyData;
  await axios
    .get("https://api.qa.gessa.io/cms/survey/?page=0&size=10", {
      headers: Headers,
    })
    .then((responseObj) => {
      surveyData = responseObj.data.result.data;
    })
    .catch((error) => {
      response.send(error);
    });

  completedForm = await total_Completed(surveyData, request.params.email);
  totalForm = await total_Survey(surveyData, request.params.email);
  draftForm = await total_Draft(surveyData, request.params.email);
  ongoingForm = await total_Ongoing(surveyData, request.params.email);

  response.status(200).json({
    totalForm: totalForm.length,
    totalOngoingForm: ongoingForm.length,
    totalDraftForm: draftForm.length,
    totalCompletedForm: completedForm.length,

    survey: draftForm,
  });
};

//Helper Functions
//1.

const total_Completed = async (surveyData, creator) => {
  surveyData = await surveyData.filter((form) => {
    if (form.creator === creator) {
      let expiry = new Date(form.expiry);
      let current_date = new Date();
      return current_date > expiry && form.draft !== true;
    }
  });

  return surveyData;
};

//2.

const total_Ongoing = async (surveyData, creator) => {
  surveyData = await surveyData.filter((form) => {
    if (form.creator === creator) {
      let expiry = new Date(form.expiry);
      let current_date = new Date();
      return current_date <= expiry && form.draft !== true;
    }
  });

  return surveyData;
};

//3.

const total_Draft = (surveyData, creator) => {
  surveyData = surveyData.filter((form) => {
    if (form.creator === creator) return form.draft === true;
  });
  return surveyData;
};

//4.

const total_Survey = async (surveyData, creator) => {
  surveyData = await surveyData.filter((form) => {
    return form.creator === creator;
  });
  return surveyData;
};
