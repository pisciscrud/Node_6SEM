const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getDepartments = async (req, res, next) => {
  try {
    const departs = await prisma.Departments.findMany({
      select: {
        ID: true,
        Name: true,
        Description: true,
        Organization: true,
        Employees: {
          select: {
            ID: true,
            LastName: true,
          },
        },
      },
    });
    console.log(departs);
    res.render("departs", { departs });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.addDepart = async (req, res, next) => {
  try {
    const Organization = await prisma.Organization.findFirst();
    res.render("departForm", { Organization });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.createDepart = async (req, res, next) => {
  try {
    const { Name, Description } = req.body;
    const org = await prisma.Organization.findFirst();
    const depart = await prisma.Departments.create({
      data: {
        Name,
        Description,
        OrganizationID: org.ID,
      },
    });
    res.redirect("/depart");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getInfoByID = async (req, res, next) => {
  try {
    const depart = await prisma.Departments.findUnique({
      where: {
        ID: Number(req.params.id),
      },
    });
    res.render("departUpdate", { depart });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const org = await prisma.Organization.findFirst();
    const { Name, Description } = req.body;
    const depart = await prisma.Departments.update({
      where: {
        ID: Number(req.params.id),
      },
      data: {
        Name,
        Description,
        OrganizationID: org.ID,
      },
    });
    //res.sendStatus(200);
    res.redirect('/depart')
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

exports.DeleteDepart = async (req, res, next) => {

  try 
  {
     const depart = await prisma.Departments.delete({
      where: {
        ID: Number(req.params.id),
      }})
       res.redirect("/depart");
  }
  catch (err)
  {
      console.log(err.message);
    res.status(500).json(err.message);
  }
}
