"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const recruitmentController_1 = require("../controllers/recruitmentController");
exports.router = (0, express_1.Router)();
exports.router.post('/recruit', recruitmentController_1.getRecruitmentResponse);
