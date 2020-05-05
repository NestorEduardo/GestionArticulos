using System.ComponentModel.DataAnnotations;

namespace GestionArticulos.Web.ViewModels
{
    public class AddWarehouseProductViewModel
    {
        [Range(1, int.MaxValue)]
        public int WarehouseId { get; set; }

        [Range(1, int.MaxValue)]
        public int ProductId { get; set; }

        [Range(1, int.MaxValue)]
        public int Count { get; set; }

    }
}
