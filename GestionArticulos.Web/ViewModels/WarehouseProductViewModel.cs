using GestionArticulos.Core.Domain;

namespace GestionArticulos.Web.ViewModels
{
    public class WarehouseProductViewModel : WarehouseProduct
    {
        public int UsedCapacity{ get; set; }
        public int RemainingCapacity { get; set; }
    }
}
