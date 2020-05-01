using System.ComponentModel.DataAnnotations;

namespace GestionArticulos.Core.Domain
{
    public class Province : BaseEntity
    {
        [Required]
        [StringLength(50)]
        public string Description { get; set; }
    }
}
