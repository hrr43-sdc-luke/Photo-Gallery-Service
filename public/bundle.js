/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// import React from 'react';\n// import ReactDOM from 'react-dom';\n// import Enzyme from 'enzyme';\n// import Adapter from 'enzyme-adapter-react-16';\n// import axios from 'axios';\n// // import PhotoGrid from './components/PhotoGrid.js';\n// //import Photos from './components/Photos.js';\n// Enzyme.configure({ adapter: new Adapter() });\n// console.log('testing');\n// class App extends React.Component {\n//   constructor(props) {\n//     super(props);\n//     this.state = {\n//       photos: []\n//     }\n//   }\n//   componentDidMount() {\n//     let url = \"http://localhost:3003/2\";\n//     axios.get(url)\n//       .then(res => {\n//         this.setState({photos: res.data });\n//         console.log('PRINT RES.DATA: ',res.data)\n//       })\n//       .catch(function (error) {\n//         console.log(error);\n//       })\n//   }\n//   render() {\n//     if (!this.state.photos.length) {\n//       return <div><p>No guest photos from this experience</p></div>\n//     }\n//     const photoGrid =\n//       this.state.photos.map(photo => (\n//         <div key={photo.photo_id}>\n//           <img src={photo.photo_url}></img>\n//           <div>{photo.username}</div>\n//         </div>\n//     ));\n//     return (\n//       <div>\n//         <div className=\"gridContainer\">\n//           {photoGrid}\n//         </div>\n//       </div>\n//       );\n//   }\n// }\n// ReactDOM.render(<App />, document.getElementById('app'));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy8gaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG4vLyBpbXBvcnQgRW56eW1lIGZyb20gJ2VuenltZSc7XG4vLyBpbXBvcnQgQWRhcHRlciBmcm9tICdlbnp5bWUtYWRhcHRlci1yZWFjdC0xNic7XG4vLyBpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuLy8gLy8gaW1wb3J0IFBob3RvR3JpZCBmcm9tICcuL2NvbXBvbmVudHMvUGhvdG9HcmlkLmpzJztcbi8vIC8vaW1wb3J0IFBob3RvcyBmcm9tICcuL2NvbXBvbmVudHMvUGhvdG9zLmpzJztcblxuLy8gRW56eW1lLmNvbmZpZ3VyZSh7IGFkYXB0ZXI6IG5ldyBBZGFwdGVyKCkgfSk7XG5cbi8vIGNvbnNvbGUubG9nKCd0ZXN0aW5nJyk7XG5cbi8vIGNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4vLyAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4vLyAgICAgc3VwZXIocHJvcHMpO1xuLy8gICAgIHRoaXMuc3RhdGUgPSB7XG4vLyAgICAgICBwaG90b3M6IFtdXG4vLyAgICAgfVxuLy8gICB9XG5cbi8vICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4vLyAgICAgbGV0IHVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAzLzJcIjtcbi8vICAgICBheGlvcy5nZXQodXJsKVxuLy8gICAgICAgLnRoZW4ocmVzID0+IHtcbi8vICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cGhvdG9zOiByZXMuZGF0YSB9KTtcbi8vICAgICAgICAgY29uc29sZS5sb2coJ1BSSU5UIFJFUy5EQVRBOiAnLHJlcy5kYXRhKVxuLy8gICAgICAgfSlcbi8vICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbi8vICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuLy8gICAgICAgfSlcbi8vICAgfVxuXG5cbi8vICAgcmVuZGVyKCkge1xuXG4vLyAgICAgaWYgKCF0aGlzLnN0YXRlLnBob3Rvcy5sZW5ndGgpIHtcbi8vICAgICAgIHJldHVybiA8ZGl2PjxwPk5vIGd1ZXN0IHBob3RvcyBmcm9tIHRoaXMgZXhwZXJpZW5jZTwvcD48L2Rpdj5cbi8vICAgICB9XG5cbi8vICAgICBjb25zdCBwaG90b0dyaWQgPVxuLy8gICAgICAgdGhpcy5zdGF0ZS5waG90b3MubWFwKHBob3RvID0+IChcbi8vICAgICAgICAgPGRpdiBrZXk9e3Bob3RvLnBob3RvX2lkfT5cbi8vICAgICAgICAgICA8aW1nIHNyYz17cGhvdG8ucGhvdG9fdXJsfT48L2ltZz5cbi8vICAgICAgICAgICA8ZGl2PntwaG90by51c2VybmFtZX08L2Rpdj5cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgKSk7XG5cbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgPGRpdj5cbi8vICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkQ29udGFpbmVyXCI+XG4vLyAgICAgICAgICAge3Bob3RvR3JpZH1cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICA8L2Rpdj5cbi8vICAgICAgICk7XG4vLyAgIH1cbi8vIH1cblxuLy8gUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });