const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


exports.getTask = async (req, res, next) => {
  try {
    const tasks = await prisma.Tasks.findMany({
      include: {
        Employees: true,
      },
    });
    res.render("tasks", {
      tasks,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.addTask = async (req, res) => {
  try {
    const employees = await prisma.Employees.findMany();
    res.render("taskForm", { employees });
  } catch (err) {
    res.status(500).json(err);
  }
};



exports.createTask = async (req, res, next) => {
  try {
    const { Name, Description, Deadline, Status, Employee } = req.body;
    const employee = await prisma.Employees.findUnique({
      where: { LastName: Employee },
    });

    const datetimeObj = new Date(Deadline);
    const task = await prisma.Tasks.create({
      data: {
        Name: Name,
        Description: Description,
        Deadline: datetimeObj,
        EmployeeID: employee.ID,
        Status: Status,
      },
    });

    res.redirect("/task");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.GetInfoById = async (req, res, next) => {
  try {
    const task = await prisma.Tasks.findUnique({
      where: { ID: Number(req.params.id) },
      include: {
        Employees: true,
      },
    });

    const employees = await prisma.Employees.findMany();
    const dat = task.Deadline.toISOString().slice(0, 10);
    res.render("taskFormUpdate", {
      employees,
      ID: task.ID,
      Name: task.Name,
      Description: task.Description,
      Deadline: dat,
      Status: task.Status,
      Employees: task.Employees,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { Name, Description, Deadline, Status, Employee } = req.body;

    const employee = await prisma.Employees.findFirst({
      where: { LastName: Employee },
    });

    const datetimeObj = new Date(Deadline);

    const task = await prisma.Tasks.update({
      where: { ID: Number(req.params.id) },
      data: {
        Name: Name,
        Description: Description,
        Deadline: datetimeObj,
        EmployeeID: employee.ID,
        Status: Status,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const book = await prisma.Tasks.delete({
      where: { ID: Number(req.params.id) },
    });

    res.redirect("/task");

  } 
  catch (err) 
  {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};


exports.GetOverdue = async (req,res,next) => 
{
  try 
  {
    const tasks = await prisma.$queryRaw`spGetOverdueTasks`;
    res.render("tasks", {
      tasks,
    });
  }
  catch (err) 
  {
    console.log(err.message);
    res.status(500).json(err.message);
  }
}

exports.GetNOverdue = async (req,res,next) => 
{
  try 
  {
    const tasks = await prisma.$queryRaw`spGetTasks`;
    res.render("tasks", {
      tasks,
    });

  }
  catch(err)
  { 
    console.log(err.message);
    res.status(500).json(err.message);

  }
}