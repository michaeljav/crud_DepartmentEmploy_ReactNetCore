

using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi_CRUD
{
    public class Departments
    {

        public Departments()
        {
            
        }
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime VersionDate { get; set; }

    }
}
