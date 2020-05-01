namespace GestionArticulos.Core.Domain
{
    public class Municipality : BaseEntity
    {
        public Province Province { get; set; }
        public int ProvinceId { get; set; }
    }
}
