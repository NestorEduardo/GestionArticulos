using System.ComponentModel.DataAnnotations;

namespace GestionArticulos.Core.Domain
{
    public class Category : BaseEntity
    {
        [Required]
        [MinLength(3)]
        [StringLength(50)]
        public string Description { get; set; }
    }
}
