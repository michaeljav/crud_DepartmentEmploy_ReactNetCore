using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi_CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {

        
        private readonly CRUDdbContext _CRUDdbContext;
        private readonly IWebHostEnvironment _env;
        public EmployeesController( CRUDdbContext context ,IWebHostEnvironment env)
        {
           
            _CRUDdbContext = context;
            _env = env;
        }
        [HttpGet]
        public async Task<JsonResult> Get()
        {

            var employees = await _CRUDdbContext.Employees.ToListAsync();
            return new JsonResult(employees);
        }
        [HttpPost]
        public async Task<JsonResult> Post(Employees employee)
        {

            Departments query = await (from departUdpate in _CRUDdbContext.Departments
                                       where departUdpate.Id == employee.DepartmentId
                                       select departUdpate).SingleOrDefaultAsync();

            if (query == null)
            {
                return new JsonResult(new { Status = "This deparment does not exist." });
            }

            Employees employeesObj = new Employees();
            employeesObj.FirstName = employee.FirstName;
            employeesObj.LastName = employee.LastName;
            employeesObj.EmailAddress = employee.EmailAddress;
            employeesObj.PhoneNumber = employee.PhoneNumber;
            employeesObj.Salary = employee.Salary;
            employeesObj.Picture = employee.Picture;
            employeesObj.Biography = employee.Biography;
            employeesObj.DepartmentId = employee.DepartmentId;
            employeesObj.CreateDate = DateTime.Now;
            employeesObj.VersionDate = DateTime.Now;

            _CRUDdbContext.Employees.Add(employeesObj);
            try
            {
                var result = await _CRUDdbContext.SaveChangesAsync();
                return new JsonResult(employeesObj); ;
            }
            catch (Exception ex)
            {

                return new JsonResult(ex.Message);
            }


        }

        [HttpPut]
        public async Task<JsonResult> Put(Employees employee)
        {
            Employees query = await (from employeeUdpate in _CRUDdbContext.Employees
                                       where employeeUdpate.Id == employee.Id
                                       select employeeUdpate).SingleOrDefaultAsync();

            Departments departquery = await (from departUdpate in _CRUDdbContext.Departments
                                       where departUdpate.Id == employee.DepartmentId
                                       select departUdpate).SingleOrDefaultAsync();

            if (query == null)
            {
                return new JsonResult(new { Status = "This employee does not exist." });
            }


            if (departquery == null)
            {
                return new JsonResult(new { Status = "This deparment does not exist." });
            }

            query.FirstName = employee.FirstName;
            query.LastName = employee.LastName;
            query.EmailAddress = employee.EmailAddress;
            query.PhoneNumber = employee.PhoneNumber;
            query.Salary = employee.Salary;
            query.Picture = employee.Picture;
            query.Biography = employee.Biography;
            query.DepartmentId = employee.DepartmentId;
            query.VersionDate = DateTime.Now;


            try
            {
                await _CRUDdbContext.SaveChangesAsync();

                query = await (from employeeUdpate in _CRUDdbContext.Employees
                               where employeeUdpate.Id == employee.Id
                               select employeeUdpate).SingleOrDefaultAsync();

                return new JsonResult(query); ;
            }
            catch (Exception ex)
            {

                return new JsonResult(ex.Message);
            }


        }

        [HttpDelete]
        public async Task<JsonResult> Delete(Employees employee)
        {
            Employees employeeDelete = await (from employeeUdpate in _CRUDdbContext.Employees
                                              where employeeUdpate.Id == employee.Id
                                              select employeeUdpate).SingleOrDefaultAsync();


            if (employeeDelete == null)
            {
                return new JsonResult(new { Status = "This object does not exist." });
            }
            try
            {
                _CRUDdbContext.Remove(employeeDelete);
                await _CRUDdbContext.SaveChangesAsync();

                return new JsonResult(employeeDelete);
            }
            catch (Exception ex)
            {

                return new JsonResult(ex.Message);
            }


        }
        [Route("SaveFile")]
        [HttpPost]
        public async Task<JsonResult> SaveFile()
        {
            try
            {
                IFormCollection httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using(var stream=new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception ex)
            {

                return new JsonResult("anonymous.png");
            }
        }
    }
}
