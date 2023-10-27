const WebSocket = require("ws");
const wss = new WebSocket.Server(
  {
    port: 4000,
  },
  () => {
    console.log("WebSocket server is running on port 4000");
  }
);

const MAX_SPEED = 1.5;
const MIN_SPEED = 0.3;
const UNIT_SPEED = 0.1;
const UNIT_DEGREE_CHANGE = 0.0000001;

// Initial Robot State
const robotState = {
  speed: 0.5,
  location: {
    lat: 32.9027949,
    lng: -117.2089399,
  },
  emergency: false,
  lock: true,
};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
    const response = processCommand(parsedMessage);
    response.command = parsedMessage.command;

    ws.send(JSON.stringify(response));
  });
});

function processCommand(parsedMessage) {
  try {
    if (robotState.emergency) {
      return createErrorResponse("No action allowed when emergency happens");
    }
    if (
      robotState.lock &&
      (parsedMessage.command === "move" ||
        parsedMessage.command === "speedUp" ||
        parsedMessage.command === "slowDown" ||
        parsedMessage.command === "pickUp" ||
        parsedMessage.command === "dropOff")
    ) {
      return createFailResponse("The robot is locked");
    }

    switch (parsedMessage.command) {
      case "getInitialValues":
        return createSuccessResponse("Initial values");
      case "emergencyOn":
        robotState.emergency = true;
        return createSuccessResponse("Emergency On");

      case "toggleLock":
        robotState.lock = !robotState.lock;
        return createSuccessResponse(
          robotState.lock ? "Robot locked" : "Robot unlocked"
        );

      case "speedUp":
        return adjustSpeed(UNIT_SPEED, "Robot speeds up successfully");

      case "slowDown":
        return adjustSpeed(-UNIT_SPEED, "Robot slows down successfully");

      case "pickUp":
        return createSuccessResponse("Robot picks up the products");

      case "dropOff":
        return createSuccessResponse("Robot drops off the products");

      case "move":
        if (parsedMessage.angle !== undefined) {
          moveRobot(parsedMessage.angle);
          return createSuccessResponse("Robot successfully moves");
        } else {
          return createErrorResponse("Angle is missing");
        }

      default:
        return createErrorResponse("Unknown command");
    }
  } catch (error) {
    return createErrorResponse("Error occurred: " + error.message);
  }
}

function createSuccessResponse(message) {
  return {
    status: "success",
    message,
    robotState,
  };
}

function createFailResponse(message) {
  return {
    status: "fail",
    message,
    robotState,
  };
}

function createErrorResponse(message) {
  return {
    status: "error",
    message,
    robotState,
  };
}

function adjustSpeed(delta, successMessage) {
  const newSpeed = Math.min(
    Math.max(robotState.speed + delta, MIN_SPEED),
    MAX_SPEED
  );
  if (newSpeed !== robotState.speed) {
    robotState.speed = newSpeed;
    return createSuccessResponse(successMessage);
  } else {
    return createFailResponse(
      `Robot reached the ${delta > 0 ? "maximum" : "minimum"} speed`
    );
  }
}

function moveRobot(angle) {
  const ds = UNIT_DEGREE_CHANGE * robotState.speed;
  const dlat = -ds * Math.sin(angle);
  const dlng = ds * Math.cos(angle);
  robotState.location = {
    lat: robotState.location.lat + dlat,
    lng: robotState.location.lng + dlng,
  };
}
