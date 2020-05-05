using System.ComponentModel.DataAnnotations;

namespace GestionArticulos.Core.Domain
{
    public class MovementType : BaseEntity
    {
        [Required]
        [MinLength(3)]
        [StringLength(50)]
        public string Description { get; set; }
    }
}
