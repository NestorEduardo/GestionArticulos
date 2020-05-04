using GestionArticulos.Core.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace GestionArticulos.Core.Domain
{
    public class Product : BaseEntity
    {
        [Required]
        [MinLength(3)]
        [StringLength(50)]
        public string Description { get; set; }

        [Required]
        [Range(1, double.MaxValue)]
        public decimal Price { get; set; }

        [NavigationProperty]
        public virtual Category Category { get; set; }

        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }
    }
}
