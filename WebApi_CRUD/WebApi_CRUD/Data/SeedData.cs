using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi_CRUD.Data
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new CRUDdbContext(serviceProvider.GetRequiredService<DbContextOptions<CRUDdbContext>>()))
            {
                //Look for Department OR Employees
                if (context.Departments.Any() || context.Employees.Any()) { return;}

                List<Departments> departments = new List<Departments>()
                {
                    new Departments() {Name ="Information Technology Department",Description="Description Information Technology Department",CreateDate=DateTime.Now,VersionDate=DateTime.Now},
                    new Departments() {Name ="Human Resource Department",Description="Description Human Resource Department",CreateDate=DateTime.Now,VersionDate=DateTime.Now},
                    new Departments() {Name ="sales Department",Description="Description sales Department",CreateDate=DateTime.Now,VersionDate=DateTime.Now}
                };


                List<Employees> employees = new List<Employees>()
                {
                    new Employees() {FirstName ="Michael",LastName="Javier Mota",PhoneNumber="1-829-865-7498",EmailAddress="michaeljaviermota@gmail.com",Salary=55000,Biography="I'm from Dominican Republic",DepartmentId=1,CreateDate=DateTime.Now,VersionDate=DateTime.Now},
                    new Employees() {FirstName ="Joelina",LastName="Amador",PhoneNumber="1-829-885-7888",EmailAddress="joelina@gmail.com",Salary=60000,Biography="I'm from Dominican Republic",DepartmentId=2,CreateDate=DateTime.Now,VersionDate=DateTime.Now},
                    
                    
                };



                context.Departments.AddRange(departments);
              //  context.Employees.AddRange(employees);
                context.SaveChanges();
            }
        }
    }
}
