const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getEmployee = async (req, res, next) => {
  try {
    const employee = await prisma.Employees.findMany({
      select: {
        ID: true,
        FirstName: true,
        LastName: true,
        JobTitle: true,
        Salary: true,
        Tasks: {
          select: {
            ID:true,
            Name: true,
          },
        },
      },
    });

    console.log(employee);
    res.render("employee", {
      employee,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const departaments = await prisma.Departments.findMany();
    res.render("employeeForm", { departaments });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { LastName, FirstName, Departament, JobTitle, Salary } = req.body;
    const depart = await prisma.Departments.findFirst({
      where: { Name: Departament },
    });
    console.log(depart);
    const employee = await prisma.Employees.create({
      data: {
        FirstName: FirstName,
        LastName: LastName,
        DepartmentID: depart.ID,
        JobTitle: JobTitle,
        Salary: Number(Salary),
      },
    });
    res.redirect("/employee");
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await prisma.Employees.delete({
      where: { ID: Number(req.params.id) },
    });
    res.redirect("/employee");
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

exports.GetInfoById = async (req, res, next) => {
  try {
    const departaments = await prisma.Departments.findMany();
    const employee = await prisma.Employees.findUnique({
      where: { ID: Number(req.params.id) },
      include: {
        Departments: true,
      },
    });
    console.log(employee);
    res.render("employeeFormUpdate", { departaments,employee });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {

    const {LastName,FirstName,Departament,JobTitle,Salary} = req.body;
    const depart = await prisma.Departments.findFirst ({
      where: {Name: Departament}
    })
    const employee = await prisma.Employees.update({
      where: { ID: Number(req.params.id) },
      
      data: {
        FirstName: FirstName,
        LastName: LastName,
        DepartmentID: depart.ID,
        JobTitle: JobTitle,
        Salary: Number(Salary),
      }

    });
    res.send(200);


  } 
  catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};
