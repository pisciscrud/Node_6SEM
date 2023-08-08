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
  const faculties = await prisma.Faculty.findMany();
  res.json(faculties);
});

app.post("/api/faculties", async (req, res) => {
  const { PULPITS } = req.body;
  try {
    const faculty = await prisma.Faculty.create({
      data: {
        faculty: req.body.faculty,
        faculty_name: req.body.faculty_name,
        Pulpit: {
          create: PULPITS,
        },
      },
      include: {
        Pulpit: true,
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
    const faculty = await prisma.Faculty.update({
      where: { faculty: req.body.faculty },
      data: {
        faculty_name: req.body.faculty_name,
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
    const faculty = await prisma.Faculty.delete({
      where: { faculty: req.params.xyz },
    });
    res.json(faculty);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.get("/api/pulpits", async (req, res) => {
  const pulpits = await prisma.Pulpit.findMany();
  res.json(pulpits);
});

app.post("/api/pulpits", async (req, res) => {
  try {
    console.log(req.body);
    const pulpit = await prisma.Pulpit.create({
      data: {
        pulpit: req.body.pulpit,
        pulpit_name: req.body.pulpit_name,
        Faculty: {
          connectOrCreate: {
            where: { faculty: req.body.faculty },
            create: {
              faculty: req.body.faculty,
              faculty_name: req.body.faculty_name,
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
    const pulpit = await prisma.Pulpit.update({
      where: { pulpit: req.body.PULPIT },
      data: {
        pulpit_name: req.body.PULPIT_NAME,
        faculty: req.body.FACULTY,
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
    const pulpit = await prisma.Pulpit.delete({
      where: { pulpit: req.params.xyz },
    });
    res.json(pulpit);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.get("/api/teachers", async (req, res) => {
  const teachers = await prisma.Teacher.findMany();
  res.json(teachers);
});
app.post("/api/teachers", async (req, res) => {
  try {
    const teacher = await prisma.Teacher.create({
      data: {
        teacher: req.body.teacher,
        teacher_name: req.body.teacher_name,
        pulpit: req.body.pulpit,
      },
    });
    res.json(teacher);
  } catch (err) {
    res.json(err);
  }
});

app.put("/api/teachers", async (req, res) => {
  try {
    const teacher = await prisma.Teacher.update({
      where: { teacher: req.body.teacher },
      data: {
        teacher_name: req.body.teacher_name,
        pulpit: req.body.pulpit,
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
    const teacher = await prisma.Teacher.delete({
      where: { teacher: req.params.xyz },
    });
    res.json(teacher);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.get("/api/subjects", async (req, res) => {
  const subjects = await prisma.Subject.findMany();
  res.json(subjects);
});

app.post("/api/subjects", async (req, res) => {
  try {
    const subject = await prisma.Subject.create({
      data: {
        subject: req.body.SUBJECT,
        subject_name: req.body.SUBJECT_NAME,
        pulpit: req.body.PULPIT,
      },
    });
    res.json(subject);
  } catch (err) {
    res.json(err);
  }
});

app.put("/api/subjects", async (req, res) => {
  try {
    const subject = await prisma.Subject.update({
      where: { subject: req.body.SUBJECT },
      data: {
        subject_name: req.body.SUBJECT_NAME,
        pulpit: req.body.PULPIT,
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
    const subject = await prisma.Subject.delete({
      where: { subject: req.params.xyz },
    });
    res.json(subject);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.get("/api/auditoriums", async (req, res) => {
  const auditoriums = await prisma.Auditorium.findMany();
  res.json(auditoriums);
});

app.post("/api/auditoriums", async (req, res) => {
  try {
    const auditorium = await prisma.Auditorium.create({
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
    const auditorium = await prisma.Auditorium.update({
      where: { AUDITORIUM: req.body.AUDITORIUM },
      data: {
        AUDITORIUM_NAME: req.body.AUDITORIUM_NAME,
        AUDITORIUM_TYPE: req.body.AUDITORIUM_TYPE,
        AUDITORIUM_CAPACITY: req.body.AUDITORIUM_СAPACITY,
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
    const auditorium = await prisma.Auditorium.delete({
      where: { AUDITORIUM: req.params.xyz },
      
    });
    res.json(auditorium);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.get("/api/auditoriumtypes", async (req, res) => {
  const auditoriumstypes = await prisma.Auditorium_type.findMany();
  res.json(auditoriumstypes);
});

app.post("/api/auditoriumtypes", async (req, res) => {
  try {
    const auditoriumtype = await prisma.Auditorium_type.create({
      data: {
        auditorium_type: req.body.AUDITORIUM_TYPE,
        auditorium_typename: req.body.AUDITORIUM_TYPENAME,
      },
    });
    res.json(auditoriumtype);
  } catch (err) {
    res.json(err);
  }
});

app.put("/api/auditoriumtypes", async (req, res) => {
  try {
    const auditoriumtype = await prisma.Auditorium_type.update({
      where: { auditorium_type: req.body.AUDITORIUM_TYPE },
      data: {
        auditorium_typename: req.body.AUDITORIUM_TYPENAME,
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
    const auditoriumtype = await prisma.Auditorium_type.delete({
      where: { auditorium_type: req.params.xyz },
    });
    res.json(auditoriumtype);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.get("/api/faculties/:xyz/subjects", async (req, res) => {
  const faculty = await prisma.faculty.findUnique({
    where: { faculty: req.params.xyz },
    select: {
      faculty_name: true,
      Pulpit: {
        select: {
          pulpit_name: true,
          Subject: {
            select: {
              subject_name: true,
            },
          },
        },
      },
    },
  });
  res.json(faculty);
});

//TODO
app.get("/api/auditoriumtypes/:xyz/auditoriums", async (req, res) => {
  const auditoriums = await prisma.Auditorium.findMany({
    where: { AUDITORIUM_TYPE: req.params.xyz },
    select: { AUDITORIUM_NAME: true, AUDITORIUM_TYPE: true },
  });
  res.json(auditoriums);
});

app.get("/api/auditoriumsWithComp1", async (req, res) => {
  const result = await prisma.Auditorium.findMany({
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
    const data = await prisma.Auditorium.groupBy({
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
  const pulpits = await prisma.Pulpit.findMany({
    where: {
      Teacher: { none: {} },
    },
  });
  res.json(pulpits);
});

app.get("/api/pulpitsWithVladimir", async (req, res) => {
  const pulpits = await prisma.Pulpit.findMany({
    where: {
      Teacher: {
        some: {
          teacher_name: {
            contains: `Владимир`,
          },
        },
      },
    },
  });
  res.json(pulpits);
});

app.get("/transaction", async (req, res) => {
  try {
    await prisma.$transaction(async (prisma) => {
      const updatedAuditoriums = await prisma.Auditorium.updateMany({
        data: {
          AUDITORIUM_CAPACITY: { increment: 100 },
        },
      });
      const auditoriums = await prisma.auditorium.findMany();
      console.log(auditoriums);

      throw new Error("Transaction rollback");
    });
  } catch (e) {
    console.log("Transaction rolled back");
    const auditoriums = await prisma.auditorium.findMany();
    console.log(auditoriums);
    res.json("Rollback");
  }
});

app.get("/fluent", async (req, res) => {
  try {
    const fac = await prisma.Pulpit.findUnique({
      where: { pulpit: "ИСиТ" },
    }).Subject();
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
  const totalDepartments = await prisma.pulpit.count();
  console.log(totalDepartments);
  const totalPages = Math.ceil(totalDepartments / pageSize);

  const prevPage = page === 1 ? 1 : page - 1;
  const nextPage = page === totalPages ? totalPages : page + 1;

  const offset = (page - 1) * pageSize;

  try {
    const departaments = await prisma.pulpit.findMany({
      include: {
        _count: {
          select: { Teacher: true },
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
