using GestionArticulos.Core.Attributes;
using System.ComponentModel.DataAnnotations;

namespace GestionArticulos.Core.Domain
{
    public class WarehouseProduct : BaseEntity
    {
        [NavigationProperty]
        public virtual Warehouse Warehouse { get; set; }

        [Range(1, int.MaxValue)]
        public int WarehouseId { get; set; }

        [NavigationProperty]
        public virtual Product Product { get; set; }

        [Range(1, int.MaxValue)]
        public int ProductId { get; set; }
        public int Count { get; set; }
    }
}
