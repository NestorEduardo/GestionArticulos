using GestionArticulos.Core.Attributes;
using System.ComponentModel.DataAnnotations;

namespace GestionArticulos.Core.Domain
{
    public class Neighborhood : BaseEntity
    {
        [Required]
        [StringLength(50)]
        public string Description { get; set; }

        [NavigationProperty]
        public Municipality Municipality { get; set; }
        public int MunicipalityId { get; set; }
    }
}
