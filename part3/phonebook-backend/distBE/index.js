"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan = require('morgan');
const PORT = process.env.PORT || 3001;
const services_1 = require("./db/services");
const connection_1 = require("./db/connection");
const utils_1 = require("./utils");
(0, connection_1.connect)();
const app = (0, express_1.default)();
morgan.token('reqbody', (req) => {
    return req.body ? JSON.stringify(req.body) : '';
});
app.use(express_1.default.static('dist'));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqbody'));
app.get('/api/persons', services_1.getAll);
app.get('/api/persons/:id', services_1.getOne);
app.delete('/api/persons/:id', services_1.deleteOne);
app.post('/api/persons', services_1.addOne);
app.put('/api/persons/:id', services_1.addOne);
app.get('/info', services_1.info);
app.use(utils_1.errorHandler);
app.use(utils_1.unknownEndpoint);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
