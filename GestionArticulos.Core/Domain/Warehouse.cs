using GestionArticulos.Core.Attributes;
using System.ComponentModel.DataAnnotations;

namespace GestionArticulos.Core.Domain
{
    public class Warehouse : BaseEntity
    {
        [StringLength(50)]
        public string Description { get; set; }

        [NavigationProperty]
        public virtual Neighborhood Neighborhood { get; set; }
        public int NeighborhoodId { get; set; }
        public string Address { get; set; }
        public int Capacity { get; set; }
    }
    public class Test
    {
        public string Description { get; set; }
    }
}
