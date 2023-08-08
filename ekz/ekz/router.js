const express = require("express");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({});
const bodyParser = require("body-parser");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users = await prisma.Users.findMany();
  res.json(users);
});

userRouter.post("/", async (req, res, next) => {
  try {
    const { id, name, email, password } = req.body;
    const user1 = await prisma.Users.findFirst({
      where: {
        id: +req.body.id,
      },
    });

    if (!user1 && id && name && email && password) {
      const user = await prisma.Users.create({
        data: {
          id,
          name,
          email,
          password,
        },
      });
      res.json(user);
    } else {
      throw new Error("invalid data");
    }
  } catch (e) {
    next();
  }
});

userRouter.put("/:id", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user1 = await prisma.Users.findFirst({
      where: {
        id: +req.params.id,
      },
    });

    if (user1 && name && email && password) {
      const user = await prisma.Users.update({
        where: {
          id: +req.params.id,
        },
        data: {
          name,
          email,
          password,
        },
      });
      res.json(user);
    } else {
      throw new Error("invalid data");
    }
  } catch (e) {
    next();
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const user1 = await prisma.Users.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    if (user1) {
      await prisma.Users.delete({
        where: {
          id: +req.params.id,
        },
      });
      res.json("Success deleted");
    } else {
      throw new Error("invalid data");
    }
  } catch (e) {
    next();
  }
});

module.exports = userRouter;
