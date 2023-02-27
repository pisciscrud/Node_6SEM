const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Organization extends Model {}
class Departments extends Model {}
class Employees extends Model {}
class KPIs extends Model {}
class KPI_Results extends Model {}
class ManagementControlProcesses extends Model {}
class Tasks extends Model {}

function internalORM(sequelize) {
  Organization.init(
    {
      ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Industry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },

    {
      hooks: {
        beforeCreate(attributes, options) {
          console.log("Organization => beforeCreate");
        },
        afterCreate(attributes, options) {
          console.log("Organization => afterCreate");
        },
      },
      sequelize,
      modelName: "Organization",
      tableName: "Organization",
    }
  );
  Departments.init(
    {
      ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      OrganizationID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: Organization, key: "ID" },
      },
    },
    {
      sequelize,
      modelName: "Departments",
      tableName: "Departments",
    }
  );
  Employees.init(
    {
      ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      FirstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      LastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      JobTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      DepartmentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: Departments, key: "ID" },
      },
    },
    {
      sequelize,
      modelName: "Employees",
      tableName: "Employees",
    }
  );
  KPIs.init(
    {
      ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
   

      TargetValue: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      UnitOfMeasure: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "KPIs",
      tableName: "KPIs",
    }
  );
  KPI_Results.init(
    {
      ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      KPIID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: KPIs, key: "ID" },
      },
      DepartamentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: Departments, key: "ID" },
      },
      Result: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "KPI_Results",
      tableName: "KPI_Results",
    }
  );
  ManagementControlProcesses.init(
    {
      ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },

      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DepartmentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: Departments, key: "ID" },
      },

      Frequency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      EmployeeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ManagementControlProcesses",
      tableName: "ManagementControlProcesses",
    }
  );

  Tasks.init(
    {
      ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DepartmentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: Departments, key: "ID" },
      },

      EmployeeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: Employees, key: "ID" },
      },
      Deadline: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tasks",
      tableName: "Tasks",
    }
  );
}

exports.ORM = (sequelize) => {
  internalORM(sequelize);
  return {
    Organization,
    Departments,
    Employees,
    KPIs,
    KPI_Results,
    ManagementControlProcesses,
    Tasks,
  };
};
