

using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi_CRUD
{
    public class Employees
    {
        public Employees()
        {

        }
       

        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public Decimal Salary { get; set; }
        public string Picture { get; set; }
        public string Biography { get; set; }
        public int DepartmentId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime VersionDate { get; set; }

    }
}
