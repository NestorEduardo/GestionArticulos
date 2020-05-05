using GestionArticulos.Core.Domain;
using System.Threading.Tasks;

namespace GestionArticulos.Repository.Abstract
{
    public interface IMovementRepository : IBaseRepository<Movement>
    {
        public Task<int> AddMovement(string description, Movement movement);
    }
}
