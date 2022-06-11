"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Event_1 = require("./entity/Event");
var Ticket_1 = require("./entity/Ticket");
// create typeorm connection
(0, typeorm_1.createConnection)().then(function (connection) {
    // create and setup express app
    var app = express();
    app.use(express.json());
    var userRepository = connection.getRepository(User_1.User);
    var eventsRepository = connection.getRepository(Event_1.Event);
    var ticketsRepository = connection.getRepository(Ticket_1.Ticket);
    // register routes
    app.get("/users", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.find()];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [2 /*return*/];
                }
            });
        });
    });
    app.get("/users/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneById(req.params.id)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.post("/registration", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.create(req.body)];
                    case 1:
                        user = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.send(true)];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(500).send(false)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    });
    app.post("/authentication", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        password = req.body.password;
                        return [4 /*yield*/, userRepository
                                .createQueryBuilder("User")
                                .where("User.email = :email", { email: email })
                                .getOne()];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(401).send(false)];
                        }
                        if (user.password !== password) {
                            return [2 /*return*/, res.status(401).send(false)];
                        }
                        return [2 /*return*/, res.send(true)];
                }
            });
        });
    });
    app.put("/users/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneById(req.params.id)];
                    case 1:
                        user = _a.sent();
                        userRepository.merge(user, req.body);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.delete("/users/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.delete(req.params.id)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    app.get("/events", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, eventsRepository.find()];
                    case 1:
                        events = _a.sent();
                        res.json(events);
                        return [2 /*return*/];
                }
            });
        });
    });
    app.get("/events/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, eventsRepository.findOneById(req.params.id)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.post("/events", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var event, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, eventsRepository.create(__assign(__assign({}, req.body), { banner: "", category: 0, description: "", requirements: "", cost: 0 }))];
                    case 1:
                        event = _a.sent();
                        return [4 /*yield*/, eventsRepository.save(event)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.put("/event/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var event, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, eventsRepository.findOneById(req.params.id)];
                    case 1:
                        event = _a.sent();
                        eventsRepository.merge(event, req.body);
                        return [4 /*yield*/, eventsRepository.save(event)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.delete("/events/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, eventsRepository.delete(req.params.id)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    app.get("/tickets", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticketsRepository.find()];
                    case 1:
                        ticket = _a.sent();
                        res.json(ticket);
                        return [2 /*return*/];
                }
            });
        });
    });
    app.get("/tickets/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticketsRepository.findOneById(req.params.id)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.post("/tickets", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticketsRepository.create(__assign(__assign({}, req.body), { userId: 1, 
                            // secretCode: uuidv4(),
                            state: 0 }))];
                    case 1:
                        ticket = _a.sent();
                        return [4 /*yield*/, ticketsRepository.save(ticket)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.put("/tickets/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticketsRepository.findOneById(req.params.id)];
                    case 1:
                        ticket = _a.sent();
                        ticketsRepository.merge(ticket, req.body);
                        return [4 /*yield*/, ticketsRepository.save(ticket)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.delete("/tickets/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticketsRepository.delete(req.params.id)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.listen(3000);
});
