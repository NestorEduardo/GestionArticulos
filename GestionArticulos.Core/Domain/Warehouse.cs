using System.ComponentModel.DataAnnotations;

namespace GestionArticulos.Core.Domain
{
    public class Warehouse : BaseEntity
    {
        [Required]
        [StringLength(50)]
        public string Description { get; set; }
        public Neighborhood Neighborhood { get; set; }
        public int NeighborhoodId { get; set; }
        public string Address { get; set; }
        public int Capacity { get; set; }
    }
}
