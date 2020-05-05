using GestionArticulos.Core.Attributes;

namespace GestionArticulos.Core.Domain
{
    public class Movement : BaseEntity
    {
        public int MovementTypeId { get; set; }
        public int WarehouseId { get; set; }
        public int ProductId { get; set; }
        public int Count { get; set; }

        [NavigationProperty]
        public Warehouse Warehouse { get; set; }

        [NavigationProperty]
        public Product Product { get; set; }

        [NavigationProperty]
        public MovementType MovementType { get; set; }
    }
}
