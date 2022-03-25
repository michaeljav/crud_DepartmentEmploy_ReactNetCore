using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
//using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi_CRUD
{
    public class CRUDdbContext : DbContext
    {
        //protected readonly IConfiguration Configuration;

        public CRUDdbContext(DbContextOptions<CRUDdbContext> options): base(options)
        {

        }

        //public CRUDdbContext(IConfiguration configuration)
        //{
        //    Configuration = configuration;
        //}


        //protected override void OnConfiguring(DbContextOptionsBuilder options)
        //{
        //    // connect to sql server with connection string from app settings
        //    options.UseSqlServer(Configuration.GetConnectionString("connectionString"));
        //}

        public DbSet<Departments> Departments { get; set; }
        public DbSet<Employees> Employees { get; set; }
    }
}
