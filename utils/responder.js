const Responder = (res, type, msg, data, code) => {
  if (type == "ERROR") {
    res.statusMessage = msg ? msg : "Something went wrong, please try again!";
    res.status(code ? code : 400).send({
      status: code ? code : 400,
      data: [],
      error: msg ? msg : "Something went wrong, please try again!",
    });
  } else {
    res.send({
      status: 200,
      data: data,
      error: [],
    });
  }
};

module.exports = { Responder };
