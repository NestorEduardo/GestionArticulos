namespace GestionArticulos.Core.Domain
{
    public class Warehouse : BaseEntity
    {
        public Neighborhood Neighborhood { get; set; }
        public int NeighborhoodId { get; set; }
        public string Address { get; set; }
        public int Capacity { get; set; }
    }
}
