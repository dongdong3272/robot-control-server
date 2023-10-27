<!-- PROJECT LOGO -->
<br/>
<div align="center">
    <h3 align="center">Robot Control System - Backend</h3>
    <p align="center">
        As the author of this project, Liang Houdong, I have completed it as part of a coding assessment, reserving all copyright rights.
    </p>
    <p align="center">
        This project represents the backend component of the robot control system. It simulates numbers of robot operations and provides APIs for the frontend project. 
    </p>
</div>
<br/>

<!-- ABOUT THE PROJECT -->

## About The Project

![Backend Screenshot][backend-screenshot]

This project is a minimalist web-based application that serves as the backend for controlling a simulated robot. It offers simulations for various robot operations. The frontend interfaces with this backend server via web sockets and APIs to issue commands.

### Built With

- [![JavaScript][JavaScript]][JavaScript-url]
- [![Node.js][Node.js]][Node.js-url]

<!-- GETTING STARTED -->

## Getting Started

Please follow the instructions below to set up your backend server locally:

### Prerequisites

- Node v18.16.0+
- Node Package Manager (NPM) 9.5.1+

### Running

1. Clone the repo:
   ```sh
   git clone https://github.com/dongdong3272/robot-control-server.git
   ```
2. Run the following command in the root directory and install the required packages:
   ```sh
   npm install
   ```
3. Start running the backend:

   ```sh
   node server.js
   ```

   If everything is functioning correctly, you will observe the message "WebSocket server is running on port 4000" displayed on the command screen.

   Note that before running the frontend, please start this backend server first.

<!-- USAGE EXAMPLES -->

## API Usage Guidelines

Here is a quick guide on how to use the WebSocket API for controlling a simulated robot.

1. **WebSocket URL:** `ws://localhost:4000`

2. **WebSocket Events:**

   - `message` (incoming): Receive real-time messages.
   - `response` (outgoing): Send notifications to connected clients.

3. **Message Structure:**

   - Messages are sent and received in JSON format.
   - Example message format: `{ "command": "dropOff" }`

4. **Message Format for all Types:**

   - Get the initial state of the robot: `{ "command": "getInitialValues" }`
   - Start an Emergency call: `{ "command": "emergencyOn" }`
   - Lock/Unlock the robot: `{ "command": "toggleLock" }`
   - Speed Up the robot: `{ "command": "speedUp" }`
   - Slow down the robot: `{ "command": "slowDown" }`
   - Pick Up Products: `{ "command": "pickUp" }`
   - Drop off products: `{ "command": "dropOff" }`
   - Move in a certain direction: `{ "command": "move", "angle": 1.232355932 }`

5. **Response Structure:**

   - Responses are sent and received in JSON format.
   - Response formats (examples):

   ```json
   # There are three possible response statuses: "success," "fail," and "error"
   {
       "status": "success",
       "message": "Robot successfully moves",
       "robotState":  {
           "speed": 0.5,
           "location": {
               "lat": 32.9027949,
               "lng": -117.2089399
           },
           "emergency": false,
           "lock": true
       }
   }

   {
       "status": "fail",
       "message": "The robot is locked",
       "robotState":  {
           "speed": 0.5,
           "location": {
               "lat": 32.9027949,
               "lng": -117.2089399
           },
           "emergency": false,
           "lock": true
       }
   }

   {
       "status": "error",
       "message": "Unknown command",
       "robotState":  {
           "speed": 0.5,
           "location": {
               "lat": 32.9027949,
               "lng": -117.2089399
           },
           "emergency": false,
           "lock": true
       }
   }
   ```

<!-- CONTACT -->

## Contact

LIANG Houdong - [Personal Website](https://dongdong3272.github.io/) - Email: holiang@ucsd.edu

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[backend-screenshot]: backend_screenshot.png
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node.js-url]: https://nodejs.org/
