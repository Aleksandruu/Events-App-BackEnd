import * as express from "express";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Event } from "./entity/Event";
import { Ticket } from "./entity/Ticket";
import { v4 as uuidv4 } from "uuid";
// create typeorm connection
createConnection().then((connection) => {
  // create and setup express app
  const app = express();
  app.use(express.json());
  const userRepository = connection.getRepository(User);
  const eventsRepository = connection.getRepository(Event);
  const ticketsRepository = connection.getRepository(Ticket);
  // register routes

  app.get("/users", async function (req: Request, res: Response) {
    const users = await userRepository.find();
    res.json(users);
  });

  app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await userRepository.findOneById(req.params.id);
    return res.send(results);
  });

  app.post("/registration", async function (req: Request, res: Response) {
    const user = await userRepository.create(req.body);
    try {
      await userRepository.save(user);
      return res.send(true);
    } catch (error) {
      return res.status(500).send(false);
    }
  });

  app.post("/authentication", async function (req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userRepository
      .createQueryBuilder("User")
      .where("User.email = :email", { email: email })
      .getOne();

    if (!user) {
      return res.status(401).send(false);
    }

    if (user.password !== password) {
      return res.status(401).send(false);
    }

    return res.send(true);
  });

  app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await userRepository.findOneById(req.params.id);
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

  app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await userRepository.delete(req.params.id);
    return res.send(results);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  app.get("/events", async function (req: Request, res: Response) {
    const events = await eventsRepository.find();
    res.json(events);
  });

  app.get("/events/:id", async function (req: Request, res: Response) {
    const results = await eventsRepository.findOneById(req.params.id);
    return res.send(results);
  });

  app.post("/events", async function (req: Request, res: Response) {
    const event = await eventsRepository.create({
      ...req.body,
      banner: "",
      category: 0,
      description: "",
      requirements: "",
      cost: 0,
    });
    const results = await eventsRepository.save(event);
    return res.send(results);
  });

  app.put("/event/:id", async function (req: Request, res: Response) {
    const event = await eventsRepository.findOneById(req.params.id);
    eventsRepository.merge(event, req.body);
    const results = await eventsRepository.save(event);
    return res.send(results);
  });

  app.delete("/events/:id", async function (req: Request, res: Response) {
    const results = await eventsRepository.delete(req.params.id);
    return res.send(results);
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  app.get("/tickets", async function (req: Request, res: Response) {
    const ticket = await ticketsRepository.find();
    res.json(ticket);
  });

  app.get("/tickets/:id", async function (req: Request, res: Response) {
    const results = await ticketsRepository.findOneById(req.params.id);
    return res.send(results);
  });

  app.post("/tickets", async function (req: Request, res: Response) {
    //TODO get user id from token
    const ticket = await ticketsRepository.create({
      ...req.body,
      userId: 1,
      secretCode: uuidv4(),
      state: 0,
    });
    const results = await ticketsRepository.save(ticket);
    return res.send(results);
  });

  app.put("/tickets/:id", async function (req: Request, res: Response) {
    const ticket = await ticketsRepository.findOneById(req.params.id);
    ticketsRepository.merge(ticket, req.body);
    const results = await ticketsRepository.save(ticket);
    return res.send(results);
  });

  app.delete("/tickets/:id", async function (req: Request, res: Response) {
    const results = await ticketsRepository.delete(req.params.id);
    return res.send(results);
  });

  app.listen(3000);
});
