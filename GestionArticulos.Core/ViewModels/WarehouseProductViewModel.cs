using GestionArticulos.Core.Domain;
using System.Collections.Generic;

namespace GestionArticulos.Core.ViewModels
{
    public class WarehouseProductViewModel
    {
        public List<WarehouseProduct> WarehouseProducts { get; set; }
        public int UsedCapacity { get; set; }
        public List<WarehouseProduct> Test { get; set; }

    }
}
