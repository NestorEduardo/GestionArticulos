using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;

namespace GestionArticulos.Services.Abstract
{
    public interface IMovementService : IBaseService<Movement, IMovementRepository> { }
}
