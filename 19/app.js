const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const expressHbs = require("express-handlebars").create({ extname: ".hbs" });

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine(".hbs", expressHbs.engine);
app.set("view engine", ".hbs");

//GET

//faculty

app.get("/api/faculties", async (req, res) => {
  const faculties = await prisma.FACULTY.findMany();
  res.json(faculties);
});

app.post("/api/faculties", async (req, res) => {
  const { PULPITS } = req.body;
  try {
    const faculty = await prisma.FACULTY.create({
      data: {
        FACULTY: req.body.faculty,
        FACULTY_NAME: req.body.faculty_name,
        PULPIT_PULPIT_FACULTYToFACULTY: {
          create: PULPITS,
        },
      },
      include: {
        PULPIT_PULPIT_FACULTYToFACULTY: true,
      },
    });
    res.json(faculty);
  } catch (err) {
    res.json(err);
  }
});

app.put("/api/faculties", async (req, res) => {
  try {
    console.log(req.body);
    const faculty = await prisma.FACULTY.update({
      where: { FACULTY: req.body.faculty },
      data: {
        FACULTY_NAME: req.body.faculty_name,
      },
    });
    res.json(faculty);
  } catch (err) {
    res.status(500);
    res.json("Troubles with update faculty");
  }
});

app.delete("/api/faculties/:xyz", async (req, res) => {
  try {
    const faculty = await prisma.FACULTY.delete({
      where: { FACULTY: req.params.xyz },
    });
    res.json(faculty);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.get("/api/pulpits", async (req, res) => {
  const pulpits = await prisma.PULPIT.findMany();
  res.json(pulpits);
});

app.post("/api/pulpits", async (req, res) => {
  try {
    console.log(req.body);
    const pulpit = await prisma.PULPIT.create({
      data: {
        PULPIT: req.body.pulpit,
        PULPIT_NAME: req.body.pulpit_name,
        FACULTY_PULPIT_FACULTYToFACULTY: {
          connectOrCreate: {
            where: { FACULTY: req.body.faculty },
            create: {
              FACULTY: req.body.faculty,
              FACULTY_NAME: req.body.faculty_name,
            },
          },
        },
      },
    });
    res.json(pulpit);
  } catch (err) {
    res.json(err);
  }
});

app.put("/api/pulpits", async (req, res) => {
  try {
    const pulpit = await prisma.PULPIT.update({
      where: { PULPIT: req.body.PULPIT },
      data: {
        PULPIT_NAME: req.body.PULPIT_NAME,
        FACULTY: req.body.FACULTY,
      },
    });
    res.json(pulpit);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.delete("/api/pulpits/:xyz", async (req, res) => {
  try {
    const pulpit = await prisma.PULPIT.delete({
      where: { PULPIT: req.params.xyz },
    });
    res.json(pulpit);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.get("/api/teachers", async (req, res) => {
  const teachers = await prisma.TEACHER.findMany();
  res.json(teachers);
});
app.post("/api/teachers", async (req, res) => {
  try {
    const teacher = await prisma.TEACHER.create({
      data: {
        TEACHER: req.body.teacher,
        TEACHER_NAME: req.body.teacher_name,
        PULPIT: req.body.pulpit,
      },
    });
    res.json(teacher);
  } catch (err) {
    res.json(err);
  }
});

app.put("/api/teachers", async (req, res) => {
  try {
    const teacher = await prisma.TEACHER.update({
      where: { TEACHER: req.body.teacher },
      data: {
        TEACHER: req.body.teacher,
        TEACHER_NAME: req.body.teacher_name,
        PULPIT: req.body.pulpit,
      },
    });
    res.json(teacher);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});
app.delete("/api/teachers/:xyz", async (req, res) => {
  try {
    const teacher = await prisma.TEACHER.delete({
      where: { TEACHER: req.params.xyz },
    });
    res.json(teacher);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.get("/api/subjects", async (req, res) => {
  const subjects = await prisma.SUBJECT.findMany();
  res.json(subjects);
});

app.post("/api/subjects", async (req, res) => {
  try {
    const subject = await prisma.SUBJECT.create({
      data: {
        SUBJECT: req.body.SUBJECT,
        SUBJECT_NAME: req.body.SUBJECT_NAME,
        PULPIT: req.body.PULPIT,
      },
    });
    res.json(subject);
  } catch (err) {
    res.json(err);
  }
});

app.put("/api/subjects", async (req, res) => {
  try {
    const subject = await prisma.SUBJECT.update({
      where: { SUBJECT: req.body.SUBJECT },
      data: {
        SUBJECT_NAME: req.body.SUBJECT_NAME,
        PULPIT: req.body.PULPIT,
      },
    });
    res.json(subject);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});
app.delete("/api/subjects/:xyz", async (req, res) => {
  try {
    console.log(req.params.xyz);
    const subject = await prisma.SUBJECT.delete({
      where: { SUBJECT: req.params.xyz },
    });
    res.json(subject);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.get("/api/auditoriums", async (req, res) => {
  const auditoriums = await prisma.AUDITORIUM.findMany();
  res.json(auditoriums);
});

app.post("/api/auditoriums", async (req, res) => {
  try {
    const auditorium = await prisma.AUDITORIUM.create({
      data: {
        AUDITORIUM: req.body.AUDITORIUM,
        AUDITORIUM_NAME: req.body.AUDITORIUM_NAME,
        AUDITORIUM_CAPACITY: req.body.AUDITORIUM_CAPACITY,
        AUDITORIUM_TYPE: req.body.AUDITORIUM_TYPE,
      },
    });
    res.json(auditorium);
  } catch (err) {
    res.json(err);
  }
});

app.put("/api/auditoriums", async (req, res) => {
  try {
    const auditorium = await prisma.AUDITORIUM.update({
      where: { AUDITORIUM: req.body.AUDITORIUM },
      data: {
        AUDITORIUM: req.body.AUDITORIUM,
        AUDITORIUM_NAME: req.body.AUDITORIUM_NAME,
        AUDITORIUM_TYPE: req.body.AUDITORIUM_TYPE,
        AUDITORIUM_CAPACITY: req.body.AUDITORIUM_CAPACITY,
      },
    });
    res.json(auditorium);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.delete("/api/auditoriums/:xyz", async (req, res) => {
  try {
    const auditorium = await prisma.AUDITORIUM.delete({
      where: { AUDITORIUM: req.params.xyz },
    });
    res.json(auditorium);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.get("/api/auditoriumtypes", async (req, res) => {
  const auditoriumstypes = await prisma.AUDITORIUM_TYPE.findMany();
  res.json(auditoriumstypes);
});

app.post("/api/auditoriumtypes", async (req, res) => {
  try {
    const auditoriumtype = await prisma.AUDITORIUM_TYPE.create({
      data: {
        AUDITORIUM_TYPE: req.body.AUDITORIUM_TYPE,
        AUDITORIUM_TYPENAME: req.body.AUDITORIUM_TYPENAME,
      },
    });
    res.json(auditoriumtype);
  } catch (err) {
    res.json(err);
  }
});

app.put("/api/auditoriumtypes", async (req, res) => {
  try {
    const auditoriumtype = await prisma.AUDITORIUM_TYPE.update({
      where: { AUDITORIUM_TYPE: req.body.AUDITORIUM_TYPE },
      data: {
        AUDITORIUM_TYPENAME: req.body.AUDITORIUM_TYPENAME,
      },
    });
    res.json(auditoriumtype);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.delete("/api/auditoriumtypes/:xyz", async (req, res) => {
  try {
    const auditoriumtype = await prisma.AUDITORIUM_TYPE.delete({
      where: { AUDITORIUM_TYPE: req.params.xyz },
    });
    res.json(auditoriumtype);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.get("/api/faculties/:xyz/subjects", async (req, res) => {
  const faculty = await prisma.FACULTY.findUnique({
    where: { FACULTY: req.params.xyz },
    select: {
      FACULTY_NAME: true,
      PULPIT_PULPIT_FACULTYToFACULTY: {
        select: {
          PULPIT_NAME: true,
          SUBJECT_SUBJECT_PULPITToPULPIT: {
            select: {
              SUBJECT_NAME: true,
            },
          },
        },
      },
    },
  });
  res.json(faculty);
});

app.get("/api/auditoriumtypes/:xyz/auditoriums", async (req, res) => {
  const auditoriums = await prisma.AUDITORIUM_TYPE.findMany({
    where: { AUDITORIUM_TYPE: req.params.xyz },
    select: {
      AUDITORIUM_TYPE: true,
      AUDITORIUM_TYPENAME: false,
      AUDITORIUM_AUDITORIUM_AUDITORIUM_TYPEToAUDITORIUM_TYPE: {
        select: {
          AUDITORIUM: true,
        
        },
      },
    },
  });
  res.json(auditoriums);
});

app.get("/api/auditoriumsWithComp1", async (req, res) => {
  const result = await prisma.AUDITORIUM.findMany({
    where: {
      AUDITORIUM_TYPE: `ЛБ-К`,
      AUDITORIUM_NAME: {
        contains: "-1",
      },
    },
  });
  res.json(result);
});

app.get("/auditoriumsSameCount", async (req, res) => {
  try {
    const data = await prisma.AUDITORIUM.groupBy({
      by: ["AUDITORIUM_CAPACITY", "AUDITORIUM_TYPE"],
      _count: true, //подсчет кол-ва всех связанных записей
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/puplitsWithoutTeachers", async (req, res) => {
  const pulpits = await prisma.PULPIT.findMany({
    where: {
      TEACHER_TEACHER_PULPITToPULPIT: { none: {} },
    },
  });
  res.json(pulpits);
});

app.get("/api/pulpitsWithVladimir", async (req, res) => {
  const pulpits = await prisma.PULPIT.findMany({
    where: {
      TEACHER_TEACHER_PULPITToPULPIT: {
        some: {
          TEACHER_NAME: {
            contains: `Владимир`,
          },
        },
      },
      
    },
    include :{
      TEACHER_TEACHER_PULPITToPULPIT :true
    }

  });
  res.json(pulpits);
});

app.get("/transaction", async (req, res) => {
  try {
    await prisma.$transaction(async (prisma) => {
      const updatedAuditoriums = await prisma.AUDITORIUM.updateMany({
        data: {
          AUDITORIUM_CAPACITY: { increment: 100 },
        },
      });
      const auditoriums = await prisma.AUDITORIUM.findMany();
      console.log(auditoriums);

      throw new Error("Transaction rollback");
    });
  } catch (e) {
    console.log("Transaction rolled back");
    const auditoriums = await prisma.AUDITORIUM.findMany();
    console.log(auditoriums);
    res.json("Rollback");
  }
});

app.get("/fluent", async (req, res) => {
  try {
    const fac = await prisma.PULPIT.findUnique({
      where: { PULPIT: "ИСиТ" },
    }).SUBJECT_SUBJECT_PULPITToPULPIT();
    res.json(fac);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res) => {
  res.redirect("/pagination");
});

app.get("/pagination", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const totalDepartments = await prisma.PULPIT.count();
  console.log(totalDepartments);
  const totalPages = Math.ceil(totalDepartments / pageSize);

  const prevPage = page === 1 ? 1 : page - 1;
  const nextPage = page === totalPages ? totalPages : page + 1;

  const offset = (page - 1) * pageSize;

  try {
    const departaments = await prisma.PULPIT.findMany({
      include: {
        _count: {
          select: { TEACHER_TEACHER_PULPITToPULPIT: true },
        },
      },

      skip: offset,
      take: pageSize,
    });

    console.log(departaments);
    res.render("departments", {
      departments: departaments,
      totalPages: totalPages,
      page: page,
      nextPage,
      prevPage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred while fetching departments");
  }
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
