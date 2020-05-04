using GestionArticulos.Core.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace GestionArticulos.Core.Domain
{
    public class Warehouse : BaseEntity
    {
        [Required]
        [MinLength(3)]
        [StringLength(50)]
        public string Description { get; set; }

        [NavigationProperty]
        public virtual Neighborhood Neighborhood { get; set; }

        [Range(1, int.MaxValue)]
        public int NeighborhoodId { get; set; }

        [Required]
        [MinLength(3)]
        [StringLength(200)]
        public string Address { get; set; }
        public int Capacity { get; set; }
    }
}
