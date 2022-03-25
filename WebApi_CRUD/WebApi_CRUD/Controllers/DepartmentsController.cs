using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi_CRUD.Controllers
{

   

    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly CRUDdbContext _CRUDdbContext;
        public DepartmentsController(IConfiguration configuration, CRUDdbContext context)
        {
            _configuration = configuration;
            _CRUDdbContext = context;
        }
        [HttpGet]
        public async Task<JsonResult> Get()
        {

            var departments = await _CRUDdbContext.Departments.ToListAsync();
            return new JsonResult(departments);
        }
        [HttpPost]
        public async Task<JsonResult> Post(Departments department)
        {

            Departments departmentObj = new Departments();
            departmentObj.Name = department.Name;
            departmentObj.Description = department.Description;
            departmentObj.CreateDate = DateTime.Now;
            departmentObj.VersionDate = DateTime.Now;

            _CRUDdbContext.Departments.Add(departmentObj);
            try
            {
               var result= await _CRUDdbContext.SaveChangesAsync();
                return new JsonResult(departmentObj);  ;
            }
            catch (Exception ex)
            {
              
                return new JsonResult(ex.Message);
            }          

          
        }

        [HttpPut]
        public async Task<JsonResult> Put(Departments department)
        {
            Departments query = await (from departUdpate in _CRUDdbContext.Departments
                         where departUdpate.Id == department.Id
                         select departUdpate).SingleOrDefaultAsync();

            if (query == null)
            {
                return new JsonResult(new { Status = "This object does not exist." });
            }
            query.Name = department.Name;
            query.Description = department.Description;         
            query.VersionDate = DateTime.Now;

        
            try
            {
                await _CRUDdbContext.SaveChangesAsync();

                 query = await (from departUdpate in _CRUDdbContext.Departments
                                           where departUdpate.Id == department.Id
                                           select departUdpate).SingleOrDefaultAsync();

                return new JsonResult(query); ;
            }
            catch (Exception ex)
            {

                return new JsonResult(ex.Message);
            }


        }

        [HttpDelete]
        public async Task<JsonResult> Delete(Departments department)
        {
            Departments departDelete = await (from departUdpate in _CRUDdbContext.Departments
                                       where departUdpate.Id == department.Id
                                       select departUdpate).SingleOrDefaultAsync();


            if (departDelete == null)
            {
                return new JsonResult(new {Status="This object does not exist." });
            }
            try
            {
                _CRUDdbContext.Remove(departDelete);
               await _CRUDdbContext.SaveChangesAsync();
                
                return new JsonResult(departDelete); 
            }
            catch (Exception ex)
            {

                return new JsonResult(ex.Message);
            }


        }

    }
}
