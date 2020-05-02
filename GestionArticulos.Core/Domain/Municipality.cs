using GestionArticulos.Core.Attributes;
using System.ComponentModel.DataAnnotations;

namespace GestionArticulos.Core.Domain
{
    public class Municipality : BaseEntity
    {
        [Required]
        [StringLength(50)]
        public string Description { get; set; }

        [NavigationProperty]
        public Province Province { get; set; }
        public int ProvinceId { get; set; }
    }
}
