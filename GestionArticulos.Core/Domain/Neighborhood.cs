namespace GestionArticulos.Core.Domain
{
    public class Neighborhood : BaseEntity
    {
        public Municipality Municipality { get; set; }
        public int MunicipalityId { get; set; }
    }
}
