using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Framework;

namespace GestionArticulos.Services.Implementations
{
    public class MovementService : BaseService<Movement, IMovementRepository>, IMovementService
    {
        public MovementService(IMovementRepository movementRepository) : base(movementRepository) { }
        protected override TaskResult<Movement> ValidateOnCreate(Movement movement) => new TaskResult<Movement>();
        protected override TaskResult<Movement> ValidateOnDelete(Movement movement) => new TaskResult<Movement>();
        protected override TaskResult<Movement> ValidateOnUpdate(Movement movement) => new TaskResult<Movement>();
    }
}
