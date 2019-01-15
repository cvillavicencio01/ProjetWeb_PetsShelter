'use strict';

const TITLE_ERROR = 'error';
const TITLE_MESSAGE = 'message';

function buildGenericMessage(nameMessage, textMessage) {

  var jsonMessageResult = {};
  jsonMessageResult[nameMessage] = textMessage;
  return jsonMessageResult;
}

function buildErrorMessage(text) {

  var jsonErrorMessage = buildGenericMessage(TITLE_ERROR, text)
  return jsonErrorMessage;
}

function buildMessage(text) {

  var jsonErrorMessage = buildGenericMessage(TITLE_MESSAGE, text)
  return jsonErrorMessage;
}

module.exports = {
  buildErrorMessage,
  buildMessage,
  buildGenericMessage
}
